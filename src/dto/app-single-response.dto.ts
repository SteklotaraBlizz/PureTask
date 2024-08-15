import { ApiProperty } from '@nestjs/swagger';
import { createDerivedClass } from 'src/utils/create-derived-class.util';

import { ObjectLiteral } from 'typeorm';

export class AppSingleResponse<Entity extends ObjectLiteral> {
  constructor(public data: Entity) {
    this.data = data;
  }

  static type<T extends ObjectLiteral>(type: new (...args: unknown[]) => T) {
    class AppSingleResponseType extends AppSingleResponse<T> {
      @ApiProperty({ type })
      public data: T;
    }
    return createDerivedClass(
      `AppPagination${type.name}ResponseType`,
      AppSingleResponseType,
    );
  }
}
