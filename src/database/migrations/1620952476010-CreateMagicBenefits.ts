import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateMagicBenefits1620952476010 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "magic_benefits",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true
                    }, {
                        name: "magic_id",
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
                        referencedTableName: "magics",
                        referencedColumnNames: ["id"],
                        columnNames: ["magic_id"],
                        onDelete: "CASCADE",
                        onUpdate: "CASCADE"
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('magic_benefits');
    }

}
