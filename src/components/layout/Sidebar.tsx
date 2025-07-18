import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { cn } from '../../lib/utils';
import {
  LayoutDashboard,
  FileImage,
  FolderOpen,
  BarChart3,
  Users,
  Settings,
  Building2
} from 'lucide-react';

interface SidebarProps {
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  if (!user) return null;

  const clientMenuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      href: '/dashboard',
      badge: null
    },
    {
      id: 'materials',
      label: 'Materiais',
      icon: FileImage,
      href: '/materials',
      badge: '3'
    },
    {
      id: 'library',
      label: 'Biblioteca',
      icon: FolderOpen,
      href: '/library',
      badge: null
    },
    {
      id: 'campaigns',
      label: 'Campanhas',
      icon: BarChart3,
      href: '/campaigns',
      badge: null
    }
  ];

  const adminMenuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      href: '/admin/dashboard',
      badge: null
    },
    {
      id: 'clients',
      label: 'Clientes',
      icon: Users,
      href: '/admin/clients',
      badge: '1'
    },
    {
      id: 'materials',
      label: 'Materiais',
      icon: FileImage,
      href: '/admin/materials',
      badge: '5'
    },
    {
      id: 'campaigns',
      label: 'Campanhas',
      icon: BarChart3,
      href: '/admin/campaigns',
      badge: null
    },
    {
      id: 'settings',
      label: 'Configurações',
      icon: Settings,
      href: '/admin/settings',
      badge: null
    }
  ];

  const menuItems = user.role === 'admin' ? adminMenuItems : clientMenuItems;

  const isActiveRoute = (href: string) => {
    if (href === '/dashboard' && location.pathname === '/') return true;
    if (href === '/admin/dashboard' && location.pathname === '/admin') return true;
    return location.pathname === href;
  };

  const handleItemClick = (href: string) => {
    navigate(href);
  };

  return (
    <div className={cn(
      "fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-white border-r border-slate-200 overflow-y-auto lg:block hidden",
      className
    )}>
      <div className="p-4 space-y-2">
        {/* Informações do Usuário */}
        <div className="mb-6 p-4 bg-slate-50 rounded-lg">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <Building2 className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-900 truncate">
                {user.name}
              </p>
              <p className="text-xs text-slate-500 truncate">
                {user.projectType || user.role}
              </p>
            </div>
          </div>
        </div>

        {/* Menu de Navegação */}
        <nav className="space-y-1">
          {menuItems.map((item) => (
            <Button
              key={item.id}
              variant={isActiveRoute(item.href) ? "secondary" : "ghost"}
              className={cn(
                "w-full justify-start h-10",
                isActiveRoute(item.href) && "bg-blue-50 text-blue-700 border-blue-200"
              )}
              onClick={() => handleItemClick(item.href)}
            >
              <item.icon className="mr-3 h-4 w-4" />
              <span className="flex-1 text-left">{item.label}</span>
              {item.badge && (
                <Badge 
                  variant={isActiveRoute(item.href) ? "default" : "secondary"}
                  className="ml-auto"
                >
                  {item.badge}
                </Badge>
              )}
            </Button>
          ))}
        </nav>

        {/* Seção de Status */}
        <div className="mt-8 p-4 bg-green-50 rounded-lg border border-green-200">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-sm font-medium text-green-800">
              Sistema Online
            </span>
          </div>
          <p className="text-xs text-green-600 mt-1">
            Todos os serviços funcionando normalmente
          </p>
        </div>

        {/* Informações Adicionais */}
        {user.role === 'client' && (
          <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h4 className="text-sm font-medium text-blue-900 mb-2">
              Projeto Atual
            </h4>
            <p className="text-xs text-blue-700">
              {user.projectType}
            </p>
            <div className="mt-2 flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-xs text-blue-600">
                Status: {user.status === 'active' ? 'Ativo' : 'Pendente'}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;