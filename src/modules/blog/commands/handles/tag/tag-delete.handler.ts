import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { TagRepository } from '../../../repositories/tag.repository';
import {
  TagDeleteCommand,
  ErrorCodes,
} from '../../impl/tag/tag-delete.command';

@CommandHandler(TagDeleteCommand)
export class TagDeleteHandler implements ICommandHandler<TagDeleteCommand> {
  constructor(private readonly tagRepository: TagRepository) {}

  async execute(command: TagDeleteCommand): Promise<boolean> {
    const tag = await this.tagRepository.findOne(command.tagId);

    if (!tag) {
      throw new Error(ErrorCodes.TAG_NOT_FOUND);
    }
    try {
      await this.tagRepository.delete(tag);
    } catch (err) {
      throw err;
    }
    return true;
  }
}
