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

    @Column()
    level: number;

    @Column({ nullable: true })
    group: string;

    @Column({ nullable: true })
    quantity: number;

    constructor() {
        if (!this.id) {
            this.id = uuid();
        }
    }
}

export { ClassHability };