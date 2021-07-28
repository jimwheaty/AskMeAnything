import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  
  app.enableCors({});
  app.setGlobalPrefix('api');

  const PORT = 8080;
  await app.listen(process.env.PORT || 8080);
  console.log(`App listening on port ${PORT}. Go to http://localhost:${PORT}`);
}
bootstrap();