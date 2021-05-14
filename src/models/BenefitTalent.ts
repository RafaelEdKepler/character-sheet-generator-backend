import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { Talent } from "./Talent";
import { v4 as uuid } from "uuid";

@Entity('benefit_talents')
class BenefitTalent {
    @PrimaryColumn()
    readonly id: string;

    @ManyToOne(() => Talent, talent => talent.id)
    talent: string;

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

export { BenefitTalent };