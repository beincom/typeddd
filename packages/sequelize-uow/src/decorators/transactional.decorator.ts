import { Sequelize } from 'sequelize';
import { UnitOfWork } from '../unit-of-work';
import { RuntimeException } from '@typeddd/common';
import { TransactionOptions } from 'sequelize/types/transaction';
import { RequestContext } from '../request-context';

export function Transactional<T>(trxOptions?: TransactionOptions): MethodDecorator {
  return function (target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (this: T, ...args: any[]) {
      const connection = (this as any).connection;

      if (!((connection as unknown) instanceof Sequelize)) {
        throw new RuntimeException(
          '@Transactional() decorator can only be applied to methods of classes with `connection: Sequelize` property`',
        );
      }
      const uow = UnitOfWork.getInstance(connection);

      const requestContext = RequestContext.currentContext();

      if (requestContext) {
        return uow.work(requestContext.req.id, () => originalMethod.apply(this, args), trxOptions);
      }
      return originalMethod.apply(this, args);
    };

    return descriptor;
  };
}
