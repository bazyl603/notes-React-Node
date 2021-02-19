import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column("text")
    login!: string;

    @Column("text")
    password!: string;

    @Column("date")
    lastLogin!: Date;

    @Column("date")
    created!: Date;

}
