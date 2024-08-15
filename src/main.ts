import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { MainExceptionFilter } from './exceptions/main-exception.filter';
import { ValidationPipe } from './pipes/validation.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new MainExceptionFilter());
  app.setGlobalPrefix('api');
  const config = new DocumentBuilder()
    .setTitle('Trello_test')
    .setDescription('Trello_test API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
}
bootstrap();
