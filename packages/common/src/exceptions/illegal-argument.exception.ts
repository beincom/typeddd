import { UnknownRecord } from '../types';
import { ExceptionId } from '../enums';
import { BaseException } from './base.exception';

export class IllegalArgumentException extends BaseException {
  code: string = ExceptionId.ILLEGAL_ARGUMENT;
  public constructor(response: string | UnknownRecord) {
    super(response);
  }
}
