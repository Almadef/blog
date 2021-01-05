import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import {
  ErrorCodes,
  TagCreateCommand,
} from '../../impl/tag/tag-create.command';
import { TagEntity } from '../../../entities/tag.entity';
import { TagRepository } from '../../../repositories/tag.repository';

@CommandHandler(TagCreateCommand)
export class TagCreateHandler implements ICommandHandler<TagCreateCommand> {
  constructor(private readonly tagRepository: TagRepository) {}

  async execute(command: TagCreateCommand): Promise<TagEntity> {
    const tag = new TagEntity();
    tag.title = command.args.title;
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
