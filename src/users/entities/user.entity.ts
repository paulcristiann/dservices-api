import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
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
}
