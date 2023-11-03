import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Matricula, Prisma } from '@prisma/client';

@Injectable()
export class MatriculaService {
  constructor(private prisma: PrismaService) { }
  async create(data: Prisma.MatriculaCreateInput): Promise<Matricula> {
    return this.prisma.matricula.create({
      data,
    });
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.MatriculaWhereUniqueInput;
    where?: Prisma.MatriculaWhereInput;
    orderBy?: Prisma.MatriculaOrderByWithRelationInput;
  }): Promise<Matricula[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.matricula.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async findOne(
    postWhereUniqueInput: Prisma.MatriculaWhereUniqueInput,
  ): Promise<Matricula | null> {
    return this.prisma.matricula.findUnique({
      where: postWhereUniqueInput,
    });
  }

  async update(params: {
    where: Prisma.MatriculaWhereUniqueInput;
    data: Prisma.MatriculaUpdateInput;
  }): Promise<Matricula> {
    const { data, where } = params;
    return this.prisma.matricula.update({
      data,
      where,
    });
  }

  async remove(where: Prisma.MatriculaWhereUniqueInput): Promise<Matricula> {
    return this.prisma.matricula.delete({
      where,
    });
  }
}
