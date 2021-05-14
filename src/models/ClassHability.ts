import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";

import { Class } from "./Class";

@Entity("class_habilities")
class ClassHability {
    @PrimaryColumn()
    readonly id: string;

    @ManyToOne(() => Class, classe => classe.id)
    class: string;

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

export { ClassHability };