import { ApiKeys } from "@prisma/client";
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateApikeyDto implements Partial<ApiKeys> {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    key       :string
    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    authorId  :number
}
