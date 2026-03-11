import TransactionItem from './TransactionItem'
import './TransactionList.css'

interface Transaction {
    id: number
    title: string
    amount: number
    type: 'income' | 'expense'
    date: string
}

interface TransactionListProps {
    filter: 'all' | 'income' | 'expense'
    transactions: Transaction[]
    deleteTransaction: (id: number) => void
}

export default function TransactionList({
    filter,
    transactions,
    deleteTransaction
}: TransactionListProps) {
    const filteredTransactions = transactions.filter((transaction) => {
        if (filter === 'all') {
            return true
        }

        return transaction.type === filter
    })

    return (
        <div className="transaction-list-container">
            <h2>Transactions</h2>

            {filteredTransactions.length === 0 ? (
                <div className="empty-state">
                    <p>Aucune transaction. Ajoutez-en une pour commencer.</p>
                </div>
            ) : (
                <div className="transactions-grid">
                    {filteredTransactions.map((transaction) => (
                        <TransactionItem
                            key={transaction.id}
                            id={transaction.id}
                            title={transaction.title}
                            amount={transaction.amount}
                            type={transaction.type}
                            date={transaction.date}
                            deleteTransaction={deleteTransaction}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}
