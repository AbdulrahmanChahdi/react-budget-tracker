import './App.css'
import Balance from './components/Balance'
import TransactionForm from './components/TransactionForm'
import TransactionList from './components/TransactionList'
import { useTransactions } from './hooks/useTransactions'

function App() {
  const { transactions } = useTransactions()

  return (
    <div className="app-container">
      <h1>Budget Tracker</h1>

      <Balance transactions={transactions} />

      <TransactionForm />

      <TransactionList />
    </div>
  )
}

export default App
