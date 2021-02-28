import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn} from "typeorm";
import {User} from "./User";

@Entity()
export class Note {

    @PrimaryGeneratedColumn("uuid")
    id!: number;

    @Column("text")
    description!: string;

    @CreateDateColumn({ type: "date", update: false})
    created!: Date;

    @Column({ type: "timestamp"})
    lastEdit!: Date;

    @ManyToOne(() => User, user => user.note)
    user!: User;

}