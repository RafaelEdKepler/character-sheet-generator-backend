import { Column, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity('magic_benefits')
class BenefitMagic {
    @PrimaryColumn()
    readonly id: string;

    @Column()
    magic: string;

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

export { BenefitMagic };