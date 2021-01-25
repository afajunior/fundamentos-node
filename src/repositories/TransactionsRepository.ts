import Transaction from '../models/Transaction';

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
    let totalIncome: number = 0;
    let totalOutcome: number = 0;

    this.transactions.map( transaction => {
      if(transaction.type === 'income') {
        totalIncome += transaction.value;
      } else if(transaction.type === 'outcome') {
        totalOutcome += transaction.value;
      }
    })
    return { income: totalIncome, outcome:totalOutcome, total: totalIncome - totalOutcome };
  }

  public create(title: string, value: number, type: 'income' | 'outcome'): Transaction {
    const transaction = new Transaction({ title, value, type });
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
