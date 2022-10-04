import { UnknownRecord } from '../types';
import { ExceptionId } from '../enums';
import { BaseException } from './base.exception';

export class IllegalArgumentException extends BaseException {
  public constructor(response: string | UnknownRecord, id = ExceptionId.ILLEGAL_ARGUMENT) {
    super(id, response);
  }
}
