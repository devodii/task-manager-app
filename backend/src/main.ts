import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const configService = new ConfigService();
  const port = configService.get<number>('PORT');
  const client = configService.get<string>('CLIENT_URL');

  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  app.enableCors({
    origin: client,
    credentials: true,
    maxAge: 1000 * 60 * 60 * 7,
    exposedHeaders: ['Set-Cookie'],
  });

  await app.listen(port);
}
bootstrap();
