import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNumber, IsOptional } from 'class-validator';

@InputType()
export class PaginatedArgs {
  @IsOptional()
  @IsNumber()
  @Field(() => Int, { nullable: true, description: 'Page to display' })
  page: number;

  @IsOptional()
  @IsNumber()
  @Field(() => Int, { nullable: true, description: 'Count on page' })
  pageSize: number;
}
