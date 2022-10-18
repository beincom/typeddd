import { Sequelize as Connection, Transaction } from 'sequelize';
import { TransactionOptions } from 'sequelize/types/transaction';

export class UnitOfWork {
  private static instance: UnitOfWork;

  public static getInstance(conn: Connection): UnitOfWork {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new UnitOfWork(conn, new Map<string, Transaction>());
    return this.instance;
  }

  public constructor(
    private readonly conn: Connection,
    private readonly transactions: Map<string, Transaction>,
  ) {}

  public async start(id: string, trxOptions?: TransactionOptions): Promise<void> {
    if (!this.transactions.has(id)) {
      const newTrx = await this.conn.transaction(trxOptions);
      this.transactions.set(id, newTrx);
    }
  }

  public async commit(id: string): Promise<void> {
    if (this.transactions.has(id)) {
      await this.transactions.get(id).commit();
    }
  }

  public async rollback(id: string): Promise<void> {
    if (this.transactions.has(id)) {
      await this.transactions.get(id).rollback();
    }
  }

  public finish(id: string): void {
    this.transactions.delete(id);
  }

  public async work(
    requestId: string,
    execute: (...args: any[]) => Promise<any>,
    trxOptions?: TransactionOptions,
  ): Promise<any> {
    await this.start(requestId, trxOptions);

    try {
      const result = await execute();
      await this.commit(requestId);
      return result;
    } catch (ex) {
      await this.rollback(requestId);
      return ex;
    } finally {
      this.finish(requestId);
    }
  }
}
