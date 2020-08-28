import Transaction from '../models/Transaction';

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}
interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const reducer = (accumulator: number, value: number): number =>
      accumulator + value;

    const incomeValues = this.transactions.map(transaction => {
      return transaction.type === 'income' ? transaction.value : 0;
    });

    const outcomeValues = this.transactions.map(transaction => {
      return transaction.type === 'outcome' ? transaction.value : 0;
    });

    const income = incomeValues.reduce(reducer);
    const outcome = outcomeValues.reduce(reducer);

    return { income, outcome, total: income - outcome };
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
