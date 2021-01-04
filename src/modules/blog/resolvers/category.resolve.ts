import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { plainToClass } from 'class-transformer';
import { CategoryCreateDto } from '../dto/input/category/category-create.dto';
import { CategoryOneDto } from '../dto/output/category/category-one.dto';
import { CategoryCreateCommand } from '../commands/impl/category/category-create.command';
import { CategoryByIdQuery } from '../queries/impl/category/category-by-id.query';

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
}
