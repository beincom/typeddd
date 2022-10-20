import { Sequelize } from 'sequelize';
import { UnitOfWork } from '../unit-of-work';
import { RuntimeException } from '@beincom/common';
import { TransactionOptions } from 'sequelize/types/transaction';
import { RequestContext } from '../request-context';

export function Transactional<T>(trxOptions?: TransactionOptions): MethodDecorator {
  return function (target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
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
        return uow.work(req.id, () => originalMethod.apply(this, args), trxOptions);
      }
      return originalMethod.apply(this, args);
    };

    return descriptor;
  };
}
