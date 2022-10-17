import { BaseException, Response } from '@typeddd/common';

export class DomainException extends BaseException {
  public constructor(code: string, response: Response) {
    super(code, response);
  }
}
