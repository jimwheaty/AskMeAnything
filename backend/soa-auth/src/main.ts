import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {

  const app = await NestFactory.create(AppModule)

  app.setGlobalPrefix('api');
  app.enableCors();

  await app.listen(8070, () => {
    console.log('Auth Service is running!');
  });
}
bootstrap();