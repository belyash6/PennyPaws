import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
} from 'react';

export type TransactionType = 'income' | 'expense';

// lista transakcji, dodawanie i usuwanie transakcji, kontekst dla całej aplikacji
export type Transaction = {
  id: string;
  amount: number;
  category: string;
  date: string;
  type: TransactionType;
  description: string;
};

type TransactionsContextType = {
  transactions: Transaction[];
  addTransaction: (
    transaction: Omit<Transaction, 'id'>
  ) => void;
  deleteTransaction: (id: string) => void;
};

const TransactionsContext =
  createContext<TransactionsContextType | undefined>(undefined);

export function TransactionsProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  function addTransaction(
    transaction: Omit<Transaction, 'id'>
  ) {
    setTransactions((previous) => [
      {
        ...transaction,
        id: `${Date.now()}-${Math.random()}`,
      },
      ...previous,
    ]);
  }

  function deleteTransaction(id: string) {
    setTransactions((previous) =>
      previous.filter((transaction) => transaction.id !== id)
    );
  }

  return (
    <TransactionsContext.Provider
      value={{ transactions, addTransaction, deleteTransaction }}
    >
      {children}
    </TransactionsContext.Provider>
  );
}

export function useTransactions() {
  const context = useContext(TransactionsContext);

  if (!context) {
    throw new Error(
      'useTransactions musi być użyty wewnątrz TransactionsProvider.'
    );
  }

  return context;
}