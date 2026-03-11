import { useState, type FormEvent } from 'react'
import './TransactionForm.css'

interface Transaction {
    id: number
    title: string
    amount: number
    type: 'income' | 'expense'
    date: string
}

interface TransactionFormProps {
    addTransaction: (transaction: Transaction) => void
}

export default function TransactionForm({ addTransaction }: TransactionFormProps) {

    const [title, setTitle] = useState('')
    const [amount, setAmount] = useState('')
    const [type, setType] = useState<'income' | 'expense'>('income')
    const [date, setDate] = useState('')

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        const normalizedAmount = Math.abs(Number(amount.replace(',', '.')))

        if (!title.trim()) {
            alert('Le titre est requis')
            return
        }

        if (!Number.isFinite(normalizedAmount) || normalizedAmount <= 0) {
            alert('Le montant doit être supérieur à 0')
            return
        }

        if (!date) {
            alert('La date est requise')
            return
        }

        addTransaction({
            id: Date.now(),
            title: title.trim(),
            amount: normalizedAmount,
            type,
            date
        })

        setTitle('')
        setAmount('')
        setType('income')
        setDate('')
    }

    return (
        <div className="transaction-form">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Titre</label>
                    <input
                        id="title"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Ex: Salaire"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="amount">Montant</label>
                    <input
                        id="amount"
                        type="number"
                        step="0.01"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="Ex: 1500"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="type">Type</label>
                    <select
                        id="type"
                        value={type}
                        onChange={(e) => setType(e.target.value as 'income' | 'expense')}
                    >
                        <option value="income">Revenu</option>
                        <option value="expense">Dépense</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="date">Date</label>
                    <input
                        id="date"
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                </div>

                <button type="submit">Ajouter</button>
            </form>
        </div>
    )
}
