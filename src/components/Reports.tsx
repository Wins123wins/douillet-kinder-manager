
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Download, Calendar, Users, DollarSign, TrendingUp } from 'lucide-react';

interface ReportsProps {
  selectedYear: string;
}

export const Reports: React.FC<ReportsProps> = ({ selectedYear }) => {
  const reportTypes = [
    {
      id: 1,
      title: 'Rapport mensuel des inscriptions',
      description: 'Liste complète des enfants inscrits avec détails',
      icon: Users,
      color: 'bg-blue-500',
      lastGenerated: '15 Déc 2024'
    },
    {
      id: 2,
      title: 'Rapport financier',
      description: 'Bilan des revenus et dépenses mensuelles',
      icon: DollarSign,
      color: 'bg-green-500',
      lastGenerated: '14 Déc 2024'
    },
    {
      id: 3,
      title: 'Rapport de présence',
      description: 'Statistiques de présence par enfant et par service',
      icon: Calendar,
      color: 'bg-purple-500',
      lastGenerated: '13 Déc 2024'
    },
    {
      id: 4,
      title: 'Rapport des services',
      description: 'Utilisation et rentabilité des services proposés',
      icon: TrendingUp,
      color: 'bg-orange-500',
      lastGenerated: '12 Déc 2024'
    }
  ];

  const quickStats = [
    { label: 'Rapports générés ce mois', value: '24', color: 'text-blue-600' },
    { label: 'Exports réalisés', value: '18', color: 'text-green-600' },
    { label: 'Dernière sauvegarde', value: 'Aujourd\'hui', color: 'text-purple-600' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Rapports et exports</h1>
          <p className="text-gray-600">Génération de rapports pour l'année {selectedYear}-{parseInt(selectedYear) + 1}</p>
        </div>
        <Button className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 flex items-center space-x-2">
          <Download className="h-4 w-4" />
          <span>Export global</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {quickStats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="text-center">
                <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                <p className="text-sm text-gray-600">{stat.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reportTypes.map((report) => {
          const Icon = report.icon;
          return (
            <Card key={report.id} className="hover:shadow-lg transition-shadow duration-200">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className={`${report.color} p-2 rounded-lg`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{report.title}</CardTitle>
                    <p className="text-sm text-gray-500">Dernière génération: {report.lastGenerated}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">{report.description}</p>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" className="flex-1 flex items-center space-x-2">
                    <FileText className="h-4 w-4" />
                    <span>Générer PDF</span>
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1 flex items-center space-x-2">
                    <Download className="h-4 w-4" />
                    <span>Export Excel</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Historique des exports</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { file: 'rapport_inscriptions_dec_2024.pdf', date: '15 Déc 2024, 14:30', size: '2.4 MB' },
              { file: 'rapport_financier_nov_2024.xlsx', date: '30 Nov 2024, 16:45', size: '1.8 MB' },
              { file: 'statistiques_presence_oct_2024.pdf', date: '31 Oct 2024, 09:15', size: '3.1 MB' },
              { file: 'export_services_sep_2024.xlsx', date: '30 Sep 2024, 11:20', size: '1.2 MB' }
            ].map((export_, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <FileText className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="font-medium text-gray-900">{export_.file}</p>
                    <p className="text-sm text-gray-500">{export_.date} • {export_.size}</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="flex items-center space-x-2">
                  <Download className="h-4 w-4" />
                  <span>Télécharger</span>
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
