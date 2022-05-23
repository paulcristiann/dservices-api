import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import { AppModule } from './app.module';
import * as csurf from 'csurf';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('D-Services REST API')
    .setDescription('The API for the ICI D-Services Platform')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
    
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
  }));

  app.use(helmet());
  app.enableCors();
  app.use(csurf());

  await app.listen(3000);
}
bootstrap();
