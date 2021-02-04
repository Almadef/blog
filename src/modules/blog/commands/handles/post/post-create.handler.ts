import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import {
  ErrorCodes,
  PostCreateCommand,
} from '../../impl/post/post-create.command';
import { PostEntity } from '../../../entities/post.entity';
import { PostRepository } from '../../../repositories/post.repository';
import { CategoryRepository } from '../../../repositories/category.repository';

@CommandHandler(PostCreateCommand)
export class PostCreateHandler implements ICommandHandler<PostCreateCommand> {
  constructor(
    private readonly postRepository: PostRepository,
    private readonly categoryRepository: CategoryRepository,
  ) {}

  async execute(command: PostCreateCommand): Promise<PostEntity> {
    let post = new PostEntity();
    post = Object.assign(post, command.args);

    const category = await this.categoryRepository.findOne(
      command.args.categoryId,
    );
    if (!category) {
      throw new Error(ErrorCodes.CATEGORY_NOT_FOUND);
    }
    post.category = category;

    try {
      const postFromDB = await this.postRepository.save(post);
      return postFromDB;
    } catch (err) {
      if (err.message.indexOf('unique constraint') >= 0) {
        throw new Error(ErrorCodes.POST_TITLE_COLUMN_UNIQUE);
      }
      throw err;
    }
  }
}
