import { DomainEvent } from './domain-event';
import { RuntimeException } from '@typeddd/common';

export class DomainEventBuilder<T extends DomainEvent<Payload>, Payload> {
  private instance: T;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  public init(ctor: new (...args: any[]) => T) {
    if (this.instance) {
      throw new RuntimeException('Init has been called');
    }
    this.instance = new ctor();
    this.instance.eventName = Reflect.get(this.instance, 'constructor').name;
    return this;
  }

  public build() {
    return this.instance;
  }

  public setEventId(id: string) {
    this.instance.eventId = id;
    return this;
  }

  public setEventName(name: string) {
    this.instance.eventName = name;
    return this;
  }

  public setEventPayload(payload: Payload) {
    this.instance.payload = payload;
    return this;
  }

  public setAggregateId(aggregateId: string) {
    this.instance.aggregateId = aggregateId;
    return this;
  }

  public setOccurredAt(occurredAt: number) {
    this.instance.occurredAt = occurredAt;
    return this;
  }

  public setVersion(version: number) {
    this.instance.version = version;
    return this;
  }

  public setRequestId(id: string) {
    this.instance.requestId = id;
    return this;
  }

  public static init<T extends DomainEvent<Payload>, Payload>(
    ctor: new (...args: any[]) => T,
  ): DomainEventBuilder<T, Payload> {
    return new DomainEventBuilder<T, Payload>().init(ctor);
  }
}
