import { useState } from 'react'
import './App.css'

function App() {
  // State to store expenses
  const [expenses, setExpenses] = useState([])

  // State for the form
  const [formData, setFormData] = useState({
    amount: '',
    description: '',
    category: 'food'
  })

  // Function to add expense
  const addExpense = (e) => {
    e.preventDefault()

    if (!formData.amount || !formData.description) {
      alert('Please fill all fields')
      return
    }

    const newExpense = {
      id: Date.now(), // Simple ID for now
      amount: parseFloat(formData.amount),
      description: formData.description,
      category: formData.category,
      date: new Date().toLocaleDateString()
    }

    setExpenses([...expenses, newExpense])

    // Clear form
    setFormData({
      amount: '',
      description: '',
      category: 'food'
    })
  }

  // Calculate total spent
  const totalExpenses = expenses.reduce((total, expense) => total + expense.amount, 0)

  return (
    <div className="app">
      <header className="app-header">
        <h1>💰 I3alanc3</h1>
        <p>Personal Expense Tracker</p>
      </header>

      <main className="main-content">
        {/* Quick Stats */}
        <div className="stats-card">
          <h2>Quick Overview</h2>
          <div className="stat">
            <span className="stat-label">Total Spent:</span>
            <span className="stat-value">${totalExpenses.toFixed(2)}</span>
          </div>
          <div className="stat">
            <span className="stat-label">Total Expenses:</span>
            <span className="stat-value">{expenses.length}</span>
          </div>
        </div>

        {/* Add Expense Form */}
        <div className="form-card">
          <h2>Add New Expense</h2>
          <form onSubmit={addExpense}>
            <div className="form-group">
              <label htmlFor="amount">Amount ($)</label>
              <input
                type="number"
                id="amount"
                step="0.01"
                value={formData.amount}
                onChange={(e) => setFormData({...formData, amount: e.target.value})}
                placeholder="0.00"
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                placeholder="What did you spend on?"
              />
            </div>

            <div className="form-group">
              <label htmlFor="category">Category</label>
              <select
                id="category"
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
              >
                <option value="food">🍕 Food</option>
                <option value="transport">🚗 Transport</option>
                <option value="entertainment">🎬 Entertainment</option>
                <option value="utilities">💡 Utilities</option>
                <option value="shopping">🛒 Shopping</option>
                <option value="other">📦 Other</option>
              </select>
            </div>

            <button type="submit" className="add-btn">
              Add Expense
            </button>
          </form>
        </div>

        {/* Expenses List */}
        <div className="expenses-card">
          <h2>Recent Expenses</h2>
          {expenses.length === 0 ? (
            <p className="no-expenses">No expenses yet. Add your first one! 🎯</p>
          ) : (
            <div className="expenses-list">
              {expenses.map(expense => (
                <div key={expense.id} className="expense-item">
                  <div className="expense-info">
                    <span className="expense-description">{expense.description}</span>
                    <span className="expense-category">{expense.category}</span>
                    <span className="expense-date">{expense.date}</span>
                  </div>
                  <span className="expense-amount">${expense.amount.toFixed(2)}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default App
