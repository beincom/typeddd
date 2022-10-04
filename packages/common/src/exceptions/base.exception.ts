import { isObject, isString } from '../utils/shared.utils';
import type { Cause, Response, ExceptionResponse } from '../types';

export class BaseException extends Error {
  public cause: Cause;

  constructor(private readonly id: string, private readonly response: Response) {
    super();

    this.name = this.constructor.name;

    if (this.response instanceof Error) {
      this.cause = this.response;
    }

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

  public getId(): string {
    return this.id;
  }
}
