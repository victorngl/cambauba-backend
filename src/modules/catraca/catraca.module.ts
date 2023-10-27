import { Module } from '@nestjs/common';
import { CatracaController } from './catraca.controller';
import { CatracaServiceMove } from './catraca-move.service';
import { HttpModule } from '@nestjs/axios';
import { AgendaeduModule } from '../agendaedu/agendaedu.module';
import { NotificationsModule } from '../notifications/notifications.module';
import { CatracaServiceSendNotification } from './catraca-sendnotification.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  imports: [HttpModule, AgendaeduModule, NotificationsModule],
  controllers: [CatracaController],
  providers: [CatracaServiceMove, CatracaServiceSendNotification, PrismaService],
})
export class CatracaModule {}
