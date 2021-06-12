import { Column, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("talents")
class Talent {
    @PrimaryColumn()
    readonly id: string;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    type: string;

    @Column({ nullable: true })
    special: string;

    @Column({ nullable: true })
    normal: string;

    @Column({ nullable: true })
    cost: string;

    @Column({ nullable: true})
    benefits: string;

    constructor() {
        if (!this.id) {
            this.id = uuid();
        }
    }
}

export { Talent };