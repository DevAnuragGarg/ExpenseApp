import { StyleSheet, View } from 'react-native';
import { useContext, useLayoutEffect } from 'react';
import { GlobalStyles } from '../constants/styles';
import { IconButton } from '../components/ui/IconButton';
import { ExpensesContext } from '../store/expenses-context';
import { ExpenseForm } from '../components/manageExpense/ExpenseForm';
import { deleteExpense, storeExpense, updateExpense } from '../util/http';
import { useState } from 'react';
import { LoadingOverlay } from '../components/ui/LoadingOverlay';
import { ErrorOverlay } from '../components/ui/ErrorOverlay';

type ManageExpenseProps = {
  route: any;
  navigation: any;
};

export const ManageExpense: React.FC<ManageExpenseProps> = ({
  route,
  navigation,
}) => {
  const expensesCtx = useContext(ExpensesContext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { expenseId } = route.params || {};
  const isEditing = !!expenseId;
  const selectedExpense = expensesCtx.expenses.find(
    (expense: { id: string }) => expense.id === expenseId,
  );

  async function deleteExpenseHandler() {
    // Logic to delete the expense
    console.log('Delete Expense Handler Called');
    try {
      await deleteExpense(expenseId);
      expensesCtx.deleteExpense(expenseId);
      navigation.goBack(); // Navigate back after deletion
    } catch (error) {
      setError('Could not delete expense!');
      setIsLoading(false);
    }
  }

  function cancelHandler() {
    navigation.goBack(); // Navigate back without saving changes
  }

  function errorHandler() {
    setError(null); // Reset the error state
  }

  if (error && !isLoading) {
    return <ErrorOverlay message={error} onConfirm={errorHandler} />;
  }

  async function confirmHandler(expenseData: {
    description: string;
    amount: number;
    date: Date;
    id?: string;
  }) {
    setIsLoading(true);
    if (isEditing) {
      expensesCtx.updateExpense(expenseId, {
        description: expenseData.description,
        amount: expenseData.amount,
        date: expenseData.date,
      });
      await updateExpense(expenseId, {
        amount: expenseData.amount,
        description: expenseData.description,
        date: expenseData.date.toISOString(),
      });
    } else {
      // Logic to add a new expense
      console.log('Add Expense Handler Called');
      const id: string = await storeExpense({
        amount: expenseData.amount,
        description: expenseData.description,
        date: expenseData.date.toISOString(),
      });
      console.log('New Expense ID:', id);
      expensesCtx.addExpense({ ...expenseData, id: id });
    }
    setIsLoading(false);
    navigation.goBack(); // Navigate back after saving
  }

  useLayoutEffect(() => {
    // Set the header title based on whether it's editing or creating a new expense
    navigation.setOptions({
      title: isEditing ? 'Edit Expense' : 'Add Expense',
    });
  }, [navigation, isEditing]);

  if (isLoading) {
    <LoadingOverlay />;
  }

  return (
    <View style={styles.container}>
      <ExpenseForm
        submitButtonLabel={isEditing ? 'Update' : 'Add'}
        onCancel={cancelHandler}
        onConfirm={confirmHandler}
        defaultValues={isEditing ? selectedExpense : undefined}
      />
      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },

  deleteContainer: {
    marginTop: 16,
    padding: 8,
    borderTopWidth: 2,
    borderColor: GlobalStyles.colors.primary200,
    alignItems: 'center',
  },
});
