import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface TransactionDTO {
  title: string,
  value: number,
  type: 'income' | 'outcome'
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
    const income = this.transactions
      .filter(f => f.type == 'income')
      .reduce((previous, atual) => (previous + atual.value), 0);
    const outcome = this.transactions
      .filter(f => f.type == 'outcome')
      .reduce((previous, atual) => (previous + atual.value), 0);
    const balance = {
      income,
      outcome,
      total: income - outcome
    }
    return balance;
  }

  public create({ title, type, value }: TransactionDTO): Transaction {
    const transaction = new Transaction({ title, type, value });
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
