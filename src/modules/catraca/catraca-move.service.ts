import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { GateMove, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CatracaMessageDto } from './dto/catraca-sendmessage.dto';

@Injectable()
export class CatracaServiceMove {
  constructor(private prisma: PrismaService) { }

  async save(catracaMessageDto: CatracaMessageDto): Promise<boolean> {

    const data = {
      studentId: catracaMessageDto.studentId,
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
    return this.prisma.gateMove.create({
      data,
    });
  }

}
