import { StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>PennyPaws</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Saldo w tym miesiącu</Text>
        <Text style={styles.balance}>0,00 zł</Text>

        <View style={styles.row}>
          <View>
            <Text style={styles.label}>Przychody</Text>
            <Text style={styles.income}>+0,00 zł</Text>
          </View>

          <View>
            <Text style={styles.label}>Wydatki</Text>
            <Text style={styles.expense}>-0,00 zł</Text>
          </View>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Ostatnie transakcje</Text>

      <View style={styles.emptyCard}>
        <Text style={styles.emptyText}>
          Nie masz jeszcze żadnych transakcji.
        </Text>
        <Text style={styles.emptyText}>
          Dodaj pierwszą transakcję w zakładce „Dodaj”.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7F6',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#222222',
  },
  card: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 16,
    marginBottom: 28,
  },
  label: {
    fontSize: 14,
    color: '#777777',
    marginBottom: 8,
  },
  balance: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#16865C',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  income: {
    color: '#16865C',
    fontSize: 17,
    fontWeight: '600',
  },
  expense: {
    color: '#D64545',
    fontSize: 17,
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  emptyCard: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 12,
  },
  emptyText: {
    color: '#777777',
    marginBottom: 6,
  },
});