import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Type } from '@nestjs/common';

export interface PaginatedType<T> {
  rows: T[];
  total: number;
}

export function Paginated<T>(classRef: Type<T>): Type<PaginatedType<T>> {
  @ObjectType({ isAbstract: true })
  abstract class PaginatedTyping implements PaginatedType<T> {
    @Field(() => [classRef])
    rows: T[];

    @Field(() => Int)
    total: number;
  }

  return PaginatedTyping as Type<PaginatedType<T>>;
}
