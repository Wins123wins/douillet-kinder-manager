
import React from 'react';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/AppSidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

const ChildrenPage = () => {
  // Mock data for children
  const children = [
    {
      id: 1,
      name: "Emma Thompson",
      age: "4y 3m",
      level: "MS",
      status: "Active",
      enrollmentDate: "2023-09-01",
    },
    {
      id: 2,
      name: "Lucas Martin",
      age: "3y 8m",
      level: "PS",
      status: "Active",
      enrollmentDate: "2023-09-01",
    },
    {
      id: 3,
      name: "Sophie Dubois",
      age: "5y 1m",
      level: "GS",
      status: "Pending",
      enrollmentDate: "2024-01-15",
    },
  ];

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-blue-50 to-indigo-100">
        <AppSidebar />
        <main className="flex-1 p-4 md:p-6">
          <SidebarTrigger className="mb-4" />
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Enfants</h1>
            <p className="text-gray-600">Gestion des profils des enfants</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {children.map((child) => (
              <Card key={child.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{child.name}</CardTitle>
                    <Badge variant={child.status === 'Active' ? 'default' : 'secondary'}>
                      {child.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm text-gray-600 mb-4">
                    <p><strong>Âge:</strong> {child.age}</p>
                    <p><strong>Niveau:</strong> {child.level}</p>
                    <p><strong>Inscription:</strong> {child.enrollmentDate}</p>
                  </div>
                  <Link to={`/child/${child.id}`}>
                    <Button className="w-full" size="sm">
                      <Eye className="w-4 h-4 mr-2" />
                      Voir le profil
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default ChildrenPage;
