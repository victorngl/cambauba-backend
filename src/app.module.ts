import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { CatracaModule } from './modules/catraca/catraca.module';
import { UsersModule } from './modules/users/users.module';
import { ApikeysModule } from './modules/apikeys/apikeys.module';
import { AuthModule } from './modules/auth/auth.module';
import { AgendaeduModule } from './modules/agendaedu/agendaedu.module';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [CatracaModule, UsersModule, ApikeysModule, AuthModule, AgendaeduModule, NotificationsModule, HttpModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
