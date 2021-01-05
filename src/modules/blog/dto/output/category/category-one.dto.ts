import { Field, ObjectType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@ObjectType()
export class CategoryOneDto {
  @Field()
  id: number;

  @IsString()
  @Field()
  title: string;
}
