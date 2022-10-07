import { VALUE_OBJECT_METADATA } from '../../metadata/constants';

export function ValueObject(): ClassDecorator {
  return function (target) {
    return target;
  };
}
