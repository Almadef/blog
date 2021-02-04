import { Field, ObjectType } from '@nestjs/graphql';
import { IsString, IsInt } from 'class-validator';

@ObjectType()
export class PostOneDto {
  @IsInt()
  @Field()
  id: number;

  @IsString()
  @Field()
  title: string;

  @IsString()
  @Field()
  preview: string;

  @IsString()
  @Field()
  description: string;

  @IsString()
  @Field()
  image_mobile_preview: string;

  @IsString()
  @Field()
  image_mobile_description: string;

  @IsString()
  @Field()
  image_site_preview: string;

  @IsString()
  @Field()
  image_site_description: string;

  @IsString()
  @Field()
  meta_description: string;

  @IsString()
  @Field()
  meta_keywords: string;
}
