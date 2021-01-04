import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { plainToClass } from 'class-transformer';
import { CategoryCreateDto } from '../dto/input/category/category-create.dto';
import { CategoryOneDto } from '../dto/output/category/category-one.dto';
import { CategoryCreateCommand } from '../commands/impl/category/category-create.command';
import { CategoryByIdQuery } from '../queries/impl/category/category-by-id.query';
import { CategoryUpdateDto } from '../dto/input/category/category-update.dto';
import { CategoryUpdateCommand } from '../commands/impl/category/category-update.command';
import { CategoryDeleteCommand } from '../commands/impl/category/category-delete.command';
import { StdResponseDto } from 'src/common/dto/std-response.dto';

@Resolver()
export class CategoryResolver {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Query(() => CategoryOneDto, {
    description: 'Get category by ID',
  })
  async categoryById(
    @Args({ name: 'categoryId', nullable: false, type: () => Number })
    categoryId: number,
  ) {
    return this.queryBus.execute(new CategoryByIdQuery(categoryId));
  }

  @Mutation(() => CategoryOneDto, {
    description: 'Create category',
  })
  async categoryCreate(@Args('args') args: CategoryCreateDto) {
    const category = await this.commandBus.execute(
      new CategoryCreateCommand(args),
    );
    return plainToClass(CategoryOneDto, category);
  }

  @Mutation(() => CategoryOneDto, {
    description: 'Update category',
  })
  async categoryUpdate(
    @Args({ name: 'categoryId', nullable: false, type: () => Number })
    categoryId: number,
    @Args('args') args: CategoryUpdateDto,
  ) {
    const category = await this.commandBus.execute(
      new CategoryUpdateCommand(categoryId, args),
    );
    return plainToClass(CategoryOneDto, category);
  }

  @Mutation(() => StdResponseDto, {
    description: 'Delete category',
  })
  async categoryDelete(
    @Args({ name: 'categoryId', nullable: false, type: () => Number })
    categoryId: number,
  ) {
    const result = await this.commandBus.execute(
      new CategoryDeleteCommand(categoryId),
    );
    const resp = new StdResponseDto();
    resp.result = result;
    return resp;
  }
}
