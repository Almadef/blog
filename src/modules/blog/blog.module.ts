import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryRepository } from './repositories/category.repository';
import { TagRepository } from './repositories/tag.repository';
import { PostRepository } from './repositories/post.repository';
import { CommandHandlers } from './commands/handles';
import { QueryHandlers } from './queries/handlers';
import { CategoryResolver } from './resolvers/category.resolve';
import { TagResolver } from './resolvers/tag.resolve';
import { PostResolver } from './resolvers/post.resolve';

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([
      CategoryRepository,
      TagRepository,
      PostRepository,
    ]),
  ],
  exports: [TypeOrmModule, CategoryResolver, TagResolver, PostResolver],
  providers: [
    CategoryResolver,
    TagResolver,
    PostResolver,
    ...CommandHandlers,
    ...QueryHandlers,
  ],
})
export class BlogModule {}
