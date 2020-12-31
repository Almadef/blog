import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { PostgresConfigAbstract } from './postgres.config.abstract';
import { PostgresConfigInterface } from './postgres.config.interface';

class PostgresOrmConfig
  extends PostgresConfigAbstract
  implements PostgresConfigInterface {
  constructor() {
    super();
  }

  public getConfig(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.getValue('POSTGRES_HOST'),
      port: parseInt(this.getValue('POSTGRES_PORT'), 10),
      username: this.getValue('POSTGRES_USER'),
      password: this.getValue('POSTGRES_PASSWORD'),
      database: this.getValue('POSTGRES_DATABASE'),
      entities: [],
      ssl: this.isProduction(),
      synchronize: false,
    };
  }
}

const postgresOrmConfig = new PostgresOrmConfig().ensureValues([
  'POSTGRES_HOST',
  'POSTGRES_PORT',
  'POSTGRES_USER',
  'POSTGRES_PASSWORD',
  'POSTGRES_DATABASE',
]);

export { postgresOrmConfig };
