import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class DropColumOpinionAndCreateColumTextInOpinions1590615200913
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('opinions', 'opinion');

    await queryRunner.addColumn(
      'opinions',
      new TableColumn({
        name: 'text',
        type: 'varchar',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('opinions', 'text');

    await queryRunner.addColumn(
      'opinions',
      new TableColumn({
        name: 'opinion',
        type: 'varchar',
        isNullable: true,
      }),
    );
  }
}
