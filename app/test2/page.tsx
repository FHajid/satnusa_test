// app/test/page.tsx
'use client';

import { supabase } from '@/lib/supabaseClient';
import { useState, useEffect } from 'react';

interface Person {
  id: number;
  Name: string;  // Note the capital N
  Salary: number; // Note the capital S
}

export default function Test() {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortConfig, setSortConfig] = useState<'asc' | 'desc'>('asc');

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Fetching data from Supabase...');
        const { data, error } = await supabase
          .from('satnusa_test')  // Corrected table name
          .select('*');

        if (error) {
          console.error('Supabase error:', error);
          throw error;
        }

        console.log('Data received:', data);
        setPeople(data || []);
      } catch (err) {
        console.error('Fetch error:', err);
        setError(err instanceof Error ? err.message : 'Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const sortedPeople = [...people].sort((a, b) => {
    return sortConfig === 'asc' ? a.Salary - b.Salary : b.Salary - a.Salary;
  });

  const toggleSort = () => {
    setSortConfig(sortConfig === 'asc' ? 'desc' : 'asc');
  };

  if (loading) {
    return <div className="p-5 text-gray-600">Loading data...</div>;
  }

  if (error) {
    return <div className="p-5 text-red-600">Error: {error}</div>;
  }

  if (people.length === 0) {
    return <div className="p-5 text-gray-600">No data found in the database.</div>;
  }

  return (
    <div className="p-5 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Employee Salaries</h1>
      
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={toggleSort}
              >
                <div className="flex items-center">
                  Salary
                  <span className="ml-1">
                    {sortConfig === 'asc' ? '↑' : '↓'}
                  </span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedPeople.map((person) => (
              <tr key={person.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {person.Name}  {/* Capital N */}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  ${person.Salary?.toLocaleString() ?? 'N/A'}  {/* Capital S and safe navigation */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}