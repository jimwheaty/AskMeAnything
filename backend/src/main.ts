import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  const PORT = 8080
  await app.listen(PORT);
  console.log(`App listening on port ${PORT}. Go to http://localhost:${PORT}`)
}
bootstrap();