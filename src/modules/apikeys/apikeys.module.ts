import { Module } from '@nestjs/common';
import { ApikeysService } from './apikeys.service';
import { ApikeysController } from './apikeys.controller';
import { PrismaService } from 'src/prisma.service';
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [AuthModule, UsersModule],
  controllers: [ApikeysController],
  providers: [ApikeysService, PrismaService],
})
export class ApikeysModule {}
