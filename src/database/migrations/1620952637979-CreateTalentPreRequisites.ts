import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTalentPreRequisites1620952637979 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "talent_pre_requisites",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true
                    }, {
                        name: "talent",
                        type: "uuid"
                    },
                    {
                        name: "type",
                        type: "varchar"
                    }, {
                        name: "target",
                        type: "varchar"
                    },
                    {
                        name: "value",
                        type: "integer"
                    },
                ],
                foreignKeys: [
                    {
                        name: "FKClass",
                        referencedTableName: "talents",
                        referencedColumnNames: ["id"],
                        columnNames: ["talent"],
                        onDelete: "CASCADE",
                        onUpdate: "CASCADE"
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('talent_pre_requisites');
    }

}
