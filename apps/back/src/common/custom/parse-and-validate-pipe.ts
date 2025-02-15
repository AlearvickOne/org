import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
  ValidationPipe,
} from '@nestjs/common';

@Injectable()
export class ParseAndValidatePipe implements PipeTransform {
  private validationPipe: ValidationPipe;

  constructor() {
    this.validationPipe = new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      exceptionFactory: (errors) => {
        const formattedErrors = errors.reduce((acc, error) => {
          acc[error.property] = Object.values(error.constraints || {});
          return acc;
        }, {});
        return new BadRequestException(formattedErrors);
      },
    });
  }

  async transform(value: any, metadata: ArgumentMetadata) {
    if (typeof value['data'] === 'string' || typeof value === 'string') {
      try {
        value = JSON.parse(value['data'] ?? value); // 🔥 Парсим JSON
      } catch {
        throw new BadRequestException('Некорректный JSON в data');
      }
    }

    return this.validationPipe.transform(value, metadata); // ✅ Передаём данные в `ValidationPipe`
  }
}
