import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { PostRepository } from '../../../repositories/post.repository';
import { TagRepository } from '../../../repositories/tag.repository';
import { PostEntity } from '../../../entities/post.entity';
import {
  PostDelTagCommand,
  ErrorCodes,
} from '../../impl/post/post-del-tag.command';

@CommandHandler(PostDelTagCommand)
export class PostDelTagHandler implements ICommandHandler<PostDelTagCommand> {
  constructor(
    private readonly postRepository: PostRepository,
    private readonly tagRepository: TagRepository,
  ) {}

  async execute(command: PostDelTagCommand): Promise<PostEntity> {
    const post = await this.postRepository.findOne(command.postId);

    if (!post) {
      throw new Error(ErrorCodes.POST_NOT_FOUND);
    }

    const tagToRemove = await this.tagRepository.findOne(command.tagId, {
      relations: ['tags'],
    });

    if (!tagToRemove) {
      throw new Error(ErrorCodes.TAG_NOT_FOUND);
    }

    post.tags = post.tags.filter((tag) => {
      tag.id !== tagToRemove.id;
    });

    try {
      const postFromDB = await this.postRepository.save(post);
      return postFromDB;
    } catch (err) {
      throw err;
    }
  }
}
