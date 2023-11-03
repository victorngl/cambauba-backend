import { Module } from '@nestjs/common';
import { MatriculaService } from './matricula.service';
import { MatriculaController } from './matricula.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [MatriculaController],
  providers: [MatriculaService, PrismaService],
})
export class MatriculaModule {}
