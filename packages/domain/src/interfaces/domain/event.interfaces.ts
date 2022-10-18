export interface IDomainEvent<T> {
  payload: T;

  eventId: string;

  eventName: string;

  aggregateId: string;

  occurredAt: number;

  version: number;

  order: number;

  requestId: string;
}
