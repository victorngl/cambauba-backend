import { Prisma } from "@prisma/client";

export class CreateMatriculaDto implements Prisma.MatriculaCreateInput {
    id: number;
    name: string;
    age?: string;
    datebirth?: string;
    unity: string;
    dependency?: string;
    course: string;
    class: string;
    financy: string;
    quota: number;
    alimentation?: string;
    nextcourse?: string;
    regime?: string;
    renew?: boolean;
}
