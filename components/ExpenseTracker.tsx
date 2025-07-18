'use client';
import { useEffect, useState } from 'react';
import { Expense } from '../lib/types';
import ExpenseForm from './ExpenseForm';
import ExpenseList from './ExpenseList';
import Dashboard from './Dashboard';
import ExportCSV from './ExportCSV';
import Filters from './Filters';

export default function ExpenseTracker() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [editing, setEditing] = useState<Expense | null>(null);
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    const stored = localStorage.getItem('expenses');
    if (stored) {
      setExpenses(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [expenses]);

  const saveExpense = (e: Omit<Expense, 'id'>) => {
    if (editing) {
      setExpenses((prev) => prev.map((ex) => (ex.id === editing.id ? { ...editing, ...e } : ex)));
      setEditing(null);
    } else {
      setExpenses((prev) => [...prev, { ...e, id: Date.now().toString() }]);
    }
  };

  const handleDelete = (id: string) => {
    setExpenses((prev) => prev.filter((e) => e.id !== id));
  };

  const handleEdit = (id: string) => {
    const ex = expenses.find((e) => e.id === id);
    if (ex) setEditing(ex);
  };

  const filtered = expenses.filter((e) => {
    if (categoryFilter !== 'All' && e.category !== categoryFilter) return false;
    if (startDate && new Date(e.date) < new Date(startDate)) return false;
    if (endDate && new Date(e.date) > new Date(endDate)) return false;
    return true;
  });

  return (
    <div className="space-y-4 p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-center">Expense Tracker</h1>
      <ExpenseForm onSave={saveExpense} initial={editing} />
      <Filters
        category={categoryFilter}
        setCategory={setCategoryFilter}
        start={startDate}
        setStart={setStartDate}
        end={endDate}
        setEnd={setEndDate}
      />
      <Dashboard expenses={filtered} />
      <ExpenseList expenses={filtered} onDelete={handleDelete} onEdit={handleEdit} />
      <div className="flex justify-end">
        <ExportCSV expenses={filtered} />
      </div>
    </div>
  );
}
