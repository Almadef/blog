import { CategoriesListArgsDto } from '../../../dto/input/category/categories-list-args.dto';

export class CategoriesListQuery {
  constructor(public readonly args: CategoriesListArgsDto) {}
}
export const enum ErrorCodes {}
