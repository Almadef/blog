export class PostDelAllTagCommand {
  constructor(public readonly postId: number) {}
}

export enum ErrorCodes {
  'POST_NOT_FOUND' = 'POST_NOT_FOUND',
}
