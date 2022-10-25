import { ThrowAble } from './throw-able';

export enum Propagation {
  /**
   * Support a current transaction, throw an exception if none exists.
   */
  MANDATORY,

  /**
   *  Execute within a nested transaction if a current transaction exists, behave like REQUIRED otherwise.
   */
  NESTED,

  /**
   * Execute non-transactional, throw an exception if a transaction exists.
   */
  NEVER,

  /**
   * Execute non-transactional, suspend the current transaction if one exists.
   */
  NOT_SUPPORTED,

  /**
   * Support a current transaction, create a new one if none exists.
   */
  REQUIRED,

  /**
   * Create a new transaction, and suspend the current transaction if one exists.
   */
  REQUIRES_NEW,

  /**
   * Support a current transaction, execute non-transactional if none exists.
   */
  SUPPORTS,
}

export enum IsolationLevel {
  READ_UNCOMMITTED = 'READ UNCOMMITTED',
  READ_COMMITTED = 'READ COMMITTED',
  REPEATABLE_READ = 'REPEATABLE READ',
  SERIALIZABLE = 'SERIALIZABLE',
}

export type ClassTransactionOptions = {
  propagation?: Propagation;
  isolationLevel?: IsolationLevel;
  readOnly?: boolean;
  rollbackFor?: ThrowAble[];
  noRollbackFor?: ThrowAble[];
};

export type MethodTransactionOptions = Omit<ClassTransactionOptions, 'position'>;
