import { BaseException } from '@beincom/common';

export class DomainException extends BaseException {
  public code: string;
}
