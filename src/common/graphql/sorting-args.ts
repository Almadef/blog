import { Field, InputType, registerEnumType } from '@nestjs/graphql';
import { IsEnum } from 'class-validator';

export enum SortingDirectionsEnum {
  'asc' = 'asc',
  'desc' = 'desc',
}

registerEnumType(SortingDirectionsEnum, {
  name: 'SortingDirectionsEnum',
});

@InputType('sorting_args')
export abstract class SortingArgs {
  @IsEnum(SortingDirectionsEnum)
  @Field(() => SortingDirectionsEnum)
  direction: SortingDirectionsEnum;
}
