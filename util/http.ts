import axios from 'axios';

const BASE_URL = 'https://react-native-course-b898f-default-rtdb.asia-southeast1.firebasedatabase.app';

export async function storeExpense(expenseData: { amount: number, description: string, date: string }) {
  console.log('Storing Expense:', expenseData);
  const response = await axios.post('https://react-native-course-b898f-default-rtdb.asia-southeast1.firebasedatabase.app/expenses.json', expenseData);
  const id = response.data.name; // Firebase generates a unique ID for the new expense
  console.log('Stored Expense:', { id, ...expenseData });
  return id;
}

export async function fetchExpenses() {
  const response = await axios.get('https://react-native-course-b898f-default-rtdb.asia-southeast1.firebasedatabase.app/expenses.json');
  const expenses = [];
  console.log('Fetched Expenses:', response.data);
  for (const key in response.data) {
    const expenseObj = {
      id: key,
      amount: response.data[key].amount,
      description: response.data[key].description,
      date: new Date(response.data[key].date),
    };
    expenses.push(expenseObj);
  }
  return expenses;
}

export function deleteExpense(expenseId: string) {
  return axios.delete(`${BASE_URL}/expenses/${expenseId}.json`);
}

export function updateExpense(expenseId: string, expenseData: { amount: number, description: string, date: string }) {
  return axios.put(`${BASE_URL}/expenses/${expenseId}.json`, expenseData);
}


