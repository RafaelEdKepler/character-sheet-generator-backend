import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { ClassHability } from "./ClassHability";
import { v4 as uuid } from "uuid";

@Entity('class_hability_pre_requisites')
class ClassHabilityPreRequisite {
    @PrimaryColumn()
    readonly id: string;

    @ManyToOne(() => ClassHability, classHability => classHability.id)
    classHability: string;

    @Column()
    type: string;

    @Column()
    target: string;

    @Column()
    value: string;

    constructor() {
        if (!this.id) {
            this.id = uuid();
        }
    }

}

export { ClassHabilityPreRequisite };