import { Column, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("races")
class Race {
    @PrimaryColumn()
    readonly id: string;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    personality: string;

    @Column()
    appearence: string;

    @Column()
    relationship: string;

    @Column()
    tendency: string;

    @Column()
    origin: string;

    @Column()
    religion: string;

    @Column()
    names: string;

    @Column()
    adventures: string;


    constructor() {
        if (!this.id) {
            this.id = uuid();
        }
    }
}

export { Race };