import { BaseException, Response } from '@beincom/common';

export class DomainException extends BaseException {
  public code: string;

  public constructor(code: string, response: Response, cause?: Error) {
    super(response, cause);
    this.code = code;
  }
}
