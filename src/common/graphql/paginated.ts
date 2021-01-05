import { Field, ObjectType } from '@nestjs/graphql';
import { Type } from '@nestjs/common';

export function Paginated<T>(classRef: Type<T>): any {
  @ObjectType({ isAbstract: true })
  abstract class PaginatedType {
    @Field(() => [classRef], { nullable: true })
    items: T[];

    @Field()
    hasNextPage: boolean;

    @Field()
    hasPrevPage: boolean;

    @Field({ nullable: true, description: 'Count elements on page' })
    pageSize: number;

    @Field({ nullable: true, description: 'Total elements' })
    totalCount: number;

    @Field({ nullable: true, description: 'Current page number' })
    page: number;

    @Field({ nullable: true, description: 'Total pages' })
    pageCount: number;
  }
  return PaginatedType;
}
