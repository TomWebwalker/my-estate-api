import { HttpException, HttpStatus } from '@nestjs/common';

export class NotActiveException extends HttpException {
  constructor() {
    super('NotActive', HttpStatus.UNAUTHORIZED);
  }
}
