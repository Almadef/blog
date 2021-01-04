import { CategoryCreateHandler } from './category/category-create.handler';
import { CategoryUpdateHandler } from './category/category-update.handler';
import { CategoryDeleteHandler } from './category/category-delete.handler';

export const CommandHandlers = [
  CategoryCreateHandler,
  CategoryUpdateHandler,
  CategoryDeleteHandler,
];
