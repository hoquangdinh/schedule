'use client';
import { Expense, Category } from '../lib/types';

interface Props {
  expenses: Expense[];
}

export default function Dashboard({ expenses }: Props) {
  const total = expenses.reduce((sum, e) => sum + e.amount, 0);
  const byCategory: Record<Category, number> = {
    Food: 0,
    Transportation: 0,
    Entertainment: 0,
    Shopping: 0,
    Bills: 0,
    Other: 0,
  };
  expenses.forEach((e) => {
    byCategory[e.category] += e.amount;
  });

  const topCategory = Object.entries(byCategory).sort((a, b) => b[1] - a[1])[0];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
      <div className="bg-white p-4 rounded shadow">
        <h3 className="font-medium">Total Spending</h3>
        <p className="text-2xl font-bold">${total.toFixed(2)}</p>
      </div>
      <div className="bg-white p-4 rounded shadow">
        <h3 className="font-medium">Top Category</h3>
        <p className="text-xl">{topCategory ? `${topCategory[0]} - $${topCategory[1].toFixed(2)}` : 'N/A'}</p>
      </div>
      <div className="bg-white p-4 rounded shadow col-span-1 md:col-span-3">
        <h3 className="font-medium mb-2">Spending by Category</h3>
        <div className="space-y-1">
          {Object.entries(byCategory).map(([cat, amt]) => (
            <div key={cat} className="flex items-center">
              <span className="w-24">{cat}</span>
              <div className="flex-1 bg-gray-200 h-3 rounded">
                <div
                  className="bg-blue-500 h-3 rounded"
                  style={{ width: total ? `${(amt / total) * 100}%` : '0%' }}
                />
              </div>
              <span className="ml-2">${amt.toFixed(2)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
