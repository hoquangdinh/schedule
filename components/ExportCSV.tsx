'use client';
import { Expense } from '../lib/types';

interface Props {
  expenses: Expense[];
}

export default function ExportCSV({ expenses }: Props) {
  const handleExport = () => {
    const header = 'Date,Amount,Category,Description\n';
    const rows = expenses
      .map((e) =>
        [e.date, e.amount.toFixed(2), e.category, e.description.replace(/,/g, ' ')].join(',')
      )
      .join('\n');
    const blob = new Blob([header + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'expenses.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <button onClick={handleExport} className="bg-green-600 text-white px-4 py-2 rounded">
      Export CSV
    </button>
  );
}
