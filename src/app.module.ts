import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { CatracaModule } from './modules/catraca/catraca.module';

@Module({
  imports: [CatracaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
