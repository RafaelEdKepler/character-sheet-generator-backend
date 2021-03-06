import { Column, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity('talent_pre_requisites')
class PreRequesitTalent {
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

    constructor() {
        if (!this.id) {
            this.id = uuid();
        }
    }

}

export { PreRequesitTalent };