import { Column, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("equipments")
class Equipment {
    @PrimaryColumn()
    readonly id: string;

    @Column()
    name: string;

    @Column()
    description: string;


    constructor() {
        if (!this.id) {
            this.id = uuid();
        }
    }
}

export { Equipment };