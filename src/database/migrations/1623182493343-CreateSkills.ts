import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateSkills1623182493343 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        new Table({
            name: "skills",
            columns: [
                {
                    name: "id",
                    type: "uuid",
                    isPrimary: true
                }, {
                    name: "name",
                    type: "varchar"
                }, {
                    name: "description",
                    type: "varchar"
                }, {
                    name: "modifier",
                    type: "varchar"
                }
            ]
        })
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('skills');
    }

}
