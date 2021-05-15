import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { RaceHability } from "./RaceHability";
import { v4 as uuid } from "uuid";

@Entity('benefit_race_habilities')
class BenefitRaceHability {
    @PrimaryColumn()
    readonly id: string;

    @ManyToOne(() => RaceHability, raceHability => raceHability.id)
    raceHability: string;

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

export { BenefitRaceHability };