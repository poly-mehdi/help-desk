import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  // Set the global prefix for all routes
  app.setGlobalPrefix('api/v1');
  // Set the global filter for all routes
  app.useGlobalFilters(new HttpExceptionFilter());
  // Swagger API documentation
  const config = new DocumentBuilder()
    .setTitle('Help Desk API')
    .setDescription('API documentation for the Help Desk project')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/v1/docs', app, document);

  await app.listen(3000);
}
bootstrap();
