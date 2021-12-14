import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { join } from 'path/posix';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(join(__dirname, '..', 'static'), {
    prefix: '/static/',
  });

  const config = new DocumentBuilder()
    .setTitle('KK Dinamo Zagreb API')
    .setDescription('KK Dinamo Zagreb API Overview')
    .setVersion('1.0')
    .addTag('dinamo')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/', app, document);

  await app.listen(3000);
}

bootstrap();
