export class RuntimeException extends Error {
  constructor(msg: any) {
    super(msg);
    this.name = RuntimeException.name;
  }
}
