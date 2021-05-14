import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { ClassHability } from "./ClassHability";
import { v4 as uuid } from "uuid";

@Entity('benefit_class_habilities')
class BenefitClassHability {
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

export { BenefitClassHability };