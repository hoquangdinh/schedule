'use client';
import { Expense } from '../lib/types';

interface Props {
  expenses: Expense[];
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
}

export default function ExpenseList({ expenses, onDelete, onEdit }: Props) {
  return (
    <table className="min-w-full bg-white rounded shadow text-sm">
      <thead>
        <tr>
          <th className="p-2">Date</th>
          <th className="p-2">Amount</th>
          <th className="p-2">Category</th>
          <th className="p-2">Description</th>
          <th className="p-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {expenses.map((e) => (
          <tr key={e.id} className="border-t">
            <td className="p-2">{new Date(e.date).toLocaleDateString()}</td>
            <td className="p-2">${e.amount.toFixed(2)}</td>
            <td className="p-2">{e.category}</td>
            <td className="p-2">{e.description}</td>
            <td className="p-2 space-x-2">
              <button
                onClick={() => onEdit(e.id)}
                className="text-blue-600 hover:underline"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(e.id)}
                className="text-red-600 hover:underline"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
