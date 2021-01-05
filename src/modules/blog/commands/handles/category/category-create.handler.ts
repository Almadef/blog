import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import {
  ErrorCodes,
  CategoryCreateCommand,
} from '../../impl/category/category-create.command';
import { CategoryEntity } from '../../../entities/category.entity';
import { CategoryRepository } from '../../../repositories/category.repository';

@CommandHandler(CategoryCreateCommand)
export class CategoryCreateHandler
  implements ICommandHandler<CategoryCreateCommand> {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async execute(command: CategoryCreateCommand): Promise<CategoryEntity> {
    const category = new CategoryEntity();
    category.title = command.args.title;
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
