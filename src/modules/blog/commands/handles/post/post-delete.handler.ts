import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { PostRepository } from '../../../repositories/post.repository';
import {
  PostDeleteCommand,
  ErrorCodes,
} from '../../impl/post/post-delete.command';

@CommandHandler(PostDeleteCommand)
export class PostDeleteHandler implements ICommandHandler<PostDeleteCommand> {
  constructor(private readonly postRepository: PostRepository) {}

  async execute(command: PostDeleteCommand): Promise<boolean> {
    const post = await this.postRepository.findOne(command.postId);

    if (!post) {
      throw new Error(ErrorCodes.POST_NOT_FOUND);
    }
    try {
      await this.postRepository.delete(post);
    } catch (err) {
      throw err;
    }
    return true;
  }
}
