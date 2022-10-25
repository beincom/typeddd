import { UUIDValueObject } from '../value-objects';
import { IDomainEvent } from '../interfaces/domain';
import { isEmptyArray, isUndefined } from '@beincom/common';

export type BaseDomainEventProps = {
  eventId: string;
  aggregateId: string;
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

  public payload: T;

  public aggregateId: string;

  public requestId: string;

  public occurredAt: number;

  public version: number;

  public order: number;

  protected constructor();
  protected constructor(props: DomainEventProps<T>);
  protected constructor(...args: any[]) {
    if (!isUndefined(args) || !isEmptyArray(args)) {
      const props: DomainEventProps<T> = args[0];
      this.eventId = UUIDValueObject.generate().value;
      this.aggregateId = props?.aggregateId;
      this.requestId = props?.requestId;
      this.payload = props?.payload;
      this.occurredAt = props?.occurredAt || Date.now();
      if (props?.version) {
        this.version = props.version;
      }
    }
  }

  public get eventId() {
    return this._eventId;
  }

  public set eventId(id: string) {
    this._eventId = id;
  }
}
