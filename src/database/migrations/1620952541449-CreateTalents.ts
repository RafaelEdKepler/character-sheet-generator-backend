import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTalents1620952541449 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "talents",
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
                        name: "type",
                        type: "varchar"
                    }, {
                        name: "special",
                        type: "varchar"
                    }, {
                        name: "normal",
                        type: "varchar"
                    }, {
                        name: "cost",
                        type: "varchar"
                    }, {
                        name: "benefits",
                        type: "varchar"
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('talents');
    }

}
