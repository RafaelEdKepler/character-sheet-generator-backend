import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";

import { Race } from "./Race";

@Entity("race_habilities")
class RaceHability {
    @PrimaryColumn()
    readonly id: string;

    @ManyToOne(() => Race, race => race.id)
    race: string;

    @Column()
    name: string;

    @Column()
    description: string;


    constructor() {
        if (!this.id) {
            this.id = uuid();
        }
    }
}

export { RaceHability };