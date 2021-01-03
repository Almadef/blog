import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { postgresOrmConfig } from '../configs/postgres/postgres-orm.config';
import { BlogModule } from './blog/blog.module';

@Module({
  imports: [BlogModule, TypeOrmModule.forRoot(postgresOrmConfig.getConfig())],
})
export class AppModule {}
