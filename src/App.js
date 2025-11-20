import React, { useState, useEffect } from 'react';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import Dashboard from './components/Dashboard';
import Charts from './components/Charts';
import { getExpenses, addExpense, updateExpense, deleteExpense } from './utils/storage';

function App() {
  const [expenses, setExpenses] = useState([]);
    const [editingExpense, setEditingExpense] = useState(null);
      const [filters, setFilters] = useState({
          category: '',
              startDate: '',
                  endDate: ''
                    });
                      const [sortBy, setSortBy] = useState('date-desc');

                        useEffect(() => {
                            setExpenses(getExpenses());
                              }, []);

                                const handleAddExpense = (expenseData) => {
                                    const newExpense = addExpense(expenseData);
                                        setExpenses(getExpenses());
                                          };

                                            const handleEditExpense = (expense) => {
                                                setEditingExpense(expense);
                                                  };

                                                    const handleUpdateExpense = (expenseData) => {
                                                        if (editingExpense) {
                                                              updateExpense(editingExpense.id, expenseData);
                                                                    setExpenses(getExpenses());
                                                                          setEditingExpense(null);
                                                                              }
                                                                                };

                                                                                  const handleDeleteExpense = (id) => {
                                                                                      if (window.confirm('Are you sure you want to delete this expense?')) {
                                                                                            deleteExpense(id);
                                                                                                  setExpenses(getExpenses());
                                                                                                      }
                                                                                                        };

                                                                                                          const handleFilterChange = (filterType, value) => {
                                                                                                              setFilters(prev => ({
                                                                                                                    ...prev,
                                                                                                                          [filterType]: value
                                                                                                                              }));
                                                                                                                                };

                                                                                                                                  return (
                                                                                                                                      <div className="app">
                                                                                                                                            <div className="header">
                                                                                                                                                    <h1>💰 Personal Finance Tracker</h1>
                                                                                                                                                            <p>Track your expenses and manage your budget effectively</p>
                                                                                                                                                                  </div>

                                                                                                                                                                        <div className="grid-container">
                                                                                                                                                                                <div>
                                                                                                                                                                                          <ExpenseForm
                                                                                                                                                                                                      expense={editingExpense}
                                                                                                                                                                                                                  onSave={editingExpense ? handleUpdateExpense : handleAddExpense}
                                                                                                                                                                                                                              onCancel={() => setEditingExpense(null)}
                                                                                                                                                                                                                                        />
                                                                                                                                                                                                                                                  <Dashboard expenses={expenses} />
                                                                                                                                                                                                                                                          </div>
                                                                                                                                                                                                                                                                  
                                                                                                                                                                                                                                                                          <ExpenseList
                                                                                                                                                                                                                                                                                    expenses={expenses}
                                                                                                                                                                                                                                                                                              onEdit={handleEditExpense}
                                                                                                                                                                                                                                                                                                        onDelete={handleDeleteExpense}
                                                                                                                                                                                                                                                                                                                  filters={filters}
                                                                                                                                                                                                                                                                                                                            onFilterChange={handleFilterChange}
                                                                                                                                                                                                                                                                                                                                      sortBy={sortBy}
                                                                                                                                                                                                                                                                                                                                                onSortChange={setSortBy}
                                                                                                                                                                                                                                                                                                                                                        />
                                                                                                                                                                                                                                                                                                                                                              </div>

                                                                                                                                                                                                                                                                                                                                                                    <Charts expenses={expenses} />
                                                                                                                                                                                                                                                                                                                                                                        </div>
                                                                                                                                                                                                                                                                                                                                                                          );
                                                                                                                                                                                                                                                                                                                                                                          }

                                                                                                                                                                                                                                                                                                                                                                          export default App;