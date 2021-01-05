import { TagCreateDto } from '../../../dto/input/tag/tag-create.dto';

export class TagCreateCommand {
  constructor(public readonly args: TagCreateDto) {}
}

export enum ErrorCodes {
  'TAG_TITLE_COLUMN_UNIQUE' = 'TAG_TITLE_COLUMN_UNIQUE',
}
