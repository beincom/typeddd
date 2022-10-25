import { Sequelize } from 'sequelize';
import { UnitOfWork } from '../unit-of-work';
import { RuntimeException } from '@beincom/common';
import { RequestContext } from '../request-context';
import { ClassTransactionOptions, IsolationLevel, MethodTransactionOptions } from '../types';

const applyToAllMethod = (target, decorator, applyMethods: string | string[]) => {
  for (const key of Object.getOwnPropertyNames(target.prototype)) {
    // maybe blacklist methods here
    if (applyMethods.includes(key) || applyMethods === '*') {
      let descriptor = Object.getOwnPropertyDescriptor(target.prototype, key);
      if (descriptor) {
        descriptor = decorator(target.prototype, key, descriptor);
        Object.defineProperty(target.prototype, key, descriptor);
      }
    }
  }
};

export function Transactional<T>(trxOptions?: MethodTransactionOptions);
export function Transactional<T>(
  methods: string | [keyof T][],
  trxOptions?: ClassTransactionOptions,
): ClassDecorator;
export function Transactional<T>(...args) {
  const methodDecorator = function <T>(
    target,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor,
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (this: T, ...args: any[]) {
      const requestContext = RequestContext.currentContext();
      const { connection, req } = requestContext;

      if (!((connection as unknown) instanceof Sequelize)) {
        throw new RuntimeException(
          '@Transactional() decorator can only be applied to request context with sequelize connection`',
        );
      }
      const uow = UnitOfWork.getInstance(connection);

      if (req.id) {
        return uow.work(req.id, () => originalMethod.apply(this, args), {});
      }
      return originalMethod.apply(this, args);
    };

    return descriptor;
  };

  if (typeof args[0] === 'string' || Array.isArray(args[0])) {
    return applyToAllMethod(args[0], methodDecorator, args[0]);
  }
  return methodDecorator;
}
