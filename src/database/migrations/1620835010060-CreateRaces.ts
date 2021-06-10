import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateRaces1620835010060 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "races",
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
                        name: "personality",
                        type: "varchar"
                    }, {
                        name: "appearance",
                        type: "varchar"
                    }, {
                        name: "relationship",
                        type: "varchar"
                    }, {
                        name: "tendency",
                        type: "varchar"
                    }, {
                        name: "origin",
                        type: "varchar"
                    }, {
                        name: "religion",
                        type: "varchar"
                    }, {
                        name: "names",
                        type: "varchar"
                    }, {
                        name: "adventures",
                        type: "varchar"
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("races");
    }

}
