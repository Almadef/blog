import { TagUpdateDto } from '../../../dto/input/tag/tag-update.dto';

export class TagUpdateCommand {
  constructor(
    public readonly tagId: number,
    public readonly args: TagUpdateDto,
  ) {}
}

export enum ErrorCodes {
  'TAG_TITLE_COLUMN_UNIQUE' = 'TAG_TITLE_COLUMN_UNIQUE',
  'TAG_NOT_FOUND' = 'TAG_NOT_FOUND',
}
