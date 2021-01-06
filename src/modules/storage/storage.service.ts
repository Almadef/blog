import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { MinioService } from 'nestjs-minio-client';
import { minioConfig } from '../../configs/minio/minio.config';
import { BufferedFile } from './storage.models';
import * as crypto from 'crypto';

@Injectable()
export class StorageService {
  private readonly logger: Logger;
  private readonly configs = minioConfig.getConfig();
  private readonly baseBucket = minioConfig.getConfig();

  public get client() {
    return this.minio.client;
  }

  constructor(private readonly minio: MinioService) {
    this.logger = new Logger('MinioStorageService');
  }

  public async uploadSingle(image: BufferedFile) {
    const uploaded_image = await this.upload(image);

    return {
      image_url: uploaded_image.url,
      message: 'Successfully uploaded to MinIO S3',
    };
  }

  public async uploadMany(files: BufferedFile) {
    const image1 = files['image1'][0];
    const uploaded_image1 = await this.upload(image1);

    const image2 = files['image2'][0];
    const uploaded_image2 = await this.upload(image2);

    return {
      image1_url: uploaded_image1.url,
      image2_url: uploaded_image2.url,
      message: 'Successfully uploaded mutiple image on MinioS3',
    };
  }

  private async upload(file: BufferedFile) {
    if (!(file.mimetype.includes('jpeg') || file.mimetype.includes('png'))) {
      throw new HttpException('Error uploading file', HttpStatus.BAD_REQUEST);
    }
    const temp_filename = Date.now().toString();
    const hashedFileName = crypto
      .createHash('md5')
      .update(temp_filename)
      .digest('hex');
    const ext = file.originalname.substring(
      file.originalname.lastIndexOf('.'),
      file.originalname.length,
    );
    const metaData = {
      'Content-Type': file.mimetype,
      'X-Amz-Meta-Testing': 1234,
    };
    const filename = hashedFileName + ext;
    const fileName = `${filename}`;
    const fileBuffer = file.buffer;
    this.client.putObject(
      this.configs.bucketName,
      fileName,
      fileBuffer,
      metaData,
      function (err) {
        if (err)
          throw new HttpException(
            'Error uploading file',
            HttpStatus.BAD_REQUEST,
          );
      },
    );

    return {
      url: `${this.configs.publicUrl}:${this.configs.publicPort}/${this.configs.bucketName}/${filename}`,
    };
  }

  private async delete(objetName: string) {
    this.client.removeObject(
      this.configs.bucketName,
      objetName,
      function (err) {
        if (err)
          throw new HttpException(
            'Oops Something wrong happend',
            HttpStatus.BAD_REQUEST,
          );
      },
    );
  }
}
