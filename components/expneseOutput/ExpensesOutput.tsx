import { StyleSheet, View, Text } from 'react-native';
import { ExpensesSummary } from './ExpensesSummary';
import { ExpensesList } from './ExpensesList';
import { GlobalStyles } from '../../constants/styles';

type ExpensesOutputProps = {
  expenses: { id: string; description: string; amount: number; date: Date }[];
  periodName?: string;
  fallBackText?: string;
};

export const ExpensesOutput: React.FC<ExpensesOutputProps> = ({
  expenses,
  periodName,
  fallBackText,
}) => {
  let content = <Text style={styles.infoText}>{fallBackText}</Text>;

  return (
    <View style={styles.container}>
      <ExpensesSummary expenses={expenses} periodName={periodName} />
      {expenses.length > 0 ? <ExpensesList expenses={expenses} /> : content}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flex: 1,
    backgroundColor: GlobalStyles.colors.primary700,
  },
  infoText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 32,
  },
});
