import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class category1609609756717 implements MigrationInterface {
  private tableName = 'category';
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: this.tableName,
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
            width: 11,
          },
          {
            name: 'title',
            type: 'varchar',
            length: '50',
            isNullable: false,
          },
          {
            name: 'created_at',
            type: 'int',
            width: 11,
          },
          {
            name: 'updated_at',
            type: 'int',
            unsigned: true,
            width: 11,
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.tableName);
  }
}
