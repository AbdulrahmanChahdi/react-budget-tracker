import { useTransactions } from '../hooks/useTransactions'
import './TransactionItem.css'

interface TransactionItemProps {
    id: number
    title: string
    amount: number
    type: 'income' | 'expense'
    date: string
}

export default function TransactionItem({
    id,
    title,
    amount,
    type,
    date
}: TransactionItemProps) {
    const { deleteTransaction } = useTransactions()

    const handleDelete = () => {
        if (confirm('Êtes-vous sûr de vouloir supprimer cette transaction ?')) {
            deleteTransaction(id)
        }
    }

    return (
        <div className="transaction-card">
            <div className="transaction-card-header">
                <h3 className="transaction-card-title">{title}</h3>
                <span className={`type-badge ${type}`}>
                    {type === 'income' ? 'Revenu' : 'Dépense'}
                </span>
            </div>

            <div className="transaction-card-body">
                <div className="transaction-info-item">
                    <span className="transaction-info-label">Montant</span>
                    <span className={`transaction-amount ${type}`}>
                        {type === 'income' ? '+' : '-'}${amount.toFixed(2)}
                    </span>
                </div>
                <div className="transaction-info-item">
                    <span className="transaction-info-label">Date</span>
                    <span className="transaction-info-value">{date}</span>
                </div>
            </div>

            <button
                onClick={handleDelete}
                className="delete-button"
                title="Supprimer cette transaction"
            >
                Supprimer
            </button>
        </div>
    )
}
