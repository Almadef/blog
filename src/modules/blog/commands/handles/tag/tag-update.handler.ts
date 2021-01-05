import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { TagRepository } from '../../../repositories/tag.repository';
import { TagEntity } from '../../../entities/tag.entity';
import {
  TagUpdateCommand,
  ErrorCodes,
} from '../../impl/tag/tag-update.command';

@CommandHandler(TagUpdateCommand)
export class TagUpdateHandler implements ICommandHandler<TagUpdateCommand> {
  constructor(private readonly tagRepository: TagRepository) {}

  async execute(command: TagUpdateCommand): Promise<TagEntity> {
    let tag = await this.tagRepository.findOne(command.tagId);

    if (!tag) {
      throw new Error(ErrorCodes.TAG_NOT_FOUND);
    }

    tag = Object.assign(tag, command.args);
    try {
      const tagFromDB = await this.tagRepository.save(tag);
      return tagFromDB;
    } catch (err) {
      if (err.message.indexOf('unique constraint') >= 0) {
        throw new Error(ErrorCodes.TAG_TITLE_COLUMN_UNIQUE);
      }
      throw err;
    }
  }
}
