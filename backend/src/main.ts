import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Enable CORS for frontend
  app.enableCors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
  });
  
  // Apply validation globally
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // Strip properties not in DTO
    transform: true, // Transform payloads to DTO instances
    forbidNonWhitelisted: true, // Throw errors on non-whitelisted properties
  }));
  
  // Global API prefix
  app.setGlobalPrefix('api');
  
  await app.listen(process.env.PORT || 3001);
  console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap(); 