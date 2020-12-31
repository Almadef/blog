import { ConnectionOptions } from 'typeorm';
import { PostgresConfigAbstract } from './postgres.config.abstract';
import { PostgresConfigInterface } from './postgres.config.interface';

class PostgresMigrationConfig
  extends PostgresConfigAbstract
  implements PostgresConfigInterface {
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
