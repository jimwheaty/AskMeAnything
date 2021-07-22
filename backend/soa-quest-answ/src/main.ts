import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {


  const app = await NestFactory.create(AppModule);

  const authMicroservice = app.connectMicroservice({
    transport: Transport.REDIS,
    options: {
      // url: 'redis://localhost:6379'
      port: 6379
    }
  });

  app.setGlobalPrefix('api');
  app.enableCors();

  app.startAllMicroservices();
  await app.listen(process.env.PORT || 8080);
  console.log(`Q&A Management Service is up!`);
}
bootstrap();