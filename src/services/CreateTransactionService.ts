import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute(data: Request): Transaction {
    let balance = { income: 0, outcome: 0, total: 0 };

    if (this.transactionsRepository.all().length > 0) {
      balance = this.transactionsRepository.getBalance();
    }

    if (data.type === 'outcome' && balance.total < data.value) {
      throw Error('Transaction value greater than total balance!');
    }

    const transaction = this.transactionsRepository.create(data);
    return transaction;
  }
}

export default CreateTransactionService;
