import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUser1615397117900 implements MigrationInterface {
  private readonly TABLE_NAME = 'users';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: this.TABLE_NAME,
      columns: [
        {
          name: 'id',
          type: 'int',
          isPrimary: true,
          generationStrategy: "increment"
        },
        {
          name: 'email',
          type: 'varchar',
          scale: 255,
          isUnique: true,
          isNullable: false,
        },
        {
          name: 'password',
          type: 'varchar',
          scale: 255,
          isNullable: false,
        },
        {
          name: 'created_at',
          type: 'timestamp',
          isNullable: false,
          default: 'now()',
        },
        {
          name: 'updated_at',
          type: 'timestamp',
          isNullable: false,
          default: 'now()',
        },
        {
          name: 'deleted_at',
          type: 'timestamp',
          isNullable: true,
          default: null,
        },
      ],
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.TABLE_NAME);
  }

}
