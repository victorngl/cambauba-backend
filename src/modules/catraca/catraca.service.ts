import { Injectable } from '@nestjs/common';

@Injectable()
export class CatracaService {
  constructor() { }
  
  saveMoveOnDb(): boolean {
    return false;
  }

}
