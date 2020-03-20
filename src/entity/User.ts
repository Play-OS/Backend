import { Entity, Column, ObjectIdColumn } from 'typeorm';
import { IsString } from 'class-validator';

@Entity()
export class User {
    @ObjectIdColumn()
    id!: string;

    // The address derived from the private key. (ala public key)
    @Column()
    @IsString()
    address!: string;

    // An encrypted data field containing information about the user
    @Column()
    @IsString()
    data!: string;
}
