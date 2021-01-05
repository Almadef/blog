import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ErrorCodes, TagByIdQuery } from '../../impl/tag/tag-by-id.query';
import { TagRepository } from '../../../repositories/tag.repository';
import { TagOneDto } from '../../../dto/output/tag/tag-one.dto';

@QueryHandler(TagByIdQuery)
export class TagByIdHandler implements IQueryHandler<TagByIdQuery> {
  constructor(private readonly tagRepository: TagRepository) {}

  async execute(query: TagByIdQuery): Promise<TagOneDto> {
    const tag = await this.tagRepository.findOne(query.tagId);

    if (!tag) {
      throw new Error(ErrorCodes.TAG_NOT_FOUND);
    }

    return tag;
  }
}
