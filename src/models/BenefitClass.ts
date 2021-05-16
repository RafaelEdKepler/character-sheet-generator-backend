import { Column, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity('class_benefits')
class BenefitClass {
    @PrimaryColumn()
    readonly id: string;

    @Column()
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