import { Column, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity('magic_pre_requisites')
class PreRequesitMagic {
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

export { PreRequesitMagic };