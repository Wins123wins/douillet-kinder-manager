
import React from 'react';
import { cn } from '@/lib/utils';
import { 
  Home, 
  Users, 
  Settings, 
  DollarSign, 
  FileText, 
  Calendar,
  GraduationCap
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  selectedYear: string;
  setSelectedYear: (year: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  selectedYear,
  setSelectedYear
}) => {
  const navItems = [
    { id: 'dashboard', label: 'Tableau de bord', icon: Home },
    { id: 'children', label: 'Enfants', icon: Users },
    { id: 'services', label: 'Services', icon: Settings },
    { id: 'finance', label: 'Finances', icon: DollarSign },
    { id: 'reports', label: 'Rapports', icon: FileText },
  ];

  const years = ['2022', '2023', '2024', '2025'];

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-white shadow-xl border-r border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-2 rounded-lg">
            <GraduationCap className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-800">École Nid Douillet</h1>
            <p className="text-sm text-gray-600">Gestion de maternelle</p>
          </div>
        </div>
      </div>

      <div className="p-4 border-b border-gray-200">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Année scolaire
        </label>
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          {years.map((year) => (
            <option key={year} value={year}>
              {year}-{parseInt(year) + 1}
            </option>
          ))}
        </select>
      </div>

      <nav className="p-4 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200",
                activeTab === item.id
                  ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg"
                  : "text-gray-700 hover:bg-gray-100 hover:text-blue-600"
              )}
            >
              <Icon className="h-5 w-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="absolute bottom-4 left-4 right-4">
        <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg border border-green-200">
          <div className="flex items-center space-x-2">
            <Calendar className="h-5 w-5 text-green-600" />
            <div>
              <p className="text-sm font-medium text-gray-800">Année active</p>
              <p className="text-xs text-gray-600">{selectedYear}-{parseInt(selectedYear) + 1}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
