import { useState, type FormEvent } from 'react'
import { useTransactions } from '../hooks/useTransactions'
import './TransactionForm.css'

export default function TransactionForm() {
    const { addTransaction } = useTransactions()

    const [title, setTitle] = useState('')
    const [amount, setAmount] = useState('')
    const [type, setType] = useState<'income' | 'expense'>('income')
    const [date, setDate] = useState('')

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()

        // Validation simple
        if (!title.trim()) {
            alert('Le titre est requis')
            return
        }

        if (!amount || parseFloat(amount) <= 0) {
            alert('Le montant doit être supérieur à 0')
            return
        }

        if (!date) {
            alert('La date est requise')
            return
        }

        // Ajout au state global
        addTransaction({
            id: Date.now(),
            title: title.trim(),
            amount: parseFloat(amount),
            type,
            date
        })

        // Réinitialiser le formulaire
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
