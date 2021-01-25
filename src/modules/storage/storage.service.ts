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

  public async uploadSingleImage(image: BufferedFile) {
    const uploaded_image = await this.uploadImage(image);

    return {
      image_url: uploaded_image.url,
      message: 'Successfully uploaded image to MinIO S3',
    };
  }

  public async uploadPostImages(images: BufferedFile) {
    const image_mobile_preview = images['image_mobile_preview'][0];
    const uploaded_image_mobile_preview = await this.uploadImage(
      image_mobile_preview,
    );

    const image_mobile_description = images['image_mobile_description'][0];
    const uploaded_image_mobile_description = await this.uploadImage(
      image_mobile_description,
    );

    const image_site_preview = images['image_site_preview'][0];
    const uploaded_image_site_preview = await this.uploadImage(
      image_site_preview,
    );

    const image_site_description = images['image_site_description'][0];
    const uploaded_image_site_description = await this.uploadImage(
      image_site_description,
    );

    return {
      image_mobile_preview_url: uploaded_image_mobile_preview.url,
      image_uploaded_image_mobile_description:
        uploaded_image_mobile_description.url,
      image_site_preview_url: uploaded_image_site_preview.url,
      image_uploaded_image_site_description:
        uploaded_image_site_description.url,
      message: 'Successfully uploaded mutiple images for post on MinioS3',
    };
  }

  private async uploadImage(image: BufferedFile) {
    if (!(image.mimetype.includes('jpeg') || image.mimetype.includes('png'))) {
      throw new HttpException('Error uploading image', HttpStatus.BAD_REQUEST);
    }
    const tempImageName = Date.now().toString();
    const hashedImageName = crypto
      .createHash('md5')
      .update(tempImageName)
      .digest('hex');
    const ext = image.originalname.substring(
      image.originalname.lastIndexOf('.'),
      image.originalname.length,
    );
    const metaData = {
      'Content-Type': image.mimetype,
      'X-Amz-Meta-Testing': 1234,
    };
    const imagename = hashedImageName + ext;
    const imageName = `${imagename}`;
    const imageBuffer = image.buffer;
    this.client.putObject(
      this.configs.bucketName,
      imageName,
      imageBuffer,
      metaData,
      function (err) {
        if (err)
          throw new HttpException(
            'Error uploading image',
            HttpStatus.BAD_REQUEST,
          );
      },
    );

    return {
      url: `${this.configs.publicUrl}:${this.configs.publicPort}/${this.configs.bucketName}/${imagename}`,
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
