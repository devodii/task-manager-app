import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateWorkspaceMetadata1716467137015 implements MigrationInterface {
    name = 'UpdateWorkspaceMetadata1716467137015'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "workspace" ALTER COLUMN "metadata" SET DEFAULT '{"tags":[{"name":"Design","color":"#492F64"},{"name":"Development","color":"#28316A"},{"name":"Privacy","color":"#373737"}]}'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "workspace" ALTER COLUMN "metadata" SET DEFAULT '{"tags": []}'`);
    }

}
