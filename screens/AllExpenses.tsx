import { useContext } from 'react';
import { ExpensesContext } from '../store/expenses-context';
import { ExpensesOutput } from '../components/expneseOutput/ExpensesOutput';

export const AllExpenses: React.FC = () => {
  const expensesCtx = useContext(ExpensesContext);

  return (
    <ExpensesOutput
      periodName="Total"
      expenses={expensesCtx.expenses}
      fallBackText="No expenses for a long time."
    />
  );
};
