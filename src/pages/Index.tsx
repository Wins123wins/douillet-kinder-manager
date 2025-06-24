
import React, { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { Dashboard } from '@/components/Dashboard';
import { Children } from '@/components/Children';
import { Services } from '@/components/Services';
import { Finance } from '@/components/Finance';
import { Reports } from '@/components/Reports';

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedYear, setSelectedYear] = useState('2024');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard selectedYear={selectedYear} />;
      case 'children':
        return <Children selectedYear={selectedYear} />;
      case 'services':
        return <Services selectedYear={selectedYear} />;
      case 'finance':
        return <Finance selectedYear={selectedYear} />;
      case 'reports':
        return <Reports selectedYear={selectedYear} />;
      default:
        return <Dashboard selectedYear={selectedYear} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="flex">
        <Sidebar 
          activeTab={activeTab} 
          setActiveTab={setActiveTab}
          selectedYear={selectedYear}
          setSelectedYear={setSelectedYear}
        />
        <main className="flex-1 ml-64">
          <div className="p-8">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
