import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Cambaúba API Documentation')
    .setDescription('Documentação da API de Dados da Escola Modelar Cambaúba')
    .setVersion('1.0')
    .addTag('backend')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api', app, document);

  app.useGlobalPipes(new ValidationPipe());  //Valida os Types
  await app.listen(3000);
}

bootstrap();
