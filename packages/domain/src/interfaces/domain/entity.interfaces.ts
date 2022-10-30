import type { CreatedAt, UpdatedAt, DeletedAt } from '../../value-objects';

export interface BaseEntityProps<T> {
  id: T;
  createdAt: CreatedAt;
  updatedAt: UpdatedAt;
  deletedAt: DeletedAt;
}

export interface EntityProps<T, V> {
  id: T;
  props: V;
  createdAt: CreatedAt;
  updatedAt: UpdatedAt;
  deletedAt?: DeletedAt;
}
