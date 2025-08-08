import { StyleSheet, View, Text } from 'react-native';
import { Input } from './Input';
import { useState } from 'react';
import { Button } from '../ui/Button';
import { GlobalStyles } from '../../constants/styles';

type ExpenseFormProps = {
  submitButtonLabel: string;
  onConfirm: (description: string, amount: number, date: Date) => void; // Callback for confirm action
  onCancel: () => void; // Callback for cancel action
  defaultValues?: {
    description: string;
    amount: number;
    date: Date;
  };
};

export const ExpenseForm: React.FC<ExpenseFormProps> = ({
  submitButtonLabel,
  onConfirm,
  onCancel,
  defaultValues,
}) => {
  const [inputs, setInputs] = useState<{
    amount: { value: string; isValid: boolean };
    date: { value: string; isValid: boolean };
    description: { value: string; isValid: boolean };
  }>({
    amount: {
      value: defaultValues?.amount?.toString() || '',
      isValid: true,
    },
    date: {
      value: defaultValues?.date?.toISOString().slice(0, 10) || '',
      isValid: true,
    },
    description: {
      value: defaultValues?.description || '',
      isValid: true,
    },
  });

  function submitHandler() {
    const expenseData = {
      amount: +inputs.amount.value,
      date: new Date(inputs.date.value),
      description: inputs.description.value,
    };

    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const dateIsValid = expenseData.date.toString() !== 'Invalid Date';
    const descriptionIsValid = expenseData.description.trim().length > 0;

    if (amountIsValid && dateIsValid && descriptionIsValid) {
      onConfirm(expenseData);
    } else {
      setInputs(prevValues => ({
        amount: { value: prevValues.amount.value, isValid: amountIsValid },
        date: { value: prevValues.date.value, isValid: dateIsValid },
        description: {
          value: prevValues.description.value,
          isValid: descriptionIsValid,
        },
      }));
    }
  }

  function inputChangedHandler(inputIdentifier: string, enteredValue: string) {
    setInputs(prevValues => ({
      ...prevValues,
      [inputIdentifier]: {
        value: enteredValue,
        isValid: true,
      },
    }));
    console.log(
      `Input changed: ${inputs.amount.value}, ${inputs.date.value}, ${inputs.description.value}`,
    );
  }

  function formIsInvalid() {
    return (
      !inputs.amount.isValid ||
      !inputs.date.isValid ||
      !inputs.description.isValid
    );
  }

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expenses</Text>
      <View style={styles.inputRow}>
        <Input
          label="Amount"
          style={styles.rowInput}
          invalid={!inputs.amount.isValid}
          textInputConfig={{
            keyboardType: 'decimal-pad',
            onChangeText: inputChangedHandler.bind(this, 'amount'),
            value: inputs.amount.value,
            placeholder: '0.00',
          }}
        />
        <Input
          label="Date"
          style={styles.rowInput}
          invalid={!inputs.date.isValid}
          textInputConfig={{
            placeholder: 'YYYY-MM-DD',
            maxLength: 10,
            value: inputs.date.value,
            onChangeText: inputChangedHandler.bind(this, 'date'),
          }}
        />
      </View>
      <Input
        label="Description"
        invalid={!inputs.description.isValid}
        textInputConfig={{
          placeholder: 'Enter description',
          multiline: true,
          numberOfLines: 3,
          value: inputs.description.value,
          //autoCorrect: false,
          onChangeText: inputChangedHandler.bind(this, 'description'),
        }}
      />
      {formIsInvalid() && (
        <Text style={styles.errorText}>
          Invalid input - please check your entered data!
        </Text>
      )}
      <View style={styles.buttonContainer}>
        <Button mode="flat" onPress={onCancel} style={styles.button}>
          Cancel
        </Button>
        <Button onPress={submitHandler} style={styles.button}>
          {submitButtonLabel}
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  form: {
    margin: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginVertical: 24,
    textAlign: 'center',
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowInput: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
  errorText: {
    textAlign: 'center',
    margin: 8,
    color: GlobalStyles.colors.error500,
  },
});
