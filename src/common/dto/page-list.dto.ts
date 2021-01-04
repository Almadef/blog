export class PageListDto<T> {
  readonly page: number;

  readonly pageSize: number;

  readonly pageCount: number;

  readonly totalCount: number;

  readonly hasNextPage: boolean;

  readonly hasPrevPage: boolean;

  constructor(page, take, totalCount, items: T[]) {
    this.page = page ? page : 1;
    this.pageSize = take ? take : totalCount;
    this.pageCount = take ? Math.ceil(totalCount / take) : 1;
    this.totalCount = totalCount;
    this.hasNextPage = this.page < this.pageCount;
    this.hasPrevPage = this.page > 1;
    this.items = items;
  }
  readonly items: T[];
}
