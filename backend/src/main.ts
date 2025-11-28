import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilitar CORS para que la app móvil/web (Expo) pueda consumir la API
  app.enableCors({
    origin: true, // refleja el origin de la petición; en producción puedes restringirlo
    credentials: true,
  });

  // Validación global basada en los DTOs (class-validator)
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // elimina propiedades que no estén en el DTO
      forbidNonWhitelisted: true, // lanza error si llegan propiedades desconocidas
      transform: true, // transforma tipos (por ejemplo, strings a números donde aplique)
    }),
  );

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`Backend escuchando en el puerto ${port}`);
}

bootstrap();
