import {
  Alert,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Transaction, useTransactions } from '../../context/TransactionsContext';

function formatMoney(amount: number) {
  return `${amount.toFixed(2).replace('.', ',')} zł`;
}

export default function TransactionsScreen() {
  const { transactions, deleteTransaction } = useTransactions();

  function confirmDelete(transaction: Transaction) {
    Alert.alert(
      'Usunąć transakcję?',
      `${transaction.category} — ${formatMoney(transaction.amount)}`,
      [
        { text: 'Anuluj', style: 'cancel' },
        {
          text: 'Usuń',
          style: 'destructive',
          onPress: () => deleteTransaction(transaction.id),
        },
      ]
    );
  }

  const sortedTransactions = [...transactions].sort((a, b) =>
    b.date.localeCompare(a.date)
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Transakcje</Text>

      {sortedTransactions.length === 0 ? (
        <View style={styles.emptyCard}>
          <Text style={styles.emptyTitle}>Brak transakcji</Text>
          <Text style={styles.muted}>
            Przejdź do zakładki „Dodaj” i zapisz swoją pierwszą transakcję.
          </Text>
        </View>
      ) : (
        <FlatList
          data={sortedTransactions}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={styles.details}>
                <Text style={styles.category}>{item.category}</Text>
                <Text style={styles.muted}>{item.date}</Text>
                {item.description ? (
                  <Text style={styles.description}>{item.description}</Text>
                ) : null}
              </View>

              <View style={styles.rightSide}>
                <Text
                  style={[
                    styles.amount,
                    item.type === 'income' ? styles.income : styles.expense,
                  ]}
                >
                  {item.type === 'income' ? '+' : '-'}
                  {formatMoney(item.amount)}
                </Text>

                <Pressable
                  onPress={() => confirmDelete(item)}
                  style={styles.deleteButton}
                  accessibilityRole="button"
                  accessibilityLabel="Usuń transakcję"
                >
                  <Text style={styles.deleteText}>Usuń</Text>
                </Pressable>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F7F6', padding: 20 },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#222222',
  },
  list: { paddingBottom: 30 },
  emptyCard: { backgroundColor: '#FFFFFF', padding: 20, borderRadius: 16 },
  emptyTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 8 },
  muted: { color: '#777777', lineHeight: 21 },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 14,
    marginBottom: 12,
  },
  details: { flex: 1, paddingRight: 8 },
  category: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222222',
    marginBottom: 4,
  },
  description: { color: '#555555', marginTop: 6 },
  rightSide: { alignItems: 'flex-end' },
  amount: { fontSize: 15, fontWeight: 'bold' },
  income: { color: '#16865C' },
  expense: { color: '#D64545' },
  deleteButton: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    marginTop: 8,
    backgroundColor: '#FCE8E8',
    borderRadius: 8,
  },
  deleteText: { color: '#B42323', fontWeight: '600' },
});