/* eslint-disable prettier/prettier */
import { DocumentBuilder } from '@nestjs/swagger';

module.exports = new DocumentBuilder()
  .setTitle('Cambaúba API Documentation')
  .setDescription('Documentação da API de Dados da Escola Modelar Cambaúba')
  .setVersion('1.0')
  .build();