const STORAGE_KEY = 'personal-finance-expenses';

export const getExpenses = () => {
  const expenses = localStorage.getItem(STORAGE_KEY);
    return expenses ? JSON.parse(expenses) : [];
    };

    export const saveExpenses = (expenses) => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
      };

      export const addExpense = (expense) => {
        const expenses = getExpenses();
          const newExpense = {
              ...expense,
                  id: Date.now().toString(),
                      date: expense.date || new Date().toISOString().split('T')[0]
                        };
                          expenses.push(newExpense);
                            saveExpenses(expenses);
                              return newExpense;
                              };

                              export const updateExpense = (id, updatedExpense) => {
                                const expenses = getExpenses();
                                  const index = expenses.findIndex(exp => exp.id === id);
                                    if (index !== -1) {
                                        expenses[index] = { ...updatedExpense, id };
                                            saveExpenses(expenses);
                                                return expenses[index];
                                                  }
                                                    return null;
                                                    };

                                                    export const deleteExpense = (id) => {
                                                      const expenses = getExpenses();
                                                        const filteredExpenses = expenses.filter(exp => exp.id !== id);
                                                          saveExpenses(filteredExpenses);
                                                            return filteredExpenses;
                                                            };