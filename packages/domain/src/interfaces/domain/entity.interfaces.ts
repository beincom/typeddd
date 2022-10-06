import type {
  IdValueObject,
  CreatedAtValueObject,
  UpdatedAtValueObject,
  DeletedAtValueObject,
  ComplexIdValueObject,
  UUIDValueObject,
} from '../../value-objects';

export type ID<T> = T extends UUIDValueObject ? T : ComplexIdValueObject<T>;

export interface BaseEntityProps<T> {
  id: ID<T>;
  createdAt: CreatedAtValueObject;
  updatedAt: UpdatedAtValueObject;
  deletedAt: DeletedAtValueObject;
}

export interface FullProps<T, V> {
  id: ID<T>;
  props: V;
  createdAt: CreatedAtValueObject;
  updatedAt: UpdatedAtValueObject;
  deletedAt?: DeletedAtValueObject;
}
