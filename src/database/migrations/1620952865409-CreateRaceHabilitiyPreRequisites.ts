import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateRaceHabilitiyPreRequisites1620952865409 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "race_hability_pre_requisites",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true
                    }, {
                        name: "race_hability",
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
                        referencedTableName: "race_habilities",
                        referencedColumnNames: ["id"],
                        columnNames: ["race_hability"],
                        onDelete: "CASCADE",
                        onUpdate: "CASCADE"
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('race_hability_pre_requisites');
    }

}
