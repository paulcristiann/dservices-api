import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn, PrimaryColumn, CreateDateColumn } from "typeorm";

@Entity()
export class User {

    //@PrimaryGeneratedColumn()
    //id: number;

    @PrimaryColumn()
    @ApiProperty({
        description: 'The bech32 wallet address of the user',
    })
    wallet_address: string;

    @Column()
    @ApiProperty({
        description: 'The nickname the user set. Can be empty if he selected anonymous',
        required: false
    })
    nickname: string;

    @CreateDateColumn()
    @ApiProperty({
        description: 'User registration date',
    })
    date_joined: string;
}
