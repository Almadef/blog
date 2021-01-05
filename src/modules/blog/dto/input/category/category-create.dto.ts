import { Field, InputType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class CategoryCreateDto {
  @IsString()
  @Field()
  title: string;
}
