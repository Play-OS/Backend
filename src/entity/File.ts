import { Entity, Column, ObjectIdColumn } from 'typeorm';

@Entity()
export class File {
    @ObjectIdColumn()
    id!: string;

    // address owner of a file
    @Column()
    owner!: string;

    // Virtual path. In the database everything is the same level
    // this allows us to create a filesystem
    @Column()
    virtualPath!: string;

    // The actual location of the file.
    @Column()
    fileLocation!: string;
}
