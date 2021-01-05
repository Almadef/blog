import { TagsListArgsDto } from '../../../dto/input/tag/tags-list-args.dto';

export class TagsListQuery {
  constructor(public readonly args: TagsListArgsDto) {}
}
export const enum ErrorCodes {}
