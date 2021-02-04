import { PostUpdateDto } from '../../../dto/input/post/post-update.dto';

export class PostUpdateCommand {
  constructor(
    public readonly postId: number,
    public readonly args: PostUpdateDto,
  ) {}
}

export enum ErrorCodes {
  'POST_TITLE_COLUMN_UNIQUE' = 'POST_TITLE_COLUMN_UNIQUE',
  'CATEGORY_NOT_FOUND' = 'CATEGORY_NOT_FOUND',
  'POST_NOT_FOUND' = 'POST_NOT_FOUND',
}
