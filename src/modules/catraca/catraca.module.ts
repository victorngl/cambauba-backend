import { Module } from '@nestjs/common';
import { CatracaController } from './catraca.controller';
import { CatracaService } from './catraca.service';
import { HttpModule } from '@nestjs/axios';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [CacheModule.register(), HttpModule],
  controllers: [CatracaController],
  providers: [CatracaService],
})
export class CatracaModule {}
