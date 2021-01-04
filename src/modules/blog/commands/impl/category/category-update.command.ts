import { CategoryUpdateDto } from '../../../dto/input/category/category-update.dto';

export class CategoryUpdateCommand {
  constructor(
    public readonly categoryId: number,
    public readonly args: CategoryUpdateDto,
  ) {}
}

export enum ErrorCodes {
  'CATEGORY_TITLE_COLUMN_UNIQUE' = 'CATEGORY_TITLE_COLUMN_UNIQUE',
  'CATEGORY_NOT_FOUND' = 'CATEGORY_NOT_FOUND',
}
