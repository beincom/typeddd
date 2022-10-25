export interface IDomainEvent<T> {
  payload: T;

  eventId: string;

  aggregateId: string;

  occurredAt: number;

  version: number;

  order: number;

  requestId: string;
}
