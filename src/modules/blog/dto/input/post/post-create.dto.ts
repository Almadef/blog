import { Field, InputType } from '@nestjs/graphql';
import { IsString, IsInt } from 'class-validator';

@InputType()
export class PostCreateDto {
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
  @Field({ nullable: true })
  image_mobile_preview?: string;

  @IsString()
  @Field({ nullable: true })
  image_mobile_description?: string;

  @IsString()
  @Field({ nullable: true })
  image_site_preview?: string;

  @IsString()
  @Field({ nullable: true })
  image_site_description?: string;

  @IsString()
  @Field()
  meta_description: string;

  @IsString()
  @Field()
  meta_keywords: string;

  @IsInt()
  @Field()
  categoryId: number;
}
