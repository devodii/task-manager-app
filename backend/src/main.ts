import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const configService = new ConfigService();
  const port = configService.get<number>('PORT');

  const app = await NestFactory.create(AppModule);
  await app.listen(port);
}
bootstrap();
