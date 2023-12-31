import { Prisma, User } from "@prisma/client";

export class CreateUserDto implements Partial<User> {
    id?: number;
    email: string;
    name: string;
    password: string;
    permissions?: Prisma.JsonValue;
}