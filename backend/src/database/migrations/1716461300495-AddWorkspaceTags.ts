import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddWorkspaceTags1716461300495 implements MigrationInterface {
  name = 'AddWorkspaceTags1716461300495';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "workspace" ADD "metadata" jsonb DEFAULT '{"tags":[]}'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "workspace" DROP COLUMN "metadata"`);
  }
}
