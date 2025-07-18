'use client';
import { useState } from 'react';
import { Category, Expense } from '../lib/types';

interface Props {
  onSave: (expense: Omit<Expense, 'id'>) => void;
  initial?: Expense | null;
}

const categories: Category[] = [
  'Food',
  'Transportation',
  'Entertainment',
  'Shopping',
  'Bills',
  'Other',
];

export default function ExpenseForm({ onSave, initial = null }: Props) {
  const [date, setDate] = useState(initial?.date ?? '');
  const [amount, setAmount] = useState(initial?.amount.toString() ?? '');
  const [category, setCategory] = useState<Category>(initial?.category ?? 'Food');
  const [description, setDescription] = useState(initial?.description ?? '');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!date || !amount) {
      setError('Date and amount are required');
      return;
    }
    const num = Number(amount);
    if (isNaN(num) || num <= 0) {
      setError('Amount must be a positive number');
      return;
    }
    onSave({ date, amount: num, category, description });
    setDate('');
    setAmount('');
    setCategory('Food');
    setDescription('');
    setError('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2 p-4 bg-white rounded shadow">
      {error && <p className="text-red-600">{error}</p>}
      <div className="flex flex-col">
        <label className="font-medium">Date</label>
        <input
          type="date"
          className="border rounded p-2"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>
      <div className="flex flex-col">
        <label className="font-medium">Amount</label>
        <input
          type="number"
          step="0.01"
          className="border rounded p-2"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
      </div>
      <div className="flex flex-col">
        <label className="font-medium">Category</label>
        <select
          className="border rounded p-2"
          value={category}
          onChange={(e) => setCategory(e.target.value as Category)}
        >
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col">
        <label className="font-medium">Description</label>
        <input
          type="text"
          className="border rounded p-2"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Save Expense
      </button>
    </form>
  );
}
