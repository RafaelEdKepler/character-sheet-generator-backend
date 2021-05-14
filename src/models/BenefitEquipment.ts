import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { Equipment } from "./Equipment";
import { v4 as uuid } from "uuid";

@Entity('benefits_equipments')
class BenefitEquipment {
    @PrimaryColumn()
    readonly id: string;

    @ManyToOne(() => Equipment, equipment => equipment.id)
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