import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { Class } from "./Class";
import { v4 as uuid } from "uuid";

@Entity('benefit_classes')
class BenefitClass {
    @PrimaryColumn()
    readonly id: string;

    @ManyToOne(() => Class, classe => classe.id)
    class: string;

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

export { BenefitClass };