import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './card';
import { Button } from './button';
import { Badge } from './badge';
import { useNavigate } from 'react-router-dom';
import { 
  FileImage, 
  FolderOpen, 
  BarChart3, 
  MessageSquare, 
  Calendar,
  Download,
  Plus,
  ArrowRight
} from 'lucide-react';

interface QuickActionsProps {
  userRole: 'client' | 'admin';
  pendingCount?: number;
  className?: string;
}

const QuickActions: React.FC<QuickActionsProps> = ({ 
  userRole, 
  pendingCount = 0, 
  className 
}) => {
  const navigate = useNavigate();

  const clientActions = [
    {
      id: 'materials',
      title: 'Ver Materiais',
      description: 'Revisar e aprovar materiais',
      icon: <FileImage className="w-5 h-5" />,
      badge: pendingCount > 0 ? pendingCount : null,
      badgeVariant: 'destructive' as const,
      onClick: () => navigate('/materials')
    },
    {
      id: 'library',
      title: 'Biblioteca',
      description: 'Acessar documentos e arquivos',
      icon: <FolderOpen className="w-5 h-5" />,
      onClick: () => navigate('/library')
    },
    {
      id: 'campaigns',
      title: 'Campanhas',
      description: 'Ver métricas e performance',
      icon: <BarChart3 className="w-5 h-5" />,
      onClick: () => navigate('/campaigns')
    },
    {
      id: 'schedule',
      title: 'Calendário',
      description: 'Ver agendamentos',
      icon: <Calendar className="w-5 h-5" />,
      onClick: () => navigate('/materials')
    }
  ];

  const adminActions = [
    {
      id: 'clients',
      title: 'Gerenciar Clientes',
      description: 'Adicionar e editar clientes',
      icon: <Plus className="w-5 h-5" />,
      onClick: () => navigate('/admin/clients')
    },
    {
      id: 'materials',
      title: 'Revisar Materiais',
      description: 'Aprovar materiais pendentes',
      icon: <FileImage className="w-5 h-5" />,
      badge: pendingCount > 0 ? pendingCount : null,
      badgeVariant: 'destructive' as const,
      onClick: () => navigate('/admin/materials')
    },
    {
      id: 'reports',
      title: 'Relatórios',
      description: 'Gerar relatórios de performance',
      icon: <Download className="w-5 h-5" />,
      onClick: () => navigate('/admin/dashboard')
    },
    {
      id: 'messages',
      title: 'Mensagens',
      description: 'Comunicação com clientes',
      icon: <MessageSquare className="w-5 h-5" />,
      onClick: () => navigate('/admin/dashboard')
    }
  ];

  const actions = userRole === 'admin' ? adminActions : clientActions;

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <span>Ações Rápidas</span>
          <ArrowRight className="w-4 h-4 text-slate-400" />
        </CardTitle>
        <CardDescription>
          {userRole === 'admin' 
            ? 'Gerencie clientes e materiais rapidamente'
            : 'Acesse suas principais funcionalidades'
          }
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {actions.map((action) => (
          <Button
            key={action.id}
            variant="outline"
            className="w-full justify-start h-auto p-4 hover:bg-slate-50"
            onClick={action.onClick}
          >
            <div className="flex items-center space-x-3 w-full">
              <div className="flex-shrink-0 text-slate-600">
                {action.icon}
              </div>
              <div className="flex-1 text-left">
                <div className="flex items-center space-x-2">
                  <span className="font-medium text-sm">{action.title}</span>
                  {action.badge && (
                    <Badge variant={action.badgeVariant} className="text-xs">
                      {action.badge}
                    </Badge>
                  )}
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  {action.description}
                </p>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 flex-shrink-0" />
            </div>
          </Button>
        ))}
      </CardContent>
    </Card>
  );
};

export default QuickActions;