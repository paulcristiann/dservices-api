import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description: 'The bech32 wallet address of the user',
    })
    wallet_address: string;
    
    @IsString()
    @ApiProperty({
        description: 'The nickname the user chooses. Can be blank if the user chooses anonimity',
        required: false,
    })
    nickname: string;
}
