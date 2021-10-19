import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
  getEnvVar(): string {
    return process.env.DB_CONNECTION;
  }
}
