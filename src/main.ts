import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  // console.log('command line args', process.argv);
  const app = await NestFactory.create(AppModule);
  await app.listen(8000);
}
bootstrap();
