import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CommandBus } from '@nestjs/cqrs';
import { plainToClass } from 'class-transformer';
import { TagCreateDto } from '../dto/input/tag/tag-create.dto';
import { TagOneDto } from '../dto/output/tag/tag-one.dto';
import { TagCreateCommand } from '../commands/impl/tag/tag-create.command';
import { TagUpdateDto } from '../dto/input/tag/tag-update.dto';
import { TagUpdateCommand } from '../commands/impl/tag/tag-update.command';
import { TagDeleteCommand } from '../commands/impl/tag/tag-delete.command';
import { StdResponseDto } from 'src/common/dto/std-response.dto';

@Resolver()
export class TagResolver {
  constructor(private readonly commandBus: CommandBus) {}

  @Mutation(() => TagOneDto, {
    description: 'Create tag',
  })
  async tagCreate(@Args('args') args: TagCreateDto) {
    const tag = await this.commandBus.execute(new TagCreateCommand(args));
    return plainToClass(TagOneDto, tag);
  }

  @Mutation(() => TagOneDto, {
    description: 'Update tag',
  })
  async tagUpdate(
    @Args({ name: 'tagId', nullable: false, type: () => Number })
    tagId: number,
    @Args('args') args: TagUpdateDto,
  ) {
    const tag = await this.commandBus.execute(
      new TagUpdateCommand(tagId, args),
    );
    return plainToClass(TagOneDto, tag);
  }

  @Mutation(() => StdResponseDto, {
    description: 'Delete tag',
  })
  async tagDelete(
    @Args({ name: 'tagId', nullable: false, type: () => Number })
    tagId: number,
  ) {
    const result = await this.commandBus.execute(new TagDeleteCommand(tagId));
    const resp = new StdResponseDto();
    resp.result = result;
    return resp;
  }
}
