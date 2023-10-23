import { Module } from '@nestjs/common';
import { NotificationsController } from './notifications.controller';
import { AgendaEduNotificationService } from './agendaedu-notification.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [NotificationsController],
  providers: [AgendaEduNotificationService],
  exports: [AgendaEduNotificationService]
})
export class NotificationsModule {}
