
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Search, Users, Calendar, Phone, Mail, Download, Upload } from 'lucide-react';

interface ChildrenProps {
  selectedYear: string;
}

export const Children: React.FC<ChildrenProps> = ({ selectedYear }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showEnrollmentForm, setShowEnrollmentForm] = useState(false);

  const children = [
    {
      id: 1,
      name: 'Emma Martin',
      birthdate: '2019-03-15',
      age: '4 ans 9 mois',
      level: 'Moyenne Section',
      parent: 'Sophie Martin',
      phone: '06 12 34 56 78',
      email: 'sophie.martin@email.com',
      status: 'Actif'
    },
    {
      id: 2,
      name: 'Lucas Dubois',
      birthdate: '2020-07-22',
      age: '3 ans 5 mois',
      level: 'Petite Section',
      parent: 'Marie Dubois',
      phone: '06 98 76 54 32',
      email: 'marie.dubois@email.com',
      status: 'Actif'
    },
    {
      id: 3,
      name: 'Chloé Bernard',
      birthdate: '2018-11-08',
      age: '5 ans 1 mois',
      level: 'Grande Section',
      parent: 'Pierre Bernard',
      phone: '06 11 22 33 44',
      email: 'pierre.bernard@email.com',
      status: 'Actif'
    }
  ];

  const filteredChildren = children.filter(child =>
    child.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    child.parent.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestion des enfants</h1>
          <p className="text-gray-600">Année scolaire {selectedYear}-{parseInt(selectedYear) + 1}</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" className="flex items-center space-x-2">
            <Upload className="h-4 w-4" />
            <span>Importer</span>
          </Button>
          <Button variant="outline" className="flex items-center space-x-2">
            <Download className="h-4 w-4" />
            <span>Exporter</span>
          </Button>
          <Button 
            onClick={() => setShowEnrollmentForm(true)}
            className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 flex items-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span>Nouvelle inscription</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <Users className="h-8 w-8 text-blue-500" />
              <div>
                <p className="text-2xl font-bold text-gray-900">{children.length}</p>
                <p className="text-sm text-gray-600">Total enfants</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <Calendar className="h-8 w-8 text-green-500" />
              <div>
                <p className="text-2xl font-bold text-gray-900">12</p>
                <p className="text-sm text-gray-600">Nouvelles inscriptions</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Liste des enfants</CardTitle>
            <div className="flex items-center space-x-2">
              <Search className="h-4 w-4 text-gray-400" />
              <Input
                placeholder="Rechercher un enfant ou parent..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-64"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Nom</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Âge</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Niveau</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Parent</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Contact</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Statut</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredChildren.map((child) => (
                  <tr key={child.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div>
                        <p className="font-medium text-gray-900">{child.name}</p>
                        <p className="text-sm text-gray-500">Né le {new Date(child.birthdate).toLocaleDateString('fr-FR')}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-gray-700">{child.age}</td>
                    <td className="py-3 px-4 text-gray-700">{child.level}</td>
                    <td className="py-3 px-4 text-gray-700">{child.parent}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Phone className="h-4 w-4" />
                        <span>{child.phone}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Mail className="h-4 w-4" />
                        <span>{child.email}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                        {child.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <Button variant="outline" size="sm">
                        Modifier
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
