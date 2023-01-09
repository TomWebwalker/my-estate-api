import { ArgsType, Field, Int, registerEnumType } from '@nestjs/graphql';

export enum SortDir {
  ASC = 'ASC',
  DESC = 'DESC',
}

registerEnumType(SortDir, {
  name: 'SortDir',
});

@ArgsType()
export class PaginationArgs {
  @Field(() => Int)
  offset = 0;

  @Field(() => Int)
  limit = 10;

  @Field(() => String, { nullable: true })
  sortBy = '';

  @Field(() => SortDir, { nullable: true })
  sortDir: SortDir;
}
