import { Field, InputType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class TagUpdateDto {
  @IsString()
  @Field()
  title: string;
}
