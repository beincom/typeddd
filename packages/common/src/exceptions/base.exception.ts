import type { Response } from '../types';
import { isObject, isString } from '../utils/shared.utils';

/**
 * This code base on Nestjs Http Exception.
 * @see https://github.com/nestjs/nest/blob/master/packages/common/exceptions/http.exception.ts
 */
export abstract class BaseException extends Error {
  public abstract code: string;
  public cause: Error | undefined;

  protected constructor(private readonly response: Response, cause?: Error) {
    super();
    this.name = this.constructor.name;
    this.initCause(cause);
    this.buildMessage();
    this.captureStackTrace();
  }

  /**
   * Configures error chaining support
   *
   * See:
   * - https://nodejs.org/en/blog/release/v16.9.0/#error-cause
   * - https://github.com/microsoft/TypeScript/issues/45167
   */
  private initCause(cause?: Error) {
    if (this.response instanceof Error && !cause) {
      this.cause = this.response;
    }
    this.cause = cause;
  }

  private captureStackTrace() {
    Error.captureStackTrace(this, this.constructor);
  }

  /**
   * Build message exception.
   * @private
   */
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

  public getResponse() {
    return this.response;
  }
}
