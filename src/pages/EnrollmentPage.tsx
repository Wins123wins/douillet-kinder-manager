
import React from 'react';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/AppSidebar';
import { EnrollmentForm } from '@/components/EnrollmentForm';

const EnrollmentPage = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-blue-50 to-indigo-100">
        <AppSidebar />
        <main className="flex-1 p-4 md:p-6">
          <SidebarTrigger className="mb-4" />
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Inscription</h1>
            <p className="text-gray-600">Formulaire d'inscription pour nouveaux élèves</p>
          </div>
          <EnrollmentForm />
        </main>
      </div>
    </SidebarProvider>
  );
};

export default EnrollmentPage;
