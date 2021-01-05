export class TagByIdQuery {
  constructor(public readonly tagId: number) {}
}

export const enum ErrorCodes {
  'TAG_NOT_FOUND' = 'TAG_NOT_FOUND',
}
