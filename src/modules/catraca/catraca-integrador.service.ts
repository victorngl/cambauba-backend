import { Injectable } from '@nestjs/common';

@Injectable()
export class CatracaServiceIntegrador {
  constructor() { }
  
  healthCheck(): boolean {
    return false;
  }

}
