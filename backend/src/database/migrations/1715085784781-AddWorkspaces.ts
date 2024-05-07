import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddWorkspaces1715085784781 implements MigrationInterface {
  name = 'AddWorkspaces1715085784781';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "workspace_member" DROP CONSTRAINT "FK_15b622cbfffabc30d7dbc52fede"`,
    );
    await queryRunner.query(
      `ALTER TABLE "workspace_member" DROP CONSTRAINT "FK_4785576faab74060802e2daba76"`,
    );
    await queryRunner.query(
      `CREATE TABLE "task_assignee" ("id" character varying NOT NULL, "profileName" character varying NOT NULL, "profileImg" character varying NOT NULL, CONSTRAINT "PK_75114a0b55080c15694f3d40ec9" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "task" ADD "status" character varying NOT NULL DEFAULT 'todo'`,
    );
    await queryRunner.query(
      `ALTER TABLE "task" ADD "assigneeId" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "task" ADD CONSTRAINT "UQ_7384988f7eeb777e44802a0baca" UNIQUE ("assigneeId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "task" DROP CONSTRAINT "PK_fb213f79ee45060ba925ecd576e"`,
    );
    await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "id"`);
    await queryRunner.query(
      `ALTER TABLE "task" ADD "id" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "task" ADD CONSTRAINT "PK_fb213f79ee45060ba925ecd576e" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "workspace_member" ADD CONSTRAINT "FK_15b622cbfffabc30d7dbc52fede" FOREIGN KEY ("workspaceId") REFERENCES "workspace"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "workspace_member" ADD CONSTRAINT "FK_4785576faab74060802e2daba76" FOREIGN KEY ("profileId") REFERENCES "profile"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "task" ADD CONSTRAINT "FK_7384988f7eeb777e44802a0baca" FOREIGN KEY ("assigneeId") REFERENCES "task_assignee"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "task" DROP CONSTRAINT "FK_7384988f7eeb777e44802a0baca"`,
    );
    await queryRunner.query(
      `ALTER TABLE "workspace_member" DROP CONSTRAINT "FK_4785576faab74060802e2daba76"`,
    );
    await queryRunner.query(
      `ALTER TABLE "workspace_member" DROP CONSTRAINT "FK_15b622cbfffabc30d7dbc52fede"`,
    );
    await queryRunner.query(
      `ALTER TABLE "task" DROP CONSTRAINT "PK_fb213f79ee45060ba925ecd576e"`,
    );
    await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "id"`);
    await queryRunner.query(`ALTER TABLE "task" ADD "id" SERIAL NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "task" ADD CONSTRAINT "PK_fb213f79ee45060ba925ecd576e" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "task" DROP CONSTRAINT "UQ_7384988f7eeb777e44802a0baca"`,
    );
    await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "assigneeId"`);
    await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "status"`);
    await queryRunner.query(`DROP TABLE "task_assignee"`);
    await queryRunner.query(
      `ALTER TABLE "workspace_member" ADD CONSTRAINT "FK_4785576faab74060802e2daba76" FOREIGN KEY ("profileId") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "workspace_member" ADD CONSTRAINT "FK_15b622cbfffabc30d7dbc52fede" FOREIGN KEY ("workspaceId") REFERENCES "workspace"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
