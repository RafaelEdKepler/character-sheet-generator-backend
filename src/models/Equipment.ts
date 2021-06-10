import { Column, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("equipments")
class Equipment {
    @PrimaryColumn()
    readonly id: string;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    cost: string;

    @Column()
    damage: string;

    @Column()
    critic: string;

    @Column()
    distance: string;

    @Column()
    weight: string;

    @Column()
    type_damage: string;

    @Column()
    ca_bonus: string;

    @Column()
    dex_bonus: string;

    @Column()
    armor_penalty: string;

    constructor() {
        if (!this.id) {
            this.id = uuid();
        }
    }
}

export { Equipment };