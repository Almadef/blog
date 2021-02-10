import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { PostRepository } from '../../../repositories/post.repository';
import { TagRepository } from '../../../repositories/tag.repository';
import { PostEntity } from '../../../entities/post.entity';
import {
  PostAddTagCommand,
  ErrorCodes,
} from '../../impl/post/post-add-tag.command';

@CommandHandler(PostAddTagCommand)
export class PostAddTagHandler implements ICommandHandler<PostAddTagCommand> {
  constructor(
    private readonly postRepository: PostRepository,
    private readonly tagRepository: TagRepository,
  ) {}

  async execute(command: PostAddTagCommand): Promise<PostEntity> {
    const post = await this.postRepository.findOne(command.postId, {
      relations: ['tags'],
    });

    if (!post) {
      throw new Error(ErrorCodes.POST_NOT_FOUND);
    }

    const tagToAdd = await this.tagRepository.findOne(command.tagId);

    if (!tagToAdd) {
      throw new Error(ErrorCodes.TAG_NOT_FOUND);
    }

    const found = post.tags.some(function (tag) {
      return tag.id === tagToAdd.id;
    });
    if (!found) {
      post.tags.push(tagToAdd);
    }

    try {
      const postFromDB = await this.postRepository.save(post);
      return postFromDB;
    } catch (err) {
      throw err;
    }
  }
}
