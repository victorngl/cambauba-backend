import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateApikeyDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name      :string;
    @IsNotEmpty()
    @ApiProperty()
    @IsNumber()
    ownerId  :number
    @ApiProperty()
    expire?   :string;
    token?    :string;
}
