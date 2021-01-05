import { Field, ObjectType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@ObjectType()
export class TagOneDto {
  @Field()
  id: number;

  @IsString()
  @Field()
  title: string;
}
