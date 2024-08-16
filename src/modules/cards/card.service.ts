import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CardEntity } from './entities/card.entity';
import { CreateCardRequest } from './dto/create-card.dto';
import { UserEntity } from '../users/entity/user.entity';
import { AppSingleResponse } from 'src/dto/app-single-response.dto';
import { filterUndefined } from 'src/utils/filter-undefined.util';
import { MainException } from 'src/exceptions/main.exception';
import { ColumnEntity } from '../columns/entities/column.entity';
import { AppStatusResponse } from 'src/dto/app-status-response.dto';
import { UpdateCardRequest } from './dto/update-card.dto';

@Injectable()
export class CardService {
  constructor(
    @InjectRepository(CardEntity)
    private readonly cardRepository: Repository<CardEntity>,
  ) {}

  async create(
    request: CreateCardRequest,
    userId: UserEntity['id'],
  ): Promise<AppSingleResponse<CardEntity>> {
    const card = await this.cardRepository.save(
      this.cardRepository.create({
        ...request,
        userId: userId,
        ...filterUndefined(request),
      }),
    );

    return new AppSingleResponse(card);
  }

  async findOne(
    id: CardEntity['id'],
    userId: UserEntity['id'],
  ): Promise<AppSingleResponse<CardEntity>> {
    const card = await this.cardRepository.findOne({
      where: {
        id: id,
        userId: userId,
      },
    });

    if (!card)
      throw MainException.entityNotFound(`Card with id ${id} not found`);

    return new AppSingleResponse(card);
  }

  async findAll(
    userId: UserEntity['id'],
  ): Promise<AppSingleResponse<CardEntity[]>> {
    const cards = await this.cardRepository.find({
      where: {
        userId: userId,
      },
    });

    if (!cards)
      throw MainException.entityNotFound(
        `Cards  for user with id ${userId} not found`,
      );

    return new AppSingleResponse(cards);
  }

  async findAllByColumnId(
    userId: UserEntity['id'],
    columnId: ColumnEntity['id'],
  ): Promise<AppSingleResponse<CardEntity[]>> {
    const cards = await this.cardRepository.find({
      where: {
        userId: userId,
        columnId: columnId,
      },
    });

    if (!cards)
      throw MainException.entityNotFound(
        `Cannot find cards in column with id ${columnId} or for user with id ${userId}`,
      );

    return new AppSingleResponse(cards);
  }

  async update(
    request: UpdateCardRequest,
    id: CardEntity['id'],
    columnId: ColumnEntity['id'],
    userId: UserEntity['id'],
  ): Promise<AppSingleResponse<CardEntity>> {
    const card = await this.cardRepository.findOne({
      where: {
        id: id,
        columnId: columnId,
        userId: userId,
      },
    });

    if (!card)
      throw MainException.forbidden(
        `Cannot update card with id ${id} for column with id ${columnId} or for user with id ${userId}`,
      );

    const savedCard = await this.cardRepository.save({
      ...card,
      ...filterUndefined(request),
    });

    return new AppSingleResponse(savedCard);
  }

  async delete(id: CardEntity['id'], userId: UserEntity['id']) {
    const card = await this.cardRepository.findOne({
      where: {
        id: id,
        userId: userId,
      },
    });

    if (!card)
      throw MainException.forbidden(
        `Cannot delete card for user with id ${userId}`,
      );

    const { affected } = await this.cardRepository.delete(id);

    return new AppStatusResponse(!!affected);
  }
}
