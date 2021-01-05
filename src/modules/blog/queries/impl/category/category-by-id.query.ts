export class CategoryByIdQuery {
  constructor(public readonly categoryId: number) {}
}

export const enum ErrorCodes {
  'CATEGORY_NOT_FOUND' = 'CATEGORY_NOT_FOUND',
}
