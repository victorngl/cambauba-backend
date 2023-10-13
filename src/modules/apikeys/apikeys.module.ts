import { Module } from '@nestjs/common';
import { ApikeysService } from './apikeys.service';
import { ApikeysController } from './apikeys.controller';
import { PrismaService } from 'src/prisma.service';
@Module({
  controllers: [ApikeysController],
  providers: [ApikeysService, PrismaService],
})
export class ApikeysModule {}
