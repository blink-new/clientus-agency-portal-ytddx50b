import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { Progress } from '../../components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import {
  Users,
  FileImage,
  BarChart3,
  TrendingUp,
  TrendingDown,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Eye,
  MousePointer,
  DollarSign,
  Target
} from 'lucide-react';
import { mockUsers, mockMaterials, mockCampaigns } from '../../data/mockData';

const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const [selectedPeriod, setSelectedPeriod] = useState('30d');

  if (!user || user.role !== 'admin') return null;

  // Filtrar apenas clientes
  const clients = mockUsers.filter(u => u.role === 'client');
  
  // Estatísticas dos clientes
  const clientStats = {
    total: clients.length,
    active: clients.filter(c => c.status === 'active').length,
    pending: clients.filter(c => c.status === 'pending').length,
    inactive: clients.filter(c => c.status === 'inactive').length
  };

  // Estatísticas dos materiais
  const materialStats = {
    total: mockMaterials.length,
    pending: mockMaterials.filter(m => m.approvalStatus === 'pending').length,
    approved: mockMaterials.filter(m => m.approvalStatus === 'approved').length,
    rejected: mockMaterials.filter(m => m.approvalStatus === 'rejected').length,
    scheduled: mockMaterials.filter(m => m.status === 'scheduled').length
  };

  // Métricas das campanhas
  const campaignMetrics = mockCampaigns.reduce((acc, campaign) => {
    acc.impressions += campaign.metrics.impressions || 0;
    acc.clicks += campaign.metrics.clicks || 0;
    acc.spent += campaign.metrics.spent || 0;
    acc.conversions += campaign.metrics.conversions || 0;
    acc.budget += campaign.budget;
    return acc;
  }, { impressions: 0, clicks: 0, spent: 0, conversions: 0, budget: 0 });

  const totalCTR = campaignMetrics.impressions > 0 ? (campaignMetrics.clicks / campaignMetrics.impressions * 100) : 0;
  const budgetUsed = campaignMetrics.budget > 0 ? (campaignMetrics.spent / campaignMetrics.budget * 100) : 0;

  // Materiais recentes que precisam de atenção
  const pendingMaterials = mockMaterials
    .filter(m => m.approvalStatus === 'pending')
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  // Clientes por tipo de projeto
  const projectTypes = clients.reduce((acc, client) => {
    const type = client.projectType || 'Outros';
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const getClientName = (clientId: string) => {
    const client = clients.find(c => c.id === clientId);
    return client?.name || 'Cliente não encontrado';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'inactive': return 'bg-red-100 text-red-800 border-red-200';
      case 'approved': return 'bg-green-100 text-green-800 border-green-200';
      case 'rejected': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return <CheckCircle className="w-4 h-4" />;
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'rejected': return <XCircle className="w-4 h-4" />;
      default: return <AlertTriangle className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Dashboard Administrativo</h1>
        <p className="text-slate-600 mt-1">
          Visão geral de todos os clientes e projetos
        </p>
      </div>

      {/* Cards de Métricas Principais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Clientes</CardTitle>
            <Users className="h-4 w-4 text-slate-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{clientStats.total}</div>
            <p className="text-xs text-slate-600 flex items-center mt-1">
              <TrendingUp className="w-3 h-3 mr-1 text-green-600" />
              +2 novos este mês
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Materiais Pendentes</CardTitle>
            <FileImage className="h-4 w-4 text-slate-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{materialStats.pending}</div>
            <p className="text-xs text-slate-600 flex items-center mt-1">
              <AlertTriangle className="w-3 h-3 mr-1 text-yellow-600" />
              Requer atenção
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Campanhas Ativas</CardTitle>
            <BarChart3 className="h-4 w-4 text-slate-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockCampaigns.length}</div>
            <p className="text-xs text-slate-600 flex items-center mt-1">
              <TrendingUp className="w-3 h-3 mr-1 text-green-600" />
              Performance estável
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Investimento Total</CardTitle>
            <DollarSign className="h-4 w-4 text-slate-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              R$ {campaignMetrics.spent.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </div>
            <p className="text-xs text-slate-600 flex items-center mt-1">
              <TrendingUp className="w-3 h-3 mr-1 text-green-600" />
              +15% vs mês anterior
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Conteúdo Principal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Área Principal */}
        <div className="lg:col-span-2 space-y-6">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Visão Geral</TabsTrigger>
              <TabsTrigger value="materials">Materiais</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-4">
              {/* Status dos Clientes */}
              <Card>
                <CardHeader>
                  <CardTitle>Status dos Clientes</CardTitle>
                  <CardDescription>
                    Distribuição dos clientes por status
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span className="text-sm text-slate-600">Ativos</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium">{clientStats.active}</span>
                        <Badge variant="secondary">
                          {((clientStats.active / clientStats.total) * 100).toFixed(0)}%
                        </Badge>
                      </div>
                    </div>
                    <Progress value={(clientStats.active / clientStats.total) * 100} className="h-2" />
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <span className="text-sm text-slate-600">Pendentes</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium">{clientStats.pending}</span>
                        <Badge variant="secondary">
                          {((clientStats.pending / clientStats.total) * 100).toFixed(0)}%
                        </Badge>
                      </div>
                    </div>
                    <Progress value={(clientStats.pending / clientStats.total) * 100} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              {/* Tipos de Projeto */}
              <Card>
                <CardHeader>
                  <CardTitle>Tipos de Projeto</CardTitle>
                  <CardDescription>
                    Distribuição dos clientes por tipo de projeto
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {Object.entries(projectTypes).map(([type, count]) => (
                      <div key={type} className="flex items-center justify-between">
                        <span className="text-sm text-slate-600">{type}</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-medium">{count}</span>
                          <div className="w-16 h-2 bg-slate-200 rounded-full">
                            <div 
                              className="h-full bg-blue-500 rounded-full"
                              style={{ width: `${(count / clientStats.total) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="materials" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Materiais Pendentes de Aprovação</CardTitle>
                  <CardDescription>
                    Materiais que precisam de atenção imediata
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {pendingMaterials.length === 0 ? (
                    <div className="text-center py-8">
                      <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
                      <p className="text-slate-600">Todos os materiais foram aprovados!</p>
                    </div>
                  ) : (
                    pendingMaterials.map((material) => (
                      <div key={material.id} className="flex items-center space-x-4 p-4 bg-slate-50 rounded-lg">
                        <div className="w-12 h-12 bg-slate-200 rounded-lg flex items-center justify-center">
                          <FileImage className="w-6 h-6 text-slate-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-slate-900 truncate">
                            {material.title}
                          </h4>
                          <p className="text-sm text-slate-600">
                            {getClientName(material.clientId)}
                          </p>
                          <p className="text-xs text-slate-500 mt-1">
                            {new Date(material.createdAt).toLocaleDateString('pt-BR')}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge className={getStatusColor(material.approvalStatus)}>
                            {getStatusIcon(material.approvalStatus)}
                            <span className="ml-1">Pendente</span>
                          </Badge>
                          <Button variant="outline" size="sm">
                            Revisar
                          </Button>
                        </div>
                      </div>
                    ))
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="performance" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Métricas Consolidadas</CardTitle>
                  <CardDescription>
                    Performance geral de todas as campanhas
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="flex items-center justify-center space-x-1 text-blue-600 mb-2">
                        <Eye className="w-4 h-4" />
                        <span className="text-sm font-medium">Impressões Totais</span>
                      </div>
                      <p className="text-2xl font-bold text-blue-900">
                        {campaignMetrics.impressions.toLocaleString('pt-BR')}
                      </p>
                    </div>
                    
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="flex items-center justify-center space-x-1 text-green-600 mb-2">
                        <MousePointer className="w-4 h-4" />
                        <span className="text-sm font-medium">Cliques Totais</span>
                      </div>
                      <p className="text-2xl font-bold text-green-900">
                        {campaignMetrics.clicks.toLocaleString('pt-BR')}
                      </p>
                    </div>
                    
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <div className="flex items-center justify-center space-x-1 text-purple-600 mb-2">
                        <BarChart3 className="w-4 h-4" />
                        <span className="text-sm font-medium">CTR Médio</span>
                      </div>
                      <p className="text-2xl font-bold text-purple-900">
                        {totalCTR.toFixed(2)}%
                      </p>
                    </div>
                    
                    <div className="text-center p-4 bg-orange-50 rounded-lg">
                      <div className="flex items-center justify-center space-x-1 text-orange-600 mb-2">
                        <Target className="w-4 h-4" />
                        <span className="text-sm font-medium">Conversões</span>
                      </div>
                      <p className="text-2xl font-bold text-orange-900">
                        {campaignMetrics.conversions}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Resumo de Materiais */}
          <Card>
            <CardHeader>
              <CardTitle>Resumo de Materiais</CardTitle>
              <CardDescription>
                Status geral dos materiais
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Total</span>
                  <Badge variant="secondary">{materialStats.total}</Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Pendentes</span>
                  <Badge className="bg-yellow-100 text-yellow-800">
                    {materialStats.pending}
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Aprovados</span>
                  <Badge className="bg-green-100 text-green-800">
                    {materialStats.approved}
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Agendados</span>
                  <Badge className="bg-blue-100 text-blue-800">
                    {materialStats.scheduled}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Orçamento Geral */}
          <Card>
            <CardHeader>
              <CardTitle>Orçamento Consolidado</CardTitle>
              <CardDescription>
                Utilização do orçamento total
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Utilizado</span>
                  <span className="font-medium">
                    {budgetUsed.toFixed(1)}%
                  </span>
                </div>
                <Progress value={budgetUsed} className="h-3" />
                <p className="text-xs text-slate-500">
                  R$ {campaignMetrics.spent.toFixed(2)} de R$ {campaignMetrics.budget.toFixed(2)}
                </p>
              </div>

              <div className="pt-4 border-t space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Disponível</span>
                  <span className="font-medium text-green-600">
                    R$ {(campaignMetrics.budget - campaignMetrics.spent).toFixed(2)}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Ações Rápidas */}
          <Card>
            <CardHeader>
              <CardTitle>Ações Rápidas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full" variant="outline">
                <Users className="w-4 h-4 mr-2" />
                Gerenciar Clientes
              </Button>
              <Button className="w-full" variant="outline">
                <FileImage className="w-4 h-4 mr-2" />
                Revisar Materiais
              </Button>
              <Button className="w-full" variant="outline">
                <BarChart3 className="w-4 h-4 mr-2" />
                Ver Relatórios
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;