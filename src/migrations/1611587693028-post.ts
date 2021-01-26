import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class post1611587693028 implements MigrationInterface {
  private tableName = 'post';
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
            name: 'category_id',
            type: 'int',
            width: 11,
            isNullable: false,
          },
          {
            name: 'title',
            type: 'varchar',
            length: '50',
            isNullable: false,
            isUnique: true,
          },
          {
            name: 'preview',
            type: 'varchar',
            length: '700',
            isNullable: false,
          },
          {
            name: 'description',
            type: 'text',
            isNullable: false,
          },
          {
            name: 'image_mobile_preview',
            type: 'varchar',
            length: '200',
          },
          {
            name: 'image_mobile_description',
            type: 'varchar',
            length: '200',
          },
          {
            name: 'image_site_preview',
            type: 'varchar',
            length: '200',
          },
          {
            name: 'image_site_description',
            type: 'varchar',
            length: '200',
          },
          {
            name: 'meta_description',
            type: 'varchar',
            length: '100',
            isNullable: false,
          },
          {
            name: 'meta_keywords',
            type: 'varchar',
            length: '100',
            isNullable: false,
          },
          {
            name: 'created_at',
            type: 'int',
            unsigned: true,
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

    const categoryKey = new TableForeignKey({
      name: 'fk_post_category',
      columnNames: ['category_id'],
      referencedTableName: 'category',
      referencedColumnNames: ['id'],
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
    await queryRunner.createForeignKey(this.tableName, categoryKey);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.tableName);
  }
}
