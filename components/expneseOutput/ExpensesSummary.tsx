import { View, Text, StyleSheet } from 'react-native';
import { GlobalStyles } from '../../constants/styles';

type ExpensesSummaryProps = {
  expenses: { id: string; description: string; amount: number; date: Date }[];
  periodName?: string;
};

export const ExpensesSummary: React.FC<ExpensesSummaryProps> = ({
  expenses,
  periodName,
}) => {
  const totalExpenses = expenses
    ? expenses.reduce((sum, expense) => sum + expense.amount, 0)
    : 0;

  return (
    <View style={styles.container}>
      <Text style={styles.period}>Period: {periodName}</Text>
      <Text style={styles.sum}>Total: ${totalExpenses.toFixed(2)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
    backgroundColor: GlobalStyles.colors.primary50,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  period: {
    fontSize: 12,
    color: GlobalStyles.colors.primary400,
  },
  sum: {
    fontSize: 16,
    fontWeight: 'bold',
    color: GlobalStyles.colors.primary500,
  },
});
