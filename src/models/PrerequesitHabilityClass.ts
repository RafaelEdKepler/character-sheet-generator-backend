import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { ClassHability } from "./ClassHability";
import { v4 as uuid } from "uuid";

@Entity('class_hability_pre_requisites')
class PreRequesitHabilityClass {
    @PrimaryColumn()
    readonly id: string;

    @ManyToOne(() => ClassHability, classHability => classHability.id)
    classHability: string;

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

export { PreRequesitHabilityClass };