import { BaseException, Response } from '@beincom/common';

export class DomainException extends BaseException {
  public constructor(code: string, response: Response) {
    super(code, response);
  }
}
