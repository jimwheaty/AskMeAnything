import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  
  app.enableCors({
    origin: 'http://localhost:3000'
  });
  app.setGlobalPrefix('api');

  const PORT = 3000;
  await app.listen(process.env.PORT || 3000);
  console.log(`App listening on port ${PORT}. Go to http://localhost:${PORT}`);
}
bootstrap();