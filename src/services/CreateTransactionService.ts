import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string,
  value: number,
  type: 'income' | 'outcome'
}

class CreateTransactionService {

  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ type, title, value }: Request): Transaction {
    if (type == 'outcome') {
      const { total } = this.transactionsRepository.getBalance();
      if (value > total)
        throw new Error('Saldo não disponivel');
    }
    const transaction = this.transactionsRepository.create({
      title, type, value
    });
    return transaction;
  }
}

export default CreateTransactionService;
