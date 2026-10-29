import { Tabs } from 'expo-router';
import { TransactionsProvider } from '../../context/TransactionsContext';

export default function TabLayout() {
  return (
    <TransactionsProvider>
      <Tabs
        screenOptions={{
          headerStyle: { backgroundColor: '#FFFFFF' },
          headerTintColor: '#222222',
          tabBarActiveTintColor: '#16865C',
          tabBarInactiveTintColor: '#888888',
          tabBarStyle: { backgroundColor: '#FFFFFF' },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{ title: 'Start', tabBarLabel: 'Start' }}
        />

        <Tabs.Screen
          name="transactions"
          options={{
            title: 'Transakcje',
            tabBarLabel: 'Transakcje',
          }}
        />

        <Tabs.Screen
          name="add-transaction"
          options={{
            title: 'Dodaj transakcję',
            tabBarLabel: 'Dodaj',
          }}
        />

        <Tabs.Screen
          name="statistics"
          options={{
            title: 'Statystyki',
            tabBarLabel: 'Statystyki',
          }}
        />
      </Tabs>
    </TransactionsProvider>
  );
}