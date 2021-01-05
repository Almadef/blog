import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import {
  ErrorCodes,
  CategoryByIdQuery,
} from '../../impl/category/category-by-id.query';
import { CategoryRepository } from '../../../repositories/category.repository';
import { CategoryOneDto } from '../../../dto/output/category/category-one.dto';

@QueryHandler(CategoryByIdQuery)
export class CategoryByIdHandler implements IQueryHandler<CategoryByIdQuery> {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async execute(query: CategoryByIdQuery): Promise<CategoryOneDto> {
    const category = await this.categoryRepository.findOne(query.categoryId);

    if (!category) {
      throw new Error(ErrorCodes.CATEGORY_NOT_FOUND);
    }

    return category;
  }
}
