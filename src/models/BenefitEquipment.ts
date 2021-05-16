import { Column, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity('equipment_benefits')
class BenefitEquipment {
    @PrimaryColumn()
    readonly id: string;

    @Column()
    equipment: string;

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

export { BenefitEquipment };