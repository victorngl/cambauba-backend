import { Injectable } from '@nestjs/common';
import { CatracaMessageDto } from 'src/dto/catraca/catraca-sendmessage.dto';

@Injectable()
export class CatracaService {
  sendMessage(catracaMessageDto: CatracaMessageDto): object {
    return catracaMessageDto;
  }

  saveOnDb(): boolean {
    return false;
  }
}
