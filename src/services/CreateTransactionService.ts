import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface TransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: TransactionDTO): Transaction {
    const total = this.transactionsRepository.getBalance().total;
    if(type === 'outcome' && total-value < 0) {
      throw Error('No balance');
    }

    return this.transactionsRepository.create(title, value, type);
  }
}

export default CreateTransactionService;
