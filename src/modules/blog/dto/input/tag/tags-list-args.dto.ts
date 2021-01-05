import { Field, InputType, registerEnumType, Int } from '@nestjs/graphql';
import {
  IsEnum,
  IsOptional,
  ValidateNested,
  IsString,
  IsNumber,
} from 'class-validator';
import { Type } from 'class-transformer';
import { PaginatedArgs } from '../../../../../common/graphql/paginated-args';
import { SortingArgs } from '../../../../../common/graphql/sorting-args';

export enum TagsListSortingFields {
  'id' = 'id',
  'title' = 'title',
  'created_at' = 'created_at',
  'updated_at' = 'updated_at',
}

registerEnumType(TagsListSortingFields, {
  name: 'TagsListSortingFields',
});

@InputType('tags_list_sorting')
export class TagsListSorting extends SortingArgs {
  @IsEnum(TagsListSortingFields)
  @Field(() => TagsListSortingFields)
  field: TagsListSortingFields;
}

@InputType('tags_list_filter')
export class TagsListFilter {
  @IsOptional()
  @IsNumber()
  @Field(() => Int, { nullable: true })
  id?: number;

  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  title?: string;
}

@InputType()
export class TagsListArgsDto extends PaginatedArgs {
  @IsOptional()
  @Field(() => TagsListSorting, { nullable: true })
  sorting?: TagsListSorting;

  @IsOptional()
  @ValidateNested()
  @Type(() => TagsListFilter)
  @Field(() => TagsListFilter, { nullable: true })
  filter?: TagsListFilter;
}
