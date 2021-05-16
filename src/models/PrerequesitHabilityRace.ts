import { Column, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity('race_hability_pre_requisites')
class PreRequesitHabilityRace {
    @PrimaryColumn()
    readonly id: string;

    @Column()
    race_hability: string;

    @Column()
    type: string;

    @Column()
    target: string;

    @Column()
    value: number;

    constructor() {
        if (!this.id) {
            this.id = uuid();
        }
    }

}

export { PreRequesitHabilityRace };