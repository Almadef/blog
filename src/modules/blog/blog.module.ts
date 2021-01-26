import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryRepository } from './repositories/category.repository';
import { TagRepository } from './repositories/tag.repository';
import { PostRepository } from './repositories/post.tepository';
import { CommandHandlers } from './commands/handles';
import { QueryHandlers } from './queries/handlers';
import { CategoryResolver } from './resolvers/category.resolve';
import { TagResolver } from './resolvers/tag.resolve';

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([
      CategoryRepository,
      TagRepository,
      PostRepository,
    ]),
  ],
  exports: [TypeOrmModule, CategoryResolver, TagResolver],
  providers: [
    CategoryResolver,
    TagResolver,
    ...CommandHandlers,
    ...QueryHandlers,
  ],
})
export class BlogModule {}
