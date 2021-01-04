import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigBase } from './../../common/bases/config.base';
import { ConfigInterface } from './../config.interface';

class PostgresOrmConfig extends ConfigBase implements ConfigInterface {
  constructor() {
    super();
  }

  public getConfig(): TypeOrmModuleOptions {
    const entities = [__dirname + '/../../modules/**/*.entity{.ts,.js}'];
    return {
      type: 'postgres',
      host: this.getValue('POSTGRES_HOST'),
      port: parseInt(this.getValue('POSTGRES_PORT'), 10),
      username: this.getValue('POSTGRES_USER'),
      password: this.getValue('POSTGRES_PASSWORD'),
      database: this.getValue('POSTGRES_DATABASE'),
      entities: entities,
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
