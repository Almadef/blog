import { PostCreateDto } from '../../../dto/input/post/post-create.dto';

export class PostCreateCommand {
  constructor(public readonly args: PostCreateDto) {}
}

export enum ErrorCodes {
  'POST_TITLE_COLUMN_UNIQUE' = 'POST_TITLE_COLUMN_UNIQUE',
  'CATEGORY_NOT_FOUND' = 'CATEGORY_NOT_FOUND',
}
