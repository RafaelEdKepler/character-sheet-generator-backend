import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { Race } from "./Race";
import { v4 as uuid } from "uuid";

@Entity('benefit_races')
class BenefitRace {
    @PrimaryColumn()
    readonly id: string;

    @ManyToOne(() => Race, race => race.id)
    race: string;

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

export { BenefitRace };