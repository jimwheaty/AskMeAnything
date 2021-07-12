import { NestFactory } from '@nestjs/core';
import { ClientOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {

  const connectionOptions: ClientOptions = {
    transport: Transport.TCP,
    options: {
      host: '127.0.0.1',
      port: 8877,
    }
  };

  const app = await NestFactory.createMicroservice(AppModule, connectionOptions);


  await app.listen(() => {
    console.log(`Microservice is listening`);
  });
}
bootstrap();