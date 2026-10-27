import { StyleSheet, Text, View } from 'react-native';

export default function AddTransactionScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dodaj transakcję</Text>

      <View style={styles.card}>
        <Text style={styles.message}>
          Formularz transakcji
        </Text>

        <Text style={styles.description}>
          Tutaj dodamy pola kwoty, kategorii, daty,
          typu transakcji i opisu.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F7F6',
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
  },
  message: {
    fontSize: 17,
    fontWeight: '600',
    marginBottom: 12,
  },
  description: {
    color: '#777777',
    lineHeight: 22,
  },
});