import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTalentBenefits1620952713839 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "talent_benefits",
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
        await queryRunner.dropTable('talent_benefits');
    }

}
