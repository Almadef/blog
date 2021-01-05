import * as dotenv from 'dotenv';

export abstract class ConfigBase {
  protected constructor() {
    dotenv.config({
      path: '.env',
    });

    for (const envName of Object.keys(process.env)) {
      process.env[envName] = process.env[envName].replace(/\\n/g, '\n');
    }
  }

  protected getValue(key: string): string {
    const value = process.env[key];
    if (!value) {
      throw new Error(`config error - missing env.${key}`);
    }

    return value;
  }

  public isProduction() {
    const mode = this.getValue('MODE');
    return mode !== 'DEV';
  }

  public ensureValues(keys: string[]) {
    keys.forEach((k) => this.getValue(k));
    return this;
  }
}
