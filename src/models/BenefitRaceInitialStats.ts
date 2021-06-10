import { Column, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity('race_initial_stats_benefits')
class BenefitRaceInitialStats {
    @PrimaryColumn()
    readonly id: string;

    @Column()
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

export { BenefitRaceInitialStats };