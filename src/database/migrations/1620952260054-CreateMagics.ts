import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateMagics1620952260054 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "magics",
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
                        name: "level",
                        type: "number"
                    }, {
                        name: "type",
                        type: "varchar"
                    }, {
                        name: "method",
                        type: "varchar"
                    }, {
                        name: "time_execution",
                        type: "varchar"
                    }, {
                        name: "range",
                        type: "varchar"
                    }, {
                        name: "target",
                        type: "varchar"
                    }, {
                        name: "duration",
                        type: "varchar"
                    }, {
                        name: "resistence_test",
                        type: "varchar"
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('magics');
    }

}
