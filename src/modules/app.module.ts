import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { postgresOrmConfig } from '../configs/postgres/postgres-orm.config';
import { GraphQLModule } from '@nestjs/graphql';
import { graphqlConfig } from '../configs/graphql/graphql.config';
import { BlogModule } from './blog/blog.module';

@Module({
  imports: [
    BlogModule,
    TypeOrmModule.forRoot(postgresOrmConfig.getConfig()),
    GraphQLModule.forRoot(graphqlConfig.getConfig()),
  ],
})
export class AppModule {}
