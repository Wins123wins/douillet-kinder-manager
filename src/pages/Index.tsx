
import React, { useState } from 'react';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/AppSidebar';
import { Dashboard } from '@/components/Dashboard';
import { Children } from '@/components/Children';
import { Services } from '@/components/Services';
import { Finance } from '@/components/Finance';
import { Reports } from '@/components/Reports';

const Index = () => {
  const [selectedYear, setSelectedYear] = useState('2024');

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-blue-50 to-indigo-100">
        <AppSidebar />
        <main className="flex-1 p-4 md:p-6">
          <SidebarTrigger className="mb-4" />
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Tableau de bord</h1>
            <div className="flex items-center space-x-4">
              <label className="text-sm font-medium text-gray-700">
                Année scolaire:
              </label>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="2022">2022-2023</option>
                <option value="2023">2023-2024</option>
                <option value="2024">2024-2025</option>
                <option value="2025">2025-2026</option>
              </select>
            </div>
          </div>
          <Dashboard selectedYear={selectedYear} />
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Index;
