import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryRepository } from './repositories/category.repository';
import { CommandHandlers } from './commands/handles';
import { QueryHandlers } from './queries/handlers';
import { CategoryResolver } from './resolvers/category.resolve';

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([CategoryRepository])],
  exports: [TypeOrmModule, CategoryResolver],
  providers: [CategoryResolver, ...CommandHandlers, ...QueryHandlers],
})
export class BlogModule {}
