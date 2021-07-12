import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const esb = await NestFactory.create(AppModule);

  esb.enableCors();
  esb.setGlobalPrefix('api');

  const PORT = 8080;
  await esb.listen(process.env.PORT || 8080);
  console.log(`ESB listening on port ${PORT}.`);
}
bootstrap();
