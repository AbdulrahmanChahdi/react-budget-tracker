import './Filter.css'

export default function Filter({ filter, setFilter }) {
    return (
        <section className="filter-container">
            <div className="filter-buttons" role="group" aria-label="Filtrer les transactions">
                <button
                    type="button"
                    className={`filter-button ${filter === 'all' ? 'active' : ''}`}
                    onClick={() => setFilter('all')}
                >
                    Tous
                </button>
                <button
                    type="button"
                    className={`filter-button ${filter === 'income' ? 'active' : ''}`}
                    onClick={() => setFilter('income')}
                >
                    Revenus
                </button>
                <button
                    type="button"
                    className={`filter-button ${filter === 'expense' ? 'active' : ''}`}
                    onClick={() => setFilter('expense')}
                >
                    Dépenses
                </button>
            </div>
        </section>
    )
}
