import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { RaceHability } from "./RaceHability";
import { v4 as uuid } from "uuid";

@Entity('race_hability_pre_requisites')
class RaceHabilityPreRequisite {
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

export { RaceHabilityPreRequisite };