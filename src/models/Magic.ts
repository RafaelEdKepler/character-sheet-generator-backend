import { Column, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("magics")
class Magic {
    @PrimaryColumn()
    readonly id: string;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    level: number;

    @Column()
    type: string;

    @Column()
    method: string;

    @Column()
    time_execution: string;

    @Column()
    range: string;

    @Column()
    target: string;

    @Column()
    duration: string;

    @Column()
    resistence_test: string;


    constructor() {
        if (!this.id) {
            this.id = uuid();
        }
    }
}

export { Magic };