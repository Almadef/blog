import { ConfigBase } from './../../common/bases/config.base';
import { ConfigInterface } from './../config.interface';

class MinioConfig extends ConfigBase implements ConfigInterface {
  constructor() {
    super();
  }

  public getConfig() {
    return {
      endPoint: this.getValue('MINIO_ENDPOINT'),
      port: parseInt(this.getValue('MINIO_PORT'), 10),
      useSSL: this.isProduction(),
      accessKey: this.getValue('MINIO_ACCESSKEY'),
      secretKey: this.getValue('MINIO_SECRETKEY'),
      bucketName: this.getValue('MINIO_BUCKET'),
      publicUrl: this.getValue('MINIO_PUBLIC_URL'),
      publicPort: this.getValue('MINIO_PUBLIC_PORT'),
    };
  }
}

const minioConfig = new MinioConfig();

export { minioConfig };
