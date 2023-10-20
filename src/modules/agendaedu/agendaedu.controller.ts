import { Controller } from '@nestjs/common';
import { AgendaeduService } from './agendaedu.service';

@Controller('agendaedu')
export class AgendaeduController {
  constructor(private readonly agendaeduService: AgendaeduService) {}
}
