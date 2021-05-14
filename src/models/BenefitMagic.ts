import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { Magic } from "./Magic";
import { v4 as uuid } from "uuid";

@Entity('benefit_magics')
class BenefitMagic {
    @PrimaryColumn()
    readonly id: string;

    @ManyToOne(() => Magic, magic => magic.id)
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