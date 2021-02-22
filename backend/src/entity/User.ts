import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn} from "typeorm";

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

    @CreateDateColumn({ type: "date", update: false})
    created!: Date;

    @CreateDateColumn({ type: "date"})
    updatePassword!: Date;

}
