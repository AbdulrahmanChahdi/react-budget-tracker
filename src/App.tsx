import './App.css'
import { useTransactions } from './context/TransactionContext'

function App() {
  const { transactions } = useTransactions()

  return (
    <div>
      <h1>Budget Tracker</h1>
      {transactions.map((transaction) => (
        <div key={transaction.id}>
          <p>{transaction.title} - ${transaction.amount}</p>
        </div>
      ))}
    </div>
  )
}

export default App
