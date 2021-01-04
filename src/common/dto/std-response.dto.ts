import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class StdResponseDto {
  @Field()
  result: boolean;

  @Field({ nullable: true })
  message?: string;
}
