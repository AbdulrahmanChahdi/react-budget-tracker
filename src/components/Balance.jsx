import './Balance.css'

export default function Balance({ transactions = [] }) {
    const { totalIncome, totalExpense, balance } = transactions.reduce(
        (acc, transaction) => {
            if (transaction.type === 'income') {
                acc.totalIncome += transaction.amount
                acc.balance += transaction.amount
            }

            if (transaction.type === 'expense') {
                acc.totalExpense += transaction.amount
                acc.balance -= transaction.amount
            }

            return acc
        },
        { totalIncome: 0, totalExpense: 0, balance: 0 }
    )

    const formatAmount = (value) =>
        new Intl.NumberFormat('fr-FR', {
            style: 'currency',
            currency: 'EUR',
            minimumFractionDigits: 2
        }).format(value)

    return (
        <section className="balance-container">
            <div className="balance-header">
                <h2>Vue d'ensemble</h2>
                <p>Suivi en temps reel de ton budget</p>
            </div>

            <div className="balance-cards">
                <article className="balance-card income">
                    <span className="balance-label">Revenus</span>
                    <strong className="balance-value">{formatAmount(totalIncome)}</strong>
                </article>

                <article className="balance-card expense">
                    <span className="balance-label">Depenses</span>
                    <strong className="balance-value">{formatAmount(totalExpense)}</strong>
                </article>

                <article className={`balance-card final ${balance >= 0 ? 'positive' : 'negative'}`}>
                    <span className="balance-label">Solde final</span>
                    <strong className="balance-value">{formatAmount(balance)}</strong>
                </article>
            </div>
        </section>
    )
}
