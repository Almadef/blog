import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToClass } from 'class-transformer';
import { PageListDto } from '../../../../../common/dto/page-list.dto';
import { SelectQueryBuilder } from 'typeorm';
import { SortingDirectionsEnum } from '../../../../../common/graphql/sorting-args';
import { TagsListQuery } from '../../impl/tag/tags-list.query';
import { TagRepository } from '../../../repositories/tag.repository';
import { TagOneDto } from '../../../dto/output/tag/tag-one.dto';
import { TagEntity } from '../../../entities/tag.entity';
import {
  TagsListFilter,
  TagsListSorting,
  TagsListSortingFields,
} from '../../../dto/input/tag/tags-list-args.dto';

@QueryHandler(TagsListQuery)
export class TagsListHandler implements IQueryHandler<TagsListQuery> {
  constructor(private readonly tagRepository: TagRepository) {}

  async execute(query: TagsListQuery) {
    const queryBuilder = this.tagRepository.createQueryBuilder('tag');

    if (query.args.filter) {
      this.filter(queryBuilder, query.args.filter);
    }

    if (query.args.sorting) {
      this.sorting(queryBuilder, query.args.sorting);
    }
    const page = query.args.page;
    let pageSize = query.args.pageSize;

    if (page) {
      pageSize = pageSize ? pageSize : 10;
      queryBuilder.skip((page - 1) * pageSize);
    }

    if (pageSize) {
      queryBuilder.take(pageSize);
    }

    const builder = queryBuilder.getManyAndCount();
    const [tags, categoiesCount] = await builder;
    const items = tags.map((tag) => plainToClass(TagOneDto, tag));
    return new PageListDto<TagOneDto>(page, pageSize, categoiesCount, items);
  }

  private filter(
    queryBuilder: SelectQueryBuilder<TagEntity>,
    args: TagsListFilter,
  ) {
    if (typeof args.id !== 'undefined') {
      queryBuilder.andWhere('tag.id = :id', {
        id: args.id,
      });
    }
    if (typeof args.title !== 'undefined') {
      queryBuilder.andWhere('tag.title like :title', {
        title: `%${args.title}%`,
      });
    }
  }

  private sorting(
    queryBuilder: SelectQueryBuilder<TagEntity>,
    args: TagsListSorting,
  ) {
    const sortingField = args.field;
    const sortingDirection =
      args.direction === SortingDirectionsEnum.asc ? 'ASC' : 'DESC';
    switch (sortingField) {
      case TagsListSortingFields.id: {
        queryBuilder.addOrderBy('tag.id', sortingDirection);
        break;
      }
      case TagsListSortingFields.title: {
        queryBuilder.addOrderBy('tag.title', sortingDirection);
        break;
      }
      case TagsListSortingFields.created_at: {
        queryBuilder.addOrderBy('tag.created_at', sortingDirection);
        break;
      }
      case TagsListSortingFields.updated_at: {
        queryBuilder.addOrderBy('tag.updated_at', sortingDirection);
        break;
      }
    }
  }
}
