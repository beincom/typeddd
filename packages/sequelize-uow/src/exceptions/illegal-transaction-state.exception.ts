export class IllegalTransactionStateException extends Error {
  public constructor(msg: string) {
    super(msg);
    this.name = IllegalTransactionStateException.name;
  }
}
