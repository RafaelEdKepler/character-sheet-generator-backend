import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateClassHabilityPreRequisites1620835952720 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "class_hability_pre_requisites",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true
                    }, {
                        name: "class_hability",
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
                        referencedTableName: "class_habilities",
                        referencedColumnNames: ["id"],
                        columnNames: ["class_hability"],
                        onDelete: "CASCADE",
                        onUpdate: "CASCADE"
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("class_hability_pre_requisites");
    }

}
