export class PostDelTagCommand {
  constructor(public readonly postId: number, public readonly tagId: number) {}
}

export enum ErrorCodes {
  'POST_NOT_FOUND' = 'POST_NOT_FOUND',
  'TAG_NOT_FOUND' = 'TAG_NOT_FOUND',
}
