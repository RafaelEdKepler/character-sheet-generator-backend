import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateRaceHabilities1620952793732 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "race_habilities",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true
                    }, {
                        name: "race",
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
                        referencedTableName: "races",
                        referencedColumnNames: ["id"],
                        columnNames: ["race"],
                        onDelete: "CASCADE",
                        onUpdate: "CASCADE"
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('race_habilities');
    }

}
