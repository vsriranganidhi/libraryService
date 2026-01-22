import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'; // Import these
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // Strips away any data that is not in the DTO
    forbidNonWhitelisted: true, // Throws an error if extra data is sent
    transform: true, // Automatically transforms types (e.g., string to number)
  }));

  // 2. Swagger Configuration
  const config = new DocumentBuilder()
    .setTitle('Library Service API')
    .setDescription('The library API description')
    .setVersion('1.0')
    .addTag('books')
    .build();
    
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // This sets the URL to /api

  await app.listen(process.env.PORT ?? 3000);
  console.log(`Application is running on: http://localhost:3000/api`);
}
bootstrap();
