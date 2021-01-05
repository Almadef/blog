import { Field, InputType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class TagCreateDto {
  @IsString()
  @Field()
  title: string;
}
