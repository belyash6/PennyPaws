import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useTransactions } from '../../context/TransactionsContext';

function formatMoney(amount: number) {
  return `${amount.toFixed(2).replace('.', ',')} zł`;
}

export default function HomeScreen() {
  const { transactions } = useTransactions();

  const currentMonth = new Date().toISOString().slice(0, 7);

  const monthlyTransactions = transactions.filter((transaction) =>
    transaction.date.startsWith(currentMonth)
  );

  const income = monthlyTransactions
    .filter((transaction) => transaction.type === 'income')
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  const expenses = monthlyTransactions
    .filter((transaction) => transaction.type === 'expense')
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  const balance = income - expenses;

  const recentTransactions = [...transactions]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 5);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>PennyPaws</Text>
      <Text style={styles.subtitle}>Twoje finanse w jednym miejscu</Text>

      <View style={styles.balanceCard}>
        <Text style={styles.label}>Saldo w tym miesiącu</Text>
        <Text style={styles.balance}>{formatMoney(balance)}</Text>

        <View style={styles.row}>
          <View>
            <Text style={styles.label}>Przychody</Text>
            <Text style={styles.income}>+{formatMoney(income)}</Text>
          </View>

          <View>
            <Text style={styles.label}>Wydatki</Text>
            <Text style={styles.expense}>-{formatMoney(expenses)}</Text>
          </View>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Ostatnie transakcje</Text>

      {recentTransactions.length === 0 ? (
        <View style={styles.card}>
          <Text style={styles.muted}>
            Nie masz jeszcze transakcji. Dodaj pierwszą w zakładce „Dodaj”.
          </Text>
        </View>
      ) : (
        recentTransactions.map((transaction) => (
          <View key={transaction.id} style={styles.card}>
            <View style={styles.transactionRow}>
              <View style={styles.transactionDetails}>
                <Text style={styles.category}>{transaction.category}</Text>
                <Text style={styles.muted}>{transaction.date}</Text>
              </View>

              <Text
                style={
                  transaction.type === 'income'
                    ? styles.income
                    : styles.expense
                }
              >
                {transaction.type === 'income' ? '+' : '-'}
                {formatMoney(transaction.amount)}
              </Text>
            </View>
          </View>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F7F6', padding: 20 },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#222222',
    marginTop: 8,
  },
  subtitle: { color: '#777777', marginTop: 6, marginBottom: 24 },
  balanceCard: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 16,
    marginBottom: 28,
  },
  label: { color: '#777777', marginBottom: 8 },
  balance: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#16865C',
    marginBottom: 24,
  },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  income: { color: '#16865C', fontWeight: 'bold' },
  expense: { color: '#D64545', fontWeight: 'bold' },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#222222',
    marginBottom: 12,
  },
  card: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 10,
  },
  muted: { color: '#777777' },
  transactionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  transactionDetails: { flex: 1, marginRight: 8 },
  category: { fontSize: 16, fontWeight: '600', marginBottom: 4 },
});