import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Puppy Spa API is running!';
  }
  
  getHealthCheck(): { status: string; timestamp: string } {
    return {
      status: 'up',
      timestamp: new Date().toISOString(),
    };
  }
}
