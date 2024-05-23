import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddTaskTags1716464610125 implements MigrationInterface {
  name = 'AddTaskTags1716464610125';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "task" ADD "metadata" jsonb DEFAULT '{"tags":[]}'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "metadata"`);
  }
}
