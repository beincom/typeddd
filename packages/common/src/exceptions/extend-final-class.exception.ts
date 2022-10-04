import { ExceptionId } from '../enums';
import type { Response } from '../types';
import { BaseException } from './base.exception';

export class ExtendFinalClassException extends BaseException {
  constructor(response: Response, id = ExceptionId.EXTEND_FINAL_CLASS) {
    super(id, response);
  }
}
