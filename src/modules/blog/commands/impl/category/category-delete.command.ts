export class CategoryDeleteCommand {
  constructor(public readonly categoryId: number) {}
}

export enum ErrorCodes {
  'CATEGORY_NOT_FOUND' = 'CATEGORY_NOT_FOUND',
}
