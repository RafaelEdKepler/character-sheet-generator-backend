import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateClassHabilities1620835101767 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "class_habilities",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true
                    }, {
                        name: "class",
                        type: "uuid"
                    },
                    {
                        name: "name",
                        type: "varchar"
                    }, {
                        name: "description",
                        type: "varchar"
                    }
                ],
                foreignKeys: [
                    {
                        name: "FKClass",
                        referencedTableName: "classes",
                        referencedColumnNames: ["id"],
                        columnNames: ["class"],
                        onDelete: "CASCADE",
                        onUpdate: "CASCADE"
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("classHabilities");
    }

}
