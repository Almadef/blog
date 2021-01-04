import { ConnectionOptions } from 'typeorm';
import { ConfigBase } from './../../common/bases/config.base';
import { ConfigInterface } from './../config.interface';

class PostgresMigrationConfig extends ConfigBase implements ConfigInterface {
  constructor() {
    super();
  }

  public getConfig(): ConnectionOptions {
    return {
      type: 'postgres',
      host: this.getValue('POSTGRES_HOST'),
      port: parseInt(this.getValue('POSTGRES_PORT'), 10),
      username: this.getValue('POSTGRES_USER'),
      password: this.getValue('POSTGRES_PASSWORD'),
      database: this.getValue('POSTGRES_DATABASE'),
      synchronize: false,
      migrationsRun: true,
      logging: true,
      logger: 'file',
      migrations: ['src/migrations/*.ts'],
      cli: {
        migrationsDir: 'src/migrations',
      },
      ssl: this.isProduction(),
    };
  }
}

export = new PostgresMigrationConfig().getConfig();
