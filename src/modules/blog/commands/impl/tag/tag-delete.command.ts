export class TagDeleteCommand {
  constructor(public readonly tagId: number) {}
}

export enum ErrorCodes {
  'TAG_NOT_FOUND' = 'TAG_NOT_FOUND',
}
