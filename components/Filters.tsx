'use client';
import { Category } from '../lib/types';

interface Props {
  category: string;
  setCategory: (c: string) => void;
  start: string;
  setStart: (d: string) => void;
  end: string;
  setEnd: (d: string) => void;
}

const categories: (Category | 'All')[] = [
  'All',
  'Food',
  'Transportation',
  'Entertainment',
  'Shopping',
  'Bills',
  'Other',
];

export default function Filters({ category, setCategory, start, setStart, end, setEnd }: Props) {
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      <select className="border p-2 rounded" value={category} onChange={(e) => setCategory(e.target.value)}>
        {categories.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
      <input
        type="date"
        className="border p-2 rounded"
        value={start}
        onChange={(e) => setStart(e.target.value)}
      />
      <input
        type="date"
        className="border p-2 rounded"
        value={end}
        onChange={(e) => setEnd(e.target.value)}
      />
    </div>
  );
}
