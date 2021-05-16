import { Column, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("class_habilities")
class ClassHability {
    @PrimaryColumn()
    readonly id: string;

    @Column()
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