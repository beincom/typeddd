import type {
  CreatedAtValueObject,
  UpdatedAtValueObject,
  DeletedAtValueObject,
} from '../../value-objects';

export interface BaseEntityProps<T> {
  id: T;
  createdAt: CreatedAtValueObject;
  updatedAt: UpdatedAtValueObject;
  deletedAt: DeletedAtValueObject;
}

export interface EntityProps<T, V> {
  id: T;
  props: V;
  createdAt: CreatedAtValueObject;
  updatedAt: UpdatedAtValueObject;
  deletedAt?: DeletedAtValueObject;
}
