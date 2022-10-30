export interface IDomainEvent<T> {
  eventId: string;

  aggregateId: unknown;

  payload: T;

  occurredAt: number;

  version?: number;

  order?: number;

  requestId?: any;
}
