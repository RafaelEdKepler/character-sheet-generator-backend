import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateEquipments1620951860242 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "equipments",
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
                        name: "cost",
                        type: "varchar"
                    }, {
                        name: "damage",
                        type: "varchar"
                    }, {
                        name: "critic",
                        type: "varchar"
                    }, {
                        name: "distance",
                        type: "varchar"
                    }, {
                        name: "weight",
                        type: "varchar"
                    }, {
                        name: "type_damage",
                        type: "varchar"
                    }, {
                        name: "ca_bonus",
                        type: "varchar"
                    }, {
                        name: "dex_bonus",
                        type: "varchar"
                    }, {
                        name: "armor_penalty",
                        type: "varchar"
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('equipments');
    }

}
