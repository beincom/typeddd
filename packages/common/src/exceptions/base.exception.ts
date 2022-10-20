import { isObject, isString } from '../utils/shared.utils';
import type { Cause, Response, ExceptionResponse } from '../types';

export abstract class BaseException extends Error {
  abstract code: string;

  constructor(readonly response: Response, readonly cause?: Cause) {
    super();

    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);

    this.buildMessage();
  }

  private buildMessage() {
    if (isString(this.response)) {
      this.message = this.response;
    } else if (
      isObject(this.response) &&
      isString((this.response as Record<string, any>).message)
    ) {
      this.message = (this.response as Record<string, any>).message;
    } else if (this.constructor) {
      this.message = this.constructor.name.match(/[A-Z][a-z]+|[0-9]+/g).join(' ');
    }
  }

  public getResponse(): ExceptionResponse {
    return this.response;
  }
}
