import { IDomainEvent } from '../interfaces/domain';

export type BaseDomainEventProps = {
  eventId: string;
  aggregateId: unknown;
  requestId: string;
  occurredAt?: number;
  version?: number;
  order?: number;
};

export type DomainEventProps<T> = BaseDomainEventProps & {
  payload: T;
};

export abstract class DomainEvent<T> implements IDomainEvent<T> {
  protected abstract _eventId: string;

  protected abstract _aggregateId: unknown;

  private _payload!: T;

  private _occurredAt!: number;

  private _requestId?: string;

  private _version?: number;

  private _order?: number;

  protected constructor(props: DomainEventProps<T>) {
    this.eventId = props.eventId;
  }

  public get eventId(): string {
    return this._eventId;
  }

  protected set eventId(id: string) {
    this._eventId = id;
  }

  public get aggregateId(): unknown {
    return this._aggregateId;
  }

  protected set aggregateId(id: unknown) {
    this._aggregateId = id;
  }

  public get payload(): T {
    return this._payload;
  }

  protected set payload(value: T) {
    this._payload = value;
  }

  public get occurredAt(): number {
    return this._occurredAt;
  }

  protected set occurredAt(value: number) {
    this._occurredAt = value;
  }

  public get requestId(): string {
    return this._requestId;
  }

  protected set requestId(value: string) {
    this._requestId = value;
  }

  public get version(): number {
    return this._version;
  }

  protected set version(value: number) {
    this._version = value;
  }

  public get order(): number {
    return this._order;
  }

  protected set order(value: number) {
    this._order = value;
  }
}
