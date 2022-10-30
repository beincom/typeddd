export interface IThrowAble<T extends Error> extends Error {
  type: T;
}

export class RuntimeException extends Error implements IThrowAble<RuntimeException> {
  public constructor(msg: any) {
    super(msg);
    this.message = msg;
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }

  public type: RuntimeException;
}
