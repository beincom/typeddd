import { BaseException, Response } from '@typeddd/common';

export class DomainException extends BaseException {
  public constructor(id: string, response: Response) {
    super(id, response);
  }
}
