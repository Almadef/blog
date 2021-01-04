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

export enum CategoriesListSortingFields {
  'id' = 'id',
  'title' = 'title',
  'created_at' = 'created_at',
  'updated_at' = 'updated_at',
}

registerEnumType(CategoriesListSortingFields, {
  name: 'CategoriesListSortingFields',
});

@InputType('categories_list_sorting')
export class CategoriesListSorting extends SortingArgs {
  @IsEnum(CategoriesListSortingFields)
  @Field(() => CategoriesListSortingFields)
  field: CategoriesListSortingFields;
}

@InputType('categories_list_filter')
export class CategoriesListFilter {
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
export class CategoriesListArgsDto extends PaginatedArgs {
  @IsOptional()
  @Field(() => CategoriesListSorting, { nullable: true })
  sorting?: CategoriesListSorting;

  @IsOptional()
  @ValidateNested()
  @Type(() => CategoriesListFilter)
  @Field(() => CategoriesListFilter, { nullable: true })
  filter?: CategoriesListFilter;
}
