
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Settings, Clock, Euro, Users } from 'lucide-react';

interface ServicesProps {
  selectedYear: string;
}

export const Services: React.FC<ServicesProps> = ({ selectedYear }) => {
  const [services] = useState([
    {
      id: 1,
      name: 'Garderie du matin',
      description: 'Accueil des enfants dès 7h30',
      cost: 15,
      duration: '7h30 - 8h30',
      participants: 45,
      category: 'Garderie'
    },
    {
      id: 2,
      name: 'Garderie du soir',
      description: 'Surveillance jusqu\'à 18h30',
      cost: 20,
      duration: '16h30 - 18h30',
      participants: 38,
      category: 'Garderie'
    },
    {
      id: 3,
      name: 'Repas à la cantine',
      description: 'Repas équilibrés préparés sur place',
      cost: 12,
      duration: '12h00 - 13h30',
      participants: 89,
      category: 'Restauration'
    },
    {
      id: 4,
      name: 'Activités extrascolaires',
      description: 'Arts, musique, sport',
      cost: 25,
      duration: '15h00 - 16h00',
      participants: 32,
      category: 'Activités'
    }
  ]);

  const totalRevenue = services.reduce((sum, service) => sum + (service.cost * service.participants), 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestion des services</h1>
          <p className="text-gray-600">Services proposés pour l'année {selectedYear}-{parseInt(selectedYear) + 1}</p>
        </div>
        <Button className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>Nouveau service</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <Settings className="h-8 w-8 text-blue-500" />
              <div>
                <p className="text-2xl font-bold text-gray-900">{services.length}</p>
                <p className="text-sm text-gray-600">Services actifs</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <Users className="h-8 w-8 text-green-500" />
              <div>
                <p className="text-2xl font-bold text-gray-900">{services.reduce((sum, s) => sum + s.participants, 0)}</p>
                <p className="text-sm text-gray-600">Total inscriptions</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <Euro className="h-8 w-8 text-purple-500" />
              <div>
                <p className="text-2xl font-bold text-gray-900">€{totalRevenue}</p>
                <p className="text-sm text-gray-600">Revenus mensuels</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <Clock className="h-8 w-8 text-orange-500" />
              <div>
                <p className="text-2xl font-bold text-gray-900">12h</p>
                <p className="text-sm text-gray-600">Heures d'ouverture</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map((service) => (
          <Card key={service.id} className="hover:shadow-lg transition-shadow duration-200">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{service.name}</CardTitle>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                  {service.category}
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">{service.description}</p>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-700">{service.duration}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Euro className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-700">{service.cost}€/mois</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-700">{service.participants} inscrits</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Settings className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-green-600 font-medium">Actif</span>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" className="flex-1">
                  Modifier
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  Participants
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
