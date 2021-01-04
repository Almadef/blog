import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CategoryRepository } from '../../../repositories/category.repository';
import {
  CategoryDeleteCommand,
  ErrorCodes,
} from '../../impl/category/category-delete.command';

@CommandHandler(CategoryDeleteCommand)
export class CategoryDeleteHandler
  implements ICommandHandler<CategoryDeleteCommand> {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async execute(command: CategoryDeleteCommand): Promise<boolean> {
    const category = await this.categoryRepository.findOne(command.categoryId);

    if (!category) {
      throw new Error(ErrorCodes.CATEGORY_NOT_FOUND);
    }
    try {
      await this.categoryRepository.delete(category);
    } catch (err) {
      throw err;
    }
    return true;
  }
}
