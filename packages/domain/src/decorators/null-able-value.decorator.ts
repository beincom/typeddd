import { setMetadata } from '../metadata';
import { VALUE_OBJECT_NULLABLE_METADATA } from '../constants';

export const NullAbleValue = <T>(): ClassDecorator => {
  return function (target) {
    setMetadata(`${VALUE_OBJECT_NULLABLE_METADATA}.${target.name}`, true);
  };
};
