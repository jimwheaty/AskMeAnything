import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {


  const app = await NestFactory.create(AppModule);

  const authMicroservice = app.connectMicroservice({
    transport: Transport.REDIS,
    options: {
      url: 'redis://localhost:6379'
    }
  });

  // app.connectMicroservice({
  //   transport: Transport.TCP,
  //   options: {
  //     host: '127.0.0.1',
  //     port: 3000,
  //   }
  // });

  app.setGlobalPrefix('api');
  app.enableCors();

  app.startAllMicroservices();
  await app.listen(8080);
  console.log(`Q&A Management Service is up!`);
}
bootstrap();