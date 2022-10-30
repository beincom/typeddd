import { ExceptionId } from '../enums';
import type { Response } from '../types';
import { BaseException } from './base.exception';

export class ExtendFinalClassException extends BaseException {
  code: string = ExceptionId.EXTEND_FINAL_CLASS;
  constructor(response: Response, id = ExceptionId.EXTEND_FINAL_CLASS) {
    super(response);
  }
}
