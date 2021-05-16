import { Column, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity('class_hability_pre_requisites')
class PreRequesitHabilityClass {
    @PrimaryColumn()
    readonly id: string;

    @Column()
    class_hability: string;

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