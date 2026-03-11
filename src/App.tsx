import { useState } from 'react'
import './App.css'
import Balance from './components/Balance'
import Filter from './components/Filter'
import TransactionForm from './components/TransactionForm'
import TransactionList from './components/TransactionList'
import { useTransactions } from './hooks/useTransactions'

function App() {
  const { transactions } = useTransactions()
  const [filter, setFilter] = useState<'all' | 'income' | 'expense'>('all')

  return (
    <div className="app-container">
      <h1>Budget Tracker</h1>

      <Balance transactions={transactions} />

      <TransactionForm />

      <Filter filter={filter} setFilter={setFilter} />

      <TransactionList filter={filter} />
    </div>
  )
}

export default App
