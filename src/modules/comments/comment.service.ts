import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommentEntity } from './entities/comment.entity';
import { UserEntity } from '../users/entity/user.entity';
import { filterUndefined } from 'src/utils/filter-undefined.util';
import { AppSingleResponse } from 'src/dto/app-single-response.dto';
import { CardEntity } from '../cards/entities/card.entity';
import { ColumnEntity } from '../columns/entities/column.entity';
import { MainException } from 'src/exceptions/main.exception';
import { UpdateCommentRequest } from './dto/update-comment.dto';
import { AppStatusResponse } from 'src/dto/app-status-response.dto';
import { CreateCommentRequest } from './dto/create-comment.dto';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentEntity)
    private readonly commentRepository: Repository<CommentEntity>,
  ) {}

  async create(
    request: CreateCommentRequest,
    userId: UserEntity['id'],
  ): Promise<AppSingleResponse<CommentEntity>> {
    const comment = await this.commentRepository.save(
      this.commentRepository.create({
        ...request,
        userId: userId,
        ...filterUndefined(request),
      }),
    );

    return new AppSingleResponse(comment);
  }

  async fidnOne(
    id: CommentEntity['id'],
    cardId: CardEntity['id'],
    columnId: ColumnEntity['id'],
    userId: UserEntity['id'],
  ): Promise<AppSingleResponse<CommentEntity>> {
    const comment = await this.commentRepository.findOne({
      where: {
        id: id,
        columnId: columnId,
        cardId: cardId,
        userId: userId,
      },
    });

    if (!comment)
      throw MainException.entityNotFound(`Comment with id ${id} not found`);

    return new AppSingleResponse(comment);
  }

  async fidnAll(
    userId: UserEntity['id'],
  ): Promise<AppSingleResponse<CommentEntity[]>> {
    const comments = await this.commentRepository.find({
      where: {
        userId: userId,
      },
    });

    return new AppSingleResponse(comments);
  }

  async findAllByColumnId(
    userId: UserEntity['id'],
    columnId: ColumnEntity['id'],
  ): Promise<AppSingleResponse<CommentEntity[]>> {
    const comments = await this.commentRepository.find({
      where: {
        userId: userId,
        columnId: columnId,
      },
    });

    if (!comments)
      throw MainException.entityNotFound(
        `Cannot find comments in column with id ${columnId} or for user with id ${userId}`,
      );

    return new AppSingleResponse(comments);
  }

  async findAllByCardId(
    userId: UserEntity['id'],
    cardId: CardEntity['id'],
  ): Promise<AppSingleResponse<CommentEntity[]>> {
    const comments = await this.commentRepository.find({
      where: {
        userId: userId,
        cardId: cardId,
      },
    });

    if (!comments)
      throw MainException.entityNotFound(
        `Cannot find comments in card with id ${cardId} or for user with id ${userId}`,
      );

    return new AppSingleResponse(comments);
  }

  async update(
    request: UpdateCommentRequest,
    id: CardEntity['id'],
    columnId: ColumnEntity['id'],
    cardId: CardEntity['id'],
    userId: UserEntity['id'],
  ): Promise<AppSingleResponse<CommentEntity>> {
    const comment = await this.commentRepository.findOne({
      where: {
        id: id,
        columnId: columnId,
        cardId: cardId,
        userId: userId,
      },
    });

    if (!comment)
      throw MainException.forbidden(
        `Cannot update comment with id ${id} for column with id ${columnId} or for card with id ${cardId} or for user with id ${userId}`,
      );

    const savedComment = await this.commentRepository.save({
      ...comment,
      ...filterUndefined(request),
    });

    return new AppSingleResponse(savedComment);
  }

  async delete(id: CommentEntity['id'], userId: UserEntity['id']) {
    const comment = await this.commentRepository.findOne({
      where: {
        id: id,
        userId: userId,
      },
    });

    if (!comment)
      throw MainException.forbidden(
        `Cannot delete comment for user with id ${userId}`,
      );

    const { affected } = await this.commentRepository.delete(id);

    return new AppStatusResponse(!!affected);
  }
}
