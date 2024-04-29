import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitWorkspaces1714393071702 implements MigrationInterface {
  name = 'InitWorkspaces1714393071702';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "workspace" ("id" character varying NOT NULL, "name" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_406f56fc2a42ad5f541973cdbee" UNIQUE ("name"), CONSTRAINT "PK_ca86b6f9b3be5fe26d307d09b49" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "workspace_member" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "workspaceId" character varying, "profileId" character varying, CONSTRAINT "PK_a3a35f64bf30517010551467c6e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "task" ADD "workspaceId" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "account" ADD "workspaceId" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "account" ADD CONSTRAINT "UQ_613d65c299d4cd2176b2a8a1004" UNIQUE ("workspaceId")`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_d80b94dc62f7467403009d8806" ON "profile" ("username") `,
    );
    await queryRunner.query(
      `ALTER TABLE "task" ADD CONSTRAINT "FK_ce8f24979af169c6cd19cc94e52" FOREIGN KEY ("workspaceId") REFERENCES "workspace"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "account" ADD CONSTRAINT "FK_613d65c299d4cd2176b2a8a1004" FOREIGN KEY ("workspaceId") REFERENCES "workspace"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "workspace_member" ADD CONSTRAINT "FK_15b622cbfffabc30d7dbc52fede" FOREIGN KEY ("workspaceId") REFERENCES "workspace"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "workspace_member" ADD CONSTRAINT "FK_4785576faab74060802e2daba76" FOREIGN KEY ("profileId") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "workspace_member" DROP CONSTRAINT "FK_4785576faab74060802e2daba76"`,
    );
    await queryRunner.query(
      `ALTER TABLE "workspace_member" DROP CONSTRAINT "FK_15b622cbfffabc30d7dbc52fede"`,
    );
    await queryRunner.query(
      `ALTER TABLE "account" DROP CONSTRAINT "FK_613d65c299d4cd2176b2a8a1004"`,
    );
    await queryRunner.query(
      `ALTER TABLE "task" DROP CONSTRAINT "FK_ce8f24979af169c6cd19cc94e52"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_d80b94dc62f7467403009d8806"`,
    );
    await queryRunner.query(
      `ALTER TABLE "account" DROP CONSTRAINT "UQ_613d65c299d4cd2176b2a8a1004"`,
    );
    await queryRunner.query(`ALTER TABLE "account" DROP COLUMN "workspaceId"`);
    await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "workspaceId"`);
    await queryRunner.query(`DROP TABLE "workspace_member"`);
    await queryRunner.query(`DROP TABLE "workspace"`);
  }
}
