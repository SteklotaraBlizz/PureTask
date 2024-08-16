import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ColumnEntity } from './entities/column.entity';
import { CreateColumnRequest } from './dto/create-column.dto';
import { filterUndefined } from 'src/utils/filter-undefined.util';
import { AppSingleResponse } from 'src/dto/app-single-response.dto';
import { MainException } from 'src/exceptions/main.exception';
import { UserEntity } from '../users/entity/user.entity';
import { UpdateColumnRequest } from './dto/update-column.dto';
import { AppStatusResponse } from 'src/dto/app-status-response.dto';

@Injectable()
export class ColumnService {
  constructor(
    @InjectRepository(ColumnEntity)
    private readonly columnRepository: Repository<ColumnEntity>,
  ) {}

  async create(
    request: CreateColumnRequest,
    userId: UserEntity['id'],
  ): Promise<AppSingleResponse<ColumnEntity>> {
    const savedColumn = await this.columnRepository.save(
      this.columnRepository.create({
        ...request,
        userId: userId,
        ...filterUndefined(request),
      }),
    );

    return new AppSingleResponse(savedColumn);
  }

  async findOne(
    id: ColumnEntity['id'],
    userId: UserEntity['id'],
  ): Promise<AppSingleResponse<ColumnEntity>> {
    const column = await this.columnRepository.findOne({
      where: {
        id: id,
        userId: userId,
      },
    });

    if (!column)
      throw MainException.entityNotFound(`Column with id ${id} not found`);

    return new AppSingleResponse(column);
  }

  async findAll(
    id: UserEntity['id'],
  ): Promise<AppSingleResponse<ColumnEntity[]>> {
    const columns = await this.columnRepository.find({
      where: {
        userId: id,
      },
    });

    if (!columns)
      throw MainException.entityNotFound(
        `Columnds for user with id ${id} not found`,
      );

    return new AppSingleResponse(columns);
  }

  async update(
    id: ColumnEntity['id'],
    request: UpdateColumnRequest,
    userId: UserEntity['id'],
  ): Promise<AppSingleResponse<ColumnEntity>> {
    const column = await this.columnRepository.findOne({
      where: {
        id: id,
        userId: userId,
      },
    });

    if (!column)
      throw MainException.forbidden(
        `Cannot update column for user with id ${userId}`,
      );
    const savedColumn = await this.columnRepository.save({
      ...column,
      ...filterUndefined(request),
    });

    return new AppSingleResponse(savedColumn);
  }

  async delete(
    id: ColumnEntity['id'],
    userId: UserEntity['id'],
  ): Promise<AppStatusResponse> {
    const column = await this.columnRepository.findOne({
      where: {
        id: id,
        userId: userId,
      },
    });

    if (!column)
      throw MainException.forbidden(
        `Cannot delete column for user with id ${userId}`,
      );

    const { affected } = await this.columnRepository.delete(id);

    return new AppStatusResponse(!!affected);
  }
}
