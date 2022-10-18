import cls from 'cls-hooked';
import { Sequelize } from 'sequelize';

const TRX_NAMESPACE = 'sequelize-transactions';

/**
 * Automatically pass transactions to all sequelize queries.
 */
function initNamespace(name = TRX_NAMESPACE) {
  const namespace = cls.createNamespace(name);
  Sequelize.useCLS(namespace);
}

initNamespace();
