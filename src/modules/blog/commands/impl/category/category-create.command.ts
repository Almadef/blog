import { CategoryCreateDto } from '../../../dto/input/category/category-create.dto';

export class CategoryCreateCommand {
  constructor(public readonly args: CategoryCreateDto) {}
}

export enum ErrorCodes {
  'CATEGORY_TITLE_COLUMN_UNIQUE' = 'CATEGORY_TITLE_COLUMN_UNIQUE',
}
