import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { GateMove, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CatracaMessageDto } from './dto/catraca-sendmessage.dto';

@Injectable()
export class CatracaServiceMove {
  constructor(private prisma: PrismaService) { }

  async save(catracaMessageDto: CatracaMessageDto): Promise<boolean> {

    const data = {
      studentId: Number(catracaMessageDto.studentId),
      studentName: catracaMessageDto.studentName,
      schedule: catracaMessageDto.schedule,
      type: catracaMessageDto.type
    }

    try {


      const gateMove = await this.createGateMove(data)

      if (gateMove) {
        return true;
      }
      else {
        throw new HttpException('Erro ao salvar Movimento da Catraca no Banco de Dados', HttpStatus.BAD_REQUEST)
      }
    }
    catch (e) {
      throw new HttpException('Erro ao salvar Movimento da Catraca no Banco de Dados', HttpStatus.BAD_REQUEST)

    }
  }

  async createGateMove(data: Prisma.GateMoveCreateInput): Promise<GateMove> {

    const data_json = {
      "data": {
        student_id: data.studentId.toString(),
        student_name: data.studentName,
        schedule: data.schedule,
        type: data.type
      }
    }

    const response = await fetch('https://api.cambauba.org.br/api/gate-moves/', {
      cache: 'no-store',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.STRAPI_JWT}`,
      },
      body: JSON.stringify(data_json),
    });

    if (!response.ok) {
      throw new Error(`Erro ao realizar a requisição: ${response.statusText}`);
    }

    return await response.json();
  }
}
