import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateClasses1620697443456 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "classes",
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
                        name: "adventures",
                        type: "varchar"
                    }, {
                        name: "tendency",
                        type: "varchar"
                    }, {
                        name: "religion",
                        type: "varchar"
                    }, {
                        name: "history",
                        type: "varchar"
                    }, {
                        name: "races",
                        type: "varchar"
                    }, {
                        name: "classes",
                        type: "varchar"
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("classes");
    }

}
