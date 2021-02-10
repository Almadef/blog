import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { PostRepository } from '../../../repositories/post.repository';
import { PostEntity } from '../../../entities/post.entity';
import {
  PostDelAllTagCommand,
  ErrorCodes,
} from '../../impl/post/post-del-all-tag.command';

@CommandHandler(PostDelAllTagCommand)
export class PostDelAllTagHandler
  implements ICommandHandler<PostDelAllTagCommand> {
  constructor(private readonly postRepository: PostRepository) {}

  async execute(command: PostDelAllTagCommand): Promise<PostEntity> {
    const post = await this.postRepository.findOne(command.postId, {
      relations: ['tags'],
    });

    if (!post) {
      throw new Error(ErrorCodes.POST_NOT_FOUND);
    }
    post.tags = [];

    try {
      const postFromDB = await this.postRepository.save(post);
      return postFromDB;
    } catch (err) {
      throw err;
    }
  }
}
