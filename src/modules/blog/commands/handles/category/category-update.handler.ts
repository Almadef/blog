import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CategoryRepository } from '../../../repositories/category.repository';
import { CategoryEntity } from '../../../entities/category.entity';
import {
  CategoryUpdateCommand,
  ErrorCodes,
} from '../../impl/category/category-update.command';

@CommandHandler(CategoryUpdateCommand)
export class CategoryUpdateHandler
  implements ICommandHandler<CategoryUpdateCommand> {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async execute(command: CategoryUpdateCommand): Promise<CategoryEntity> {
    let category = await this.categoryRepository.findOne(command.categoryId);

    if (!category) {
      throw new Error(ErrorCodes.CATEGORY_NOT_FOUND);
    }

    category = Object.assign(category, command.args);
    try {
      const categoryFromDB = await this.categoryRepository.save(category);
      return categoryFromDB;
    } catch (err) {
      if (err.message.indexOf('unique constraint') >= 0) {
        throw new Error(ErrorCodes.CATEGORY_TITLE_COLUMN_UNIQUE);
      }
      throw err;
    }
  }
}
