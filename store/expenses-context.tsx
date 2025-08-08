import { createContext, useReducer } from 'react';

export const ExpensesContext = createContext({
  expenses: [],
  setExpenses: (
    expenses: {
      id: string;
      description: string;
      amount: number;
      date: Date;
    }[],
  ) => {},
  addExpense: ({
    id,
    description,
    amount,
    date,
  }: {
    id: string | undefined;
    description: string;
    amount: number;
    date: Date;
  }) => {},
  deleteExpense: (id: string) => {},
  updateExpense: (
    id: string,
    {
      description,
      amount,
      date,
    }: { description: string; amount: number; date: Date },
  ) => {},
});

export const DUMMY_EXPENSES = [
  {
    id: 'e1',
    description: 'Groceries',
    amount: 50.0,
    date: new Date('2025-01-01'),
  },
  {
    id: 'e2',
    description: 'Rent',
    amount: 1200.0,
    date: new Date('2025-02-01'),
  },
  {
    id: 'e3',
    description: 'Utilities',
    amount: 2700.0,
    date: new Date('2025-03-01'),
  },
  {
    id: 'e4',
    description: 'Petrol',
    amount: 1250.0,
    date: new Date('2025-04-01'),
  },
  {
    id: 'e5',
    description: 'Internet',
    amount: 100.0,
    date: new Date('2025-05-01'),
  },
  {
    id: 'e6',
    description: 'Dining Out',
    amount: 200.0,
    date: new Date('2025-06-01'),
  },
]; // Example expenses for demonstration

function expensesReducer(state, action) {
  switch (action.type) {
    case 'ADD':
      return [...state, { id: Math.random().toString(), ...action.payload }];
    case 'SET':
      const inverted = action.payload.reverse();
      return inverted;
    case 'DELETE':
      return state.filter(
        (expense: { id: string }) => expense.id !== action.payload,
      );
    case 'UPDATE':
      return state.map((expense: { id: string }) =>
        expense.id === action.payload.id
          ? { ...expense, ...action.payload.data }
          : expense,
      );
    default:
      return state;
  }
}

function ExpensesContextProvider({ children }: { children: React.ReactNode }) {
  const [expensesState, dispatch] = useReducer(expensesReducer, []);

  const setExpenses = (
    expenses: {
      description: string;
      amount: number;
      date: Date;
    }[],
  ) => {
    dispatch({ type: 'SET', payload: expenses });
  };

  const addExpense = (expenseData: {
    description: string;
    amount: number;
    date: Date;
  }) => {
    dispatch({ type: 'ADD', payload: expenseData });
  };

  const deleteExpense = (id: string) => {
    dispatch({ type: 'DELETE', payload: id });
  };

  const updateExpense = (
    id: string,
    expenseData: { description: string; amount: number; date: Date },
  ) => {
    dispatch({ type: 'UPDATE', payload: { id, data: expenseData } });
  };

  const value = {
    expenses: expensesState,
    addExpense,
    setExpenses,
    deleteExpense,
    updateExpense,
  };

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
}

export default ExpensesContextProvider;
