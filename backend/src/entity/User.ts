import { userInfo } from "os";
import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany} from "typeorm";
import {Note} from './Note';

@Entity()
export class User {

    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column({ type: "char", length: 15, unique: true })
    login!: string;

    @Column({ type: "char", length: 200})
    password!: string;

    @Column({ type: "date"})
    lastLogin!: Date;

    @OneToMany(() => Note, note => note.user)
    note!: Note[];

    @CreateDateColumn({ type: "date", update: false})
    created!: Date;

    @CreateDateColumn({ type: "date"})
    updatePassword!: Date;

}
