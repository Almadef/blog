import { CategoryCreateHandler } from './category/category-create.handler';
import { CategoryUpdateHandler } from './category/category-update.handler';
import { CategoryDeleteHandler } from './category/category-delete.handler';
import { TagCreateHandler } from './tag/tag-create.handler';
import { TagUpdateHandler } from './tag/tag-update.handler';
import { TagDeleteHandler } from './tag/tag-delete.handler';

export const CommandHandlers = [
  CategoryCreateHandler,
  CategoryUpdateHandler,
  CategoryDeleteHandler,
  TagCreateHandler,
  TagUpdateHandler,
  TagDeleteHandler,
];
