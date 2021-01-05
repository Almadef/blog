import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToClass } from 'class-transformer';
import { PageListDto } from '../../../../../common/dto/page-list.dto';
import { SelectQueryBuilder } from 'typeorm';
import { SortingDirectionsEnum } from '../../../../../common/graphql/sorting-args';
import { CategoriesListQuery } from '../../impl/category/categories-list.query';
import { CategoryRepository } from '../../../repositories/category.repository';
import { CategoryOneDto } from '../../../dto/output/category/category-one.dto';
import { CategoryEntity } from '../../../entities/category.entity';
import {
  CategoriesListFilter,
  CategoriesListSorting,
  CategoriesListSortingFields,
} from '../../../dto/input/category/categories-list-args.dto';

@QueryHandler(CategoriesListQuery)
export class CategoriesListHandler
  implements IQueryHandler<CategoriesListQuery> {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async execute(query: CategoriesListQuery) {
    const queryBuilder = this.categoryRepository.createQueryBuilder('category');

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
    const [categoryes, categoiesCount] = await builder;
    const items = categoryes.map((category) =>
      plainToClass(CategoryOneDto, category),
    );
    return new PageListDto<CategoryOneDto>(
      page,
      pageSize,
      categoiesCount,
      items,
    );
  }

  private filter(
    queryBuilder: SelectQueryBuilder<CategoryEntity>,
    args: CategoriesListFilter,
  ) {
    if (typeof args.id !== 'undefined') {
      queryBuilder.andWhere('category.id = :id', {
        id: args.id,
      });
    }
    if (typeof args.title !== 'undefined') {
      queryBuilder.andWhere('category.title like :title', {
        title: `%${args.title}%`,
      });
    }
  }

  private sorting(
    queryBuilder: SelectQueryBuilder<CategoryEntity>,
    args: CategoriesListSorting,
  ) {
    const sortingField = args.field;
    const sortingDirection =
      args.direction === SortingDirectionsEnum.asc ? 'ASC' : 'DESC';
    switch (sortingField) {
      case CategoriesListSortingFields.id: {
        queryBuilder.addOrderBy('category.id', sortingDirection);
        break;
      }
      case CategoriesListSortingFields.title: {
        queryBuilder.addOrderBy('category.title', sortingDirection);
        break;
      }
      case CategoriesListSortingFields.created_at: {
        queryBuilder.addOrderBy('category.created_at', sortingDirection);
        break;
      }
      case CategoriesListSortingFields.updated_at: {
        queryBuilder.addOrderBy('category.updated_at', sortingDirection);
        break;
      }
    }
  }
}
