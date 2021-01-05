import { Field, InputType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class CategoryUpdateDto {
  @IsString()
  @Field()
  title: string;
}
