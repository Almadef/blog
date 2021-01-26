import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class tagPost1611589527863 implements MigrationInterface {
  private tableName = 'tag_post';
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
            name: 'tag_id',
            type: 'int',
            width: 11,
            isNullable: false,
          },
          {
            name: 'post_id',
            type: 'int',
            width: 11,
            isNullable: false,
          },
        ],
      }),
      true,
    );

    const tagKey = new TableForeignKey({
      name: 'fk_tag_post_tag',
      columnNames: ['tag_id'],
      referencedTableName: 'tag',
      referencedColumnNames: ['id'],
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
    await queryRunner.createForeignKey(this.tableName, tagKey);

    const postKey = new TableForeignKey({
      name: 'fk_tag_post_post',
      columnNames: ['post_id'],
      referencedTableName: 'post',
      referencedColumnNames: ['id'],
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
    await queryRunner.createForeignKey(this.tableName, postKey);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.tableName);
  }
}
