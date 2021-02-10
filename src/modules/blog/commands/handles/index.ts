import { CategoryCreateHandler } from './category/category-create.handler';
import { CategoryUpdateHandler } from './category/category-update.handler';
import { CategoryDeleteHandler } from './category/category-delete.handler';
import { TagCreateHandler } from './tag/tag-create.handler';
import { TagUpdateHandler } from './tag/tag-update.handler';
import { TagDeleteHandler } from './tag/tag-delete.handler';
import { PostCreateHandler } from './post/post-create.handler';
import { PostUpdateHandler } from './post/post-update.handler';
import { PostDeleteHandler } from './post/post-delete.handler';
import { PostAddTagHandler } from './post/post-add-tag.command';
import { PostDelTagHandler } from './post/post-del-tag.command';
import { PostDelAllTagHandler } from './post/post-del-all-tag.command';

export const CommandHandlers = [
  CategoryCreateHandler,
  CategoryUpdateHandler,
  CategoryDeleteHandler,
  TagCreateHandler,
  TagUpdateHandler,
  TagDeleteHandler,
  PostCreateHandler,
  PostUpdateHandler,
  PostDeleteHandler,
  PostAddTagHandler,
  PostDelTagHandler,
  PostDelAllTagHandler,
];
