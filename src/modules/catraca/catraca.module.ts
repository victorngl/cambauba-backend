import { Module } from '@nestjs/common';
import { CatracaController } from './catraca.controller';
import { CatracaService } from './catraca.service';
import { HttpModule } from '@nestjs/axios';
import { AgendaeduModule } from '../agendaedu/agendaedu.module';

@Module({
  imports: [HttpModule, AgendaeduModule],
  controllers: [CatracaController],
  providers: [CatracaService],
})
export class CatracaModule {}
