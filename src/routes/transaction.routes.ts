import { Router } from 'express';

import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';
import Transaction from '../models/Transaction';

const transactionRouter = Router();

const transactionsRepository = new TransactionsRepository();

interface Balance {
  income: number;
  outcome: number;
  total: number;
}
interface TransactionsDTO {
  transactions: Transaction[];
  balance: Balance;
}

transactionRouter.get('/', (request, response) => {
  try {
    const transactions: TransactionsDTO = {
      transactions: transactionsRepository.all(),
      balance: transactionsRepository.getBalance(),
    };

    return response.status(200).json(transactions);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

transactionRouter.post('/', (request, response) => {
  try {
    const { title, value, type } = request.body;

    const createTransactionService: CreateTransactionService = new CreateTransactionService(
      transactionsRepository,
    );

    const transaction = createTransactionService.execute({
      title,
      value,
      type,
    });

    return response.status(200).json(transaction);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default transactionRouter;
