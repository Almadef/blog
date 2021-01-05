import { CategoryByIdHandler } from './category/category-by-id.handler';
import { CategoriesListHandler } from './category/categories-list.handler';
import { TagByIdHandler } from './tag/tag-by-id.handler';
import { TagsListHandler } from './tag/tags-list.handler';

export const QueryHandlers = [
  CategoryByIdHandler,
  CategoriesListHandler,
  TagByIdHandler,
  TagsListHandler,
];
