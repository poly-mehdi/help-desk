import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const configService = app.get(ConfigService);
  // Set the global prefix for all routes
  app.setGlobalPrefix(configService.get('app.prefix'));
  // Set the global filter for all routes
  app.useGlobalFilters(new HttpExceptionFilter());
  const port = configService.get('app.port');
  const host = configService.get('app.host');
  await app.listen(port, host);
  Logger.log(`Server running on http://${host}:${port}`);
}
bootstrap();
