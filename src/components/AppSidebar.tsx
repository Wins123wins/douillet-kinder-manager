
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  Home, 
  Users, 
  Settings, 
  DollarSign, 
  FileText, 
  Calendar,
  GraduationCap,
  UserPlus
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';

const items = [
  { title: 'Tableau de bord', url: '/', icon: Home },
  { title: 'Enfants', url: '/children', icon: Users },
  { title: 'Inscription', url: '/enrollment', icon: UserPlus },
  { title: 'Services', url: '/services', icon: Settings },
  { title: 'Finances', url: '/finance', icon: DollarSign },
  { title: 'Rapports', url: '/reports', icon: FileText },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const collapsed = state === 'collapsed';

  const isActive = (path: string) => currentPath === path;

  return (
    <Sidebar className={collapsed ? 'w-14' : 'w-64'} collapsible="icon">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-2 rounded-lg">
            <GraduationCap className="h-6 w-6 text-white" />
          </div>
          {!collapsed && (
            <div>
              <h1 className="text-xl font-bold text-gray-800">École Nid Douillet</h1>
              <p className="text-sm text-gray-600">Gestion de maternelle</p>
            </div>
          )}
        </div>
      </div>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      className={({ isActive }) =>
                        isActive 
                          ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white' 
                          : 'text-gray-700 hover:bg-gray-100 hover:text-blue-600'
                      }
                    >
                      <item.icon className="h-5 w-5" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <div className="absolute bottom-4 left-4 right-4">
        <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg border border-green-200">
          <div className="flex items-center space-x-2">
            <Calendar className="h-5 w-5 text-green-600" />
            {!collapsed && (
              <div>
                <p className="text-sm font-medium text-gray-800">Année active</p>
                <p className="text-xs text-gray-600">2024-2025</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Sidebar>
  );
}
