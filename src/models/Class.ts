import { Column, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("classes")
class Class {
    @PrimaryColumn()
    readonly id: string;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    adventures: string;

    @Column()
    tendency: string;

    @Column()
    religion: string;

    @Column()
    history: string;

    @Column()
    races: string;

    @Column()
    classes: string;


    constructor() {
        if (!this.id) {
            this.id = uuid();
        }
    }
}

export { Class };