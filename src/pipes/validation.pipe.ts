import { ArgumentMetadata, PipeTransform } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { MainException } from '../exceptions/main.exception';

export class ValidationPipe implements PipeTransform {
  public async transform(value: unknown, metaData: ArgumentMetadata) {
    const { metatype } = metaData;
    const object = plainToClass(metatype!, value);

    if (typeof value === 'object') {
      const errors = await validate(object);
      if (errors.length) throw MainException.invalidData(errors);
    }

    return object;
  }
}
