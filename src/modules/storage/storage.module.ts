import { Module } from '@nestjs/common';
import { MinioModule } from 'nestjs-minio-client';
import { minioConfig } from '../../configs/minio/minio.config';
import { StorageController } from './storage.controller';
import { StorageService } from './storage.service';

@Module({
  imports: [MinioModule.register(minioConfig.getConfig())],
  controllers: [StorageController],
  providers: [StorageService],
  exports: [StorageService],
})
export class StorageModule {}
