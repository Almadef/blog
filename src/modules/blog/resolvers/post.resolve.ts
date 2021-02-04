import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CommandBus } from '@nestjs/cqrs';
import { plainToClass } from 'class-transformer';
import { PostCreateDto } from '../dto/input/post/post-create.dto';
import { PostOneDto } from '../dto/output/post/post-one.dto';
import { PostCreateCommand } from '../commands/impl/post/post-create.command';
import { PostUpdateDto } from '../dto/input/post/post-update.dto';
import { PostUpdateCommand } from '../commands/impl/post/post-update.command';
import { PostDeleteCommand } from '../commands/impl/post/post-delete.command';
import { StdResponseDto } from 'src/common/dto/std-response.dto';

@Resolver()
export class PostResolver {
  constructor(private readonly commandBus: CommandBus) {}

  @Mutation(() => PostOneDto, {
    description: 'Create post',
  })
  async postCreate(@Args('args') args: PostCreateDto) {
    const post = await this.commandBus.execute(new PostCreateCommand(args));
    return plainToClass(PostOneDto, post);
  }

  @Mutation(() => PostOneDto, {
    description: 'Update post',
  })
  async postUpdate(
    @Args({ name: 'postId', nullable: false, type: () => Number })
    postId: number,
    @Args('args') args: PostUpdateDto,
  ) {
    const post = await this.commandBus.execute(
      new PostUpdateCommand(postId, args),
    );
    return plainToClass(PostOneDto, post);
  }

  @Mutation(() => StdResponseDto, {
    description: 'Delete post',
  })
  async postDelete(
    @Args({ name: 'postId', nullable: false, type: () => Number })
    postId: number,
  ) {
    const result = await this.commandBus.execute(new PostDeleteCommand(postId));
    const resp = new StdResponseDto();
    resp.result = result;
    return resp;
  }
}
