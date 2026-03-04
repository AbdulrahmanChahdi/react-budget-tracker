import { useTransactions } from '../hooks/useTransactions'
import TransactionItem from './TransactionItem'
import './TransactionList.css'

export default function TransactionList() {
    const { transactions } = useTransactions()

    return (
        <div className="transaction-list-container">
            <h2>Transactions</h2>

            {transactions.length === 0 ? (
                <div className="empty-state">
                    <p>Aucune transaction. Ajoutez-en une pour commencer.</p>
                </div>
            ) : (
                <div className="transactions-grid">
                    {transactions.map((transaction) => (
                        <TransactionItem
                            key={transaction.id}
                            id={transaction.id}
                            title={transaction.title}
                            amount={transaction.amount}
                            type={transaction.type}
                            date={transaction.date}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}
