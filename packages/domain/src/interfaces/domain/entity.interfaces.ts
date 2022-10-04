import type {
  IdValueObject,
  CreatedAtValueObject,
  UpdatedAtValueObject,
  DeletedAtValueObject,
} from '../../value-objects';

export interface BaseEntityProps {
  id: IdValueObject;
  createdAt: CreatedAtValueObject;
  updatedAt: UpdatedAtValueObject;
  deletedAt: DeletedAtValueObject;
}

export interface DefaultEntityProps<T> {
  id: IdValueObject;
  props: T;
  createdAt: CreatedAtValueObject;
  updatedAt: UpdatedAtValueObject;
  deletedAt?: DeletedAtValueObject;
}
