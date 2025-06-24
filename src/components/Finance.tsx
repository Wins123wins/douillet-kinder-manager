
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown, DollarSign, CreditCard, PieChart, BarChart3 } from 'lucide-react';

interface FinanceProps {
  selectedYear: string;
}

export const Finance: React.FC<FinanceProps> = ({ selectedYear }) => {
  const financialData = {
    totalIncome: 18450,
    totalExpenses: 12300,
    netProfit: 6150,
    monthlyIncome: 15240,
    monthlyExpenses: 9800
  };

  const incomeBreakdown = [
    { category: 'Frais de scolarité', amount: 12500, percentage: 68 },
    { category: 'Services supplémentaires', amount: 3200, percentage: 17 },
    { category: 'Repas', amount: 2100, percentage: 11 },
    { category: 'Activités', amount: 740, percentage: 4 }
  ];

  const expenseBreakdown = [
    { category: 'Salaires', amount: 7500, percentage: 61 },
    { category: 'Fournitures', amount: 1800, percentage: 15 },
    { category: 'Maintenance', amount: 1200, percentage: 10 },
    { category: 'Alimentation', amount: 1000, percentage: 8 },
    { category: 'Autres', amount: 800, percentage: 6 }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Finances</h1>
          <p className="text-gray-600">Vue d'ensemble financière - {selectedYear}</p>
        </div>
        <div className="bg-white px-4 py-2 rounded-lg shadow-sm border">
          <p className="text-sm text-gray-600">Bénéfice net</p>
          <p className="text-2xl font-bold text-green-600">€{financialData.netProfit.toLocaleString()}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100">Revenus totaux</p>
                <p className="text-2xl font-bold">€{financialData.totalIncome.toLocaleString()}</p>
                <p className="text-sm text-green-100 mt-1">+12% ce mois</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-100" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-red-500 to-red-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-100">Dépenses totales</p>
                <p className="text-2xl font-bold">€{financialData.totalExpenses.toLocaleString()}</p>
                <p className="text-sm text-red-100 mt-1">+3% ce mois</p>
              </div>
              <TrendingDown className="h-8 w-8 text-red-100" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100">Revenus mensuels</p>
                <p className="text-2xl font-bold">€{financialData.monthlyIncome.toLocaleString()}</p>
                <p className="text-sm text-blue-100 mt-1">Décembre</p>
              </div>
              <DollarSign className="h-8 w-8 text-blue-100" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100">Dépenses mensuelles</p>
                <p className="text-2xl font-bold">€{financialData.monthlyExpenses.toLocaleString()}</p>
                <p className="text-sm text-purple-100 mt-1">Décembre</p>
              </div>
              <CreditCard className="h-8 w-8 text-purple-100" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <PieChart className="h-5 w-5 text-green-500" />
              <span>Répartition des revenus</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {incomeBreakdown.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-700">{item.category}</p>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                      <div
                        className="bg-green-500 h-2 rounded-full"
                        style={{ width: `${item.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="ml-4 text-right">
                    <p className="text-sm font-bold text-gray-900">€{item.amount.toLocaleString()}</p>
                    <p className="text-xs text-gray-500">{item.percentage}%</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5 text-red-500" />
              <span>Répartition des dépenses</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {expenseBreakdown.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-700">{item.category}</p>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                      <div
                        className="bg-red-500 h-2 rounded-full"
                        style={{ width: `${item.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="ml-4 text-right">
                    <p className="text-sm font-bold text-gray-900">€{item.amount.toLocaleString()}</p>
                    <p className="text-xs text-gray-500">{item.percentage}%</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
