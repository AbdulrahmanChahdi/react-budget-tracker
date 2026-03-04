import './App.css'
import TransactionForm from './components/TransactionForm'
import TransactionList from './components/TransactionList'

function App() {
  return (
    <div className="app-container">
      <h1>Budget Tracker</h1>

      <TransactionForm />

      <TransactionList />
    </div>
  )
}

export default App
