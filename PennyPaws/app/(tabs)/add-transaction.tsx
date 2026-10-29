import { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {
  TransactionType,
  useTransactions,
} from '../../context/TransactionsContext';

const categories = [
  'Jedzenie',
  'Transport',
  'Zakupy',
  'Rachunki',
  'Rozrywka',
  'Zdrowie',
  'Wynagrodzenie',
  'Inne',
];

export default function AddTransactionScreen() {
  const { addTransaction } = useTransactions();

  const [type, setType] = useState<TransactionType>('expense');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Jedzenie');
  const [date, setDate] = useState(
    new Date().toISOString().slice(0, 10)
  );
  const [description, setDescription] = useState('');

  function handleAddTransaction() {
    const numericAmount = Number(amount.replace(',', '.'));

    if (!amount.trim() || !Number.isFinite(numericAmount) || numericAmount <= 0) {
      Alert.alert('Błędna kwota', 'Wpisz kwotę większą od zera.');
      return;
    }

    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      Alert.alert('Błędna data', 'Wpisz datę w formacie RRRR-MM-DD.');
      return;
    }

    const parsedDate = new Date(`${date}T12:00:00`);

    if (
      Number.isNaN(parsedDate.getTime()) ||
      parsedDate.toISOString().slice(0, 10) !== date
    ) {
      Alert.alert('Błędna data', 'Sprawdź wpisaną datę.');
      return;
    }

    addTransaction({
      amount: numericAmount,
      category,
      date,
      type,
      description: description.trim(),
    });

    setAmount('');
    setDescription('');
    setDate(new Date().toISOString().slice(0, 10));
    setCategory(type === 'income' ? 'Wynagrodzenie' : 'Jedzenie');

    Alert.alert('Gotowe!', 'Transakcja została dodana.');
  }

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.title}>Dodaj transakcję</Text>

        <Text style={styles.label}>Rodzaj transakcji</Text>

        <View style={styles.row}>
          <Pressable
            style={[
              styles.typeButton,
              type === 'expense' && styles.expenseSelected,
            ]}
            onPress={() => {
              setType('expense');
              setCategory('Jedzenie');
            }}
          >
            <Text
              style={[
                styles.typeText,
                type === 'expense' && styles.selectedText,
              ]}
            >
              Wydatek
            </Text>
          </Pressable>

          <Pressable
            style={[
              styles.typeButton,
              type === 'income' && styles.incomeSelected,
            ]}
            onPress={() => {
              setType('income');
              setCategory('Wynagrodzenie');
            }}
          >
            <Text
              style={[
                styles.typeText,
                type === 'income' && styles.selectedText,
              ]}
            >
              Przychód
            </Text>
          </Pressable>
        </View>

        <Text style={styles.label}>Kwota (zł)</Text>
        <TextInput
          style={styles.input}
          value={amount}
          onChangeText={setAmount}
          placeholder="Np. 45,99"
          keyboardType="decimal-pad"
        />

        <Text style={styles.label}>Kategoria</Text>
        <View style={styles.categories}>
          {categories.map((item) => (
            <Pressable
              key={item}
              style={[
                styles.categoryButton,
                category === item && styles.categorySelected,
              ]}
              onPress={() => setCategory(item)}
            >
              <Text
                style={[
                  styles.categoryText,
                  category === item && styles.selectedText,
                ]}
              >
                {item}
              </Text>
            </Pressable>
          ))}
        </View>

        <Text style={styles.label}>Data (RRRR-MM-DD)</Text>
        <TextInput
          style={styles.input}
          value={date}
          onChangeText={setDate}
          placeholder="2026-10-29"
          keyboardType="numbers-and-punctuation"
          autoCapitalize="none"
        />

        <Text style={styles.label}>Opis (opcjonalnie)</Text>
        <TextInput
          style={[styles.input, styles.descriptionInput]}
          value={description}
          onChangeText={setDescription}
          placeholder="Np. zakupy w sklepie"
          multiline
        />

        <Pressable
          style={styles.addButton}
          onPress={handleAddTransaction}
        >
          <Text style={styles.addButtonText}>Dodaj transakcję</Text>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  container: { flex: 1, backgroundColor: '#F5F7F6' },
  content: { padding: 20, paddingBottom: 40 },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#222222',
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 8,
    marginTop: 16,
  },
  row: { flexDirection: 'row', gap: 12 },
  typeButton: {
    flex: 1,
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DDDDDD',
  },
  expenseSelected: { backgroundColor: '#D64545', borderColor: '#D64545' },
  incomeSelected: { backgroundColor: '#16865C', borderColor: '#16865C' },
  typeText: { fontWeight: '600', color: '#333333' },
  selectedText: { color: '#FFFFFF' },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  categories: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  categoryButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#DDDDDD',
  },
  categorySelected: { backgroundColor: '#16865C', borderColor: '#16865C' },
  categoryText: { color: '#333333' },
  descriptionInput: { minHeight: 80, textAlignVertical: 'top' },
  addButton: {
    backgroundColor: '#16865C',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 28,
  },
  addButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' },
});