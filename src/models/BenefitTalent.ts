import { Column, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity('talent_benefits')
class BenefitTalent {
    @PrimaryColumn()
    readonly id: string;

    @Column()
    talent: string;

    @Column()
    type: string;

    @Column()
    target: string;

    @Column()
    value: number;

    @Column({nullable: true})
    modifier: string;

    constructor() {
        if (!this.id) {
            this.id = uuid();
        }
    }

}

export { BenefitTalent };