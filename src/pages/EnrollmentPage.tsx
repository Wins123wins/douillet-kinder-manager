
import React from 'react';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/AppSidebar';
import { EnrollmentForm } from '@/components/EnrollmentForm';

const EnrollmentPage = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <AppSidebar />
        <main className="flex-1 p-4 md:p-6">
          <SidebarTrigger className="mb-4" />
          <EnrollmentForm />
        </main>
      </div>
    </SidebarProvider>
  );
};

export default EnrollmentPage;
