import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { User } from '@prisma/client';

export class UpdateUserDto extends PartialType(CreateUserDto) implements Partial<User> {
    id: number;
    email: string;
    name: string;
}
