import { FlatList } from 'react-native';
import { ExpenseItem } from './ExpenseItem';

type ExpenseListProps = {
  expenses: { id: string; description: string; amount: number; date: Date }[];
};

function renderExpenseItem(itemData: {
  item: { id: string; description: string; amount: number; date: Date };
}) {
  return <ExpenseItem expense={itemData.item} />;
}

export const ExpensesList: React.FC<ExpenseListProps> = ({ expenses }) => {
  return (
    <FlatList
      data={expenses}
      renderItem={renderExpenseItem}
      keyExtractor={item => item.id}
    />
  );
};
