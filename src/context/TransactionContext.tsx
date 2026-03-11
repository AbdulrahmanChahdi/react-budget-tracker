import { createContext, useContext, useState, type ReactNode } from 'react'

interface Transaction {
    id: number
    title: string
    amount: number
    type: 'income' | 'expense'
    date: string
}

interface TransactionContextType {
    transactions: Transaction[]
    setTransactions: (transactions: Transaction[]) => void
    addTransaction: (transaction: Transaction) => void
    deleteTransaction: (id: number) => void
}

export const TransactionContext = createContext<TransactionContextType | undefined>(undefined)

export function TransactionProvider({ children }: { children: ReactNode }) {
    const [transactions, setTransactions] = useState<Transaction[]>(() => [
        {
            id: Date.now(),
            title: "Salaire",
            amount: 1500,
            type: "income",
            date: "2026-02-26"
        }
    ])

    const addTransaction = (transaction: Transaction) => {
        setTransactions([...transactions, transaction])
    }

    const deleteTransaction = (id: number) => {
        setTransactions(transactions.filter(t => t.id !== id))
    }

    return (
        <TransactionContext.Provider value={{ transactions, setTransactions, addTransaction, deleteTransaction }}>
            {children}
        </TransactionContext.Provider>
    )
}

// Hook is exported from hooks/useTransactions.ts
