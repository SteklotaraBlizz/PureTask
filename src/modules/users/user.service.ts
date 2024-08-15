import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entity/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { AppStatusResponse } from 'src/dto/app-status-response.dto';
import { AppSingleResponse } from 'src/dto/app-single-response.dto';
import { MainException } from 'src/exceptions/main.exception';
import { CreateUserRequest } from './dto/create-user.dto';
import { UpdateUserRequest } from './dto/update-user.dto';
import { filterUndefined } from 'src/utils/filter-undefined.util';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(
    request: CreateUserRequest,
  ): Promise<AppSingleResponse<UserEntity>> {
    await this.checkEmailForExistAndThrowErrorIfExist(request.email);

    const savedUser = await this.userRepository.save(
      this.userRepository.create({
        ...request,
        password: await bcrypt.hash(request.password, await bcrypt.genSalt(10)),
      }),
    );
    if (!savedUser)
      throw MainException.internalRequestError('Error upon saving user');

    return new AppSingleResponse(savedUser);
  }

  async getUsers(): Promise<AppSingleResponse<UserEntity[]>> {
    const users = await this.userRepository.find();
    return new AppSingleResponse(users);
  }

  async getUserById(
    id: UserEntity['id'],
  ): Promise<AppSingleResponse<UserEntity>> {
    const user = await this.userRepository.findOne({
      where: {
        id: id,
      },
    });

    if (!user)
      throw MainException.entityNotFound(`User with email ${id} not found`);

    return new AppSingleResponse(user);
  }

  async getUserByEmail(
    email: UserEntity['email'],
  ): Promise<AppSingleResponse<UserEntity>> {
    const user = await this.userRepository.findOne({
      where: {
        email: email,
      },
    });

    if (!user)
      throw MainException.entityNotFound(`User with email ${email} not found`);

    return new AppSingleResponse(user);
  }

  async updateUser(id: UserEntity['id'], request: UpdateUserRequest) {
    const { data: user } = await this.getUserById(id);

    if (request.password)
      request.password = await bcrypt.hash(
        request.password,
        await bcrypt.genSalt(10),
      );
    const savedUser = await this.userRepository.save({
      ...user,
      ...filterUndefined(request),
    });

    return new AppSingleResponse(savedUser);
  }

  async deleteUserById(id: UserEntity['id']): Promise<AppStatusResponse> {
    const { affected } = await this.userRepository.softDelete(id);
    return new AppStatusResponse(!!affected);
  }

  async checkEmailForExistAndThrowErrorIfExist(email: string) {
    if (
      await this.userRepository.findOne({
        where: {
          email: email,
        },
      })
    )
      throw MainException.invalidData(`User with email ${email} already exist`);
  }
}
