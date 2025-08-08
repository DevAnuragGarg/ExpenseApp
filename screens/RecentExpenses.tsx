import { useContext, useEffect } from 'react';
import { ExpensesOutput } from '../components/expneseOutput/ExpensesOutput';
import { ExpensesContext } from '../store/expenses-context';
import { fetchExpenses } from '../util/http';
import { useState } from 'react';
import { LoadingOverlay } from '../components/ui/LoadingOverlay';
import { ErrorOverlay } from '../components/ui/ErrorOverlay';

type Expense = {
  id: string;
  amount: number;
  date: Date;
  description: string;
};

export const RecentExpenses: React.FC = () => {
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const expensesCtx = useContext(ExpensesContext);
  //const [fetchedExpenses, setFetchedExpenses] = useState<Expense[]>([]);

  useEffect(() => {
    async function getExpenses() {
      setIsFetching(true);
      try {
        const expenses = await fetchExpenses();
        expensesCtx.setExpenses(expenses);
        console.log('Fetched Expenses in RecentExpenses:', expenses);
      } catch (error) {
        setError('Could not fetch expenses!');
      }
      setIsFetching(false);
    }
    getExpenses();
  }, []);

  function handleErrorDismiss() {
    setError(null);
  }

  if (error !== null && !isFetching) {
    return <ErrorOverlay message={error} onConfirm={handleErrorDismiss} />;
  }

  if (isFetching) {
    return <LoadingOverlay />;
  }

  const recentExpenses = (expensesCtx.expenses as Expense[]).filter(expense => {
    const today = new Date();
    const sevenDaysAgo = new Date(today);
    sevenDaysAgo.setDate(today.getDate() - 7);
    return expense.date >= sevenDaysAgo && expense.date <= today;
  });

  return (
    <ExpensesOutput
      periodName="Last 7 days"
      expenses={recentExpenses}
      fallBackText="No expenses for the last 7 days."
    />
  );
};
