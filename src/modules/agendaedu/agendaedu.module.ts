import { Module } from '@nestjs/common';
import { AgendaeduService } from './agendaedu.service';
import { AgendaeduController } from './agendaedu.controller';
import { HttpModule } from '@nestjs/axios';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [CacheModule.register(), HttpModule],
  controllers: [AgendaeduController],
  providers: [AgendaeduService],
  exports: [AgendaeduService]
})
export class AgendaeduModule {}
