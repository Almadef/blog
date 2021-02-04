import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { PostRepository } from '../../../repositories/post.repository';
import { CategoryRepository } from '../../../repositories/category.repository';
import { PostEntity } from '../../../entities/post.entity';
import {
  PostUpdateCommand,
  ErrorCodes,
} from '../../impl/post/post-update.command';

@CommandHandler(PostUpdateCommand)
export class PostUpdateHandler implements ICommandHandler<PostUpdateCommand> {
  constructor(
    private readonly postRepository: PostRepository,
    private readonly categoryRepository: CategoryRepository,
  ) {}

  async execute(command: PostUpdateCommand): Promise<PostEntity> {
    let post = await this.postRepository.findOne(command.postId);

    if (!post) {
      throw new Error(ErrorCodes.POST_NOT_FOUND);
    }

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
