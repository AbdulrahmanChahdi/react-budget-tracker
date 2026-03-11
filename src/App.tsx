import { useEffect, useState } from 'react'
import './App.css'
import Balance from './components/Balance'
import Filter from './components/Filter'
import TransactionForm from './components/TransactionForm'
import TransactionList from './components/TransactionList'

interface Transaction {
  id: number
  title: string
  amount: number
  type: 'income' | 'expense'
  date: string
}

const parseStoredTransactions = (rawValue: string | null): Transaction[] => {
  if (!rawValue) {
    return []
  }

  try {
    const parsedTransactions = JSON.parse(rawValue)

    if (!Array.isArray(parsedTransactions)) {
      return []
    }

    return parsedTransactions
      .map((transaction) => {
        const normalizedAmount = Math.abs(Number(transaction?.amount))
        const normalizedType = transaction?.type === 'income' ? 'income' : 'expense'

        if (!Number.isFinite(normalizedAmount) || normalizedAmount <= 0) {
          return null
        }

        return {
          id: Number(transaction?.id) || Date.now(),
          title: String(transaction?.title ?? '').trim(),
          amount: normalizedAmount,
          type: normalizedType,
          date: String(transaction?.date ?? '')
        }
      })
      .filter((transaction): transaction is Transaction => {
        return Boolean(transaction && transaction.title && transaction.date)
      })
  } catch {
    return []
  }
}

function App() {
  const [transactions, setTransactions] = useState<Transaction[]>(() => parseStoredTransactions(localStorage.getItem('transactions')))

  const [filter, setFilter] = useState<'all' | 'income' | 'expense'>('all')

  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions))
  }, [transactions])

  const addTransaction = (transaction: Transaction) => {
    setTransactions((prevTransactions) => [...prevTransactions, transaction])
  }

  const deleteTransaction = (id: number) => {
    setTransactions((prevTransactions) => prevTransactions.filter((transaction) => transaction.id !== id))
  }

  return (
    <div className="app-container">
      <h1>Budget Tracker</h1>

      <Balance transactions={transactions} />

      <TransactionForm addTransaction={addTransaction} />

      <Filter filter={filter} setFilter={setFilter} />

      <TransactionList
        filter={filter}
        transactions={transactions}
        deleteTransaction={deleteTransaction}
      />
    </div>
  )
}

export default App
