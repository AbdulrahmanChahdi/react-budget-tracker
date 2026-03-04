import './App.css'
import { useTransactions } from './hooks/useTransactions'
import TransactionForm from './components/TransactionForm'

function App() {
  const { transactions } = useTransactions()

  return (
    <div className="app-container">
      <h1>💰 Budget Tracker</h1>

      <TransactionForm />

      <div>
        <h2>Transactions récentes</h2>
        {transactions.length === 0 ? (
          <p style={{ color: '#a0aec0', fontSize: '16px' }}>Aucune transaction. Ajoutez-en une pour commencer.</p>
        ) : (
          <div className="transactions-list">
            {transactions.map((transaction) => (
              <div key={transaction.id} className="transaction-item">
                <div className="transaction-title">{transaction.title}</div>
                <div className={`transaction-amount ${transaction.type}`}>
                  {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toFixed(2)}
                </div>
                <div className="transaction-meta">
                  <span className={`transaction-type ${transaction.type}`}>
                    {transaction.type === 'income' ? '📈 Revenu' : '📉 Dépense'}
                  </span>
                  <span className="transaction-date">{transaction.date}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default App
