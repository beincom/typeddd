import { UUIDValueObject } from '../value-objects';
import { isEmptyArray, isUndefined } from '@typeddd/common';
import { IDomainEvent } from '../interfaces/domain/event.interfaces';

export type BaseDomainEventProps = {
  eventId: string;
  eventName: string;
  aggregateId: string;
  occurredAt?: number;
  version?: number;
  order?: number;
};

export type DomainEventProps<T> = BaseDomainEventProps & {
  payload: T;
};

export abstract class DomainEvent<T> implements IDomainEvent<T> {
  protected abstract _eventId: string;

  protected abstract _eventName: string;

  private _payload: T;

  private _aggregateId: string;

  private _occurredAt: number;

  private _version: number;

  private _order: number;

  public constructor();
  public constructor(props: DomainEventProps<T>);
  public constructor(...args: any[]) {
    if (!isUndefined(args) && !isEmptyArray(args)) {
      const props: DomainEventProps<T> = args[0];
      this.eventId = UUIDValueObject.generate().value;
      this.eventName = props.eventName;
      this._aggregateId = props.aggregateId;
      this._payload = props.payload;
      this._occurredAt = props.occurredAt || Date.now();
      if (props.version) {
        this._version = props.version;
      }
    }
  }

  public get eventId(): string {
    return this._eventId;
  }

  public get eventName(): string {
    return this._eventName;
  }

  public get payload(): T {
    return this._payload;
  }

  public set payload(value: T) {
    this._payload = value;
  }

  public get aggregateId(): string {
    return this._aggregateId;
  }

  public get occurredAt(): number {
    return this._occurredAt;
  }

  public get version(): number {
    return this._version;
  }

  public get order(): number {
    return this._order;
  }

  public set eventId(value: string) {
    this._eventId = value;
  }

  public set eventName(value: string) {
    this._eventName = value;
  }

  public set aggregateId(value: string) {
    this._aggregateId = value;
  }

  public set occurredAt(value: number) {
    this._occurredAt = value;
  }

  public set version(value: number) {
    this._version = value;
  }

  public set order(value: number) {
    this._order = value;
  }
}
