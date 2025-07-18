import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { Progress } from '../../components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Calendar } from '../../components/ui/calendar';
import QuickActions from '../../components/ui/quick-actions';
import {
  Eye,
  Clock,
  CheckCircle,
  XCircle,
  TrendingUp,
  TrendingDown,
  Calendar as CalendarIcon,
  FileImage,
  BarChart3,
  Play,
  Pause
} from 'lucide-react';
import { mockMaterials, mockCampaigns } from '../../data/mockData';

const ClientDashboard: React.FC = () => {
  const { user } = useAuth();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  if (!user) return null;

  // Filtrar dados do cliente
  const clientMaterials = mockMaterials.filter(m => m.clientId === user.id);
  const clientCampaigns = mockCampaigns.filter(c => c.clientId === user.id);

  // Estatísticas dos materiais
  const materialStats = {
    total: clientMaterials.length,
    pending: clientMaterials.filter(m => m.approvalStatus === 'pending').length,
    approved: clientMaterials.filter(m => m.approvalStatus === 'approved').length,
    rejected: clientMaterials.filter(m => m.approvalStatus === 'rejected').length,
    scheduled: clientMaterials.filter(m => m.status === 'scheduled').length
  };

  // Métricas das campanhas
  const campaignMetrics = clientCampaigns.reduce((acc, campaign) => {
    acc.impressions += campaign.metrics.impressions || 0;
    acc.clicks += campaign.metrics.clicks || 0;
    acc.spent += campaign.metrics.spent || 0;
    acc.conversions += campaign.metrics.conversions || 0;
    return acc;
  }, { impressions: 0, clicks: 0, spent: 0, conversions: 0 });

  const ctr = campaignMetrics.impressions > 0 ? (campaignMetrics.clicks / campaignMetrics.impressions * 100) : 0;

  // Materiais recentes
  const recentMaterials = clientMaterials
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  // Materiais do calendário
  const calendarMaterials = clientMaterials.filter(m => 
    m.scheduledDate && new Date(m.scheduledDate).toDateString() === selectedDate?.toDateString()
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'revision': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return <CheckCircle className="w-4 h-4" />;
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'rejected': return <XCircle className="w-4 h-4" />;
      default: return <Eye className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
        <p className="text-slate-600 mt-1">
          Bem-vindo de volta, {user.contactPerson || user.name}
        </p>
      </div>

      {/* Cards de Métricas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Impressões</CardTitle>
            <Eye className="h-4 w-4 text-slate-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {campaignMetrics.impressions.toLocaleString('pt-BR')}
            </div>
            <p className="text-xs text-slate-600 flex items-center mt-1">
              <TrendingUp className="w-3 h-3 mr-1 text-green-600" />
              +12% vs mês anterior
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cliques</CardTitle>
            <BarChart3 className="h-4 w-4 text-slate-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {campaignMetrics.clicks.toLocaleString('pt-BR')}
            </div>
            <p className="text-xs text-slate-600 flex items-center mt-1">
              <TrendingUp className="w-3 h-3 mr-1 text-green-600" />
              +8% vs mês anterior
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">CTR</CardTitle>
            <TrendingUp className="h-4 w-4 text-slate-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{ctr.toFixed(2)}%</div>
            <p className="text-xs text-slate-600 flex items-center mt-1">
              <TrendingDown className="w-3 h-3 mr-1 text-red-600" />
              -0.3% vs mês anterior
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Investimento</CardTitle>
            <BarChart3 className="h-4 w-4 text-slate-600" />
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
        {/* Timeline e Calendário */}
        <div className="lg:col-span-2 space-y-6">
          <Tabs defaultValue="timeline" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="timeline">Timeline</TabsTrigger>
              <TabsTrigger value="calendar">Calendário</TabsTrigger>
            </TabsList>
            
            <TabsContent value="timeline" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <FileImage className="w-5 h-5" />
                    <span>Materiais Recentes</span>
                  </CardTitle>
                  <CardDescription>
                    Últimos materiais criados para seu projeto
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentMaterials.map((material) => (
                    <div key={material.id} className="flex items-center space-x-4 p-4 bg-slate-50 rounded-lg">
                      <div className="w-12 h-12 bg-slate-200 rounded-lg flex items-center justify-center">
                        {material.fileType === 'video' ? (
                          <Play className="w-6 h-6 text-slate-600" />
                        ) : (
                          <FileImage className="w-6 h-6 text-slate-600" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-slate-900 truncate">
                          {material.title}
                        </h4>
                        <p className="text-sm text-slate-600 truncate">
                          {material.description}
                        </p>
                        <p className="text-xs text-slate-500 mt-1">
                          {new Date(material.createdAt).toLocaleDateString('pt-BR')}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={getStatusColor(material.approvalStatus)}>
                          {getStatusIcon(material.approvalStatus)}
                          <span className="ml-1">
                            {material.approvalStatus === 'approved' ? 'Aprovado' :
                             material.approvalStatus === 'pending' ? 'Pendente' :
                             material.approvalStatus === 'rejected' ? 'Rejeitado' : 'Revisão'}
                          </span>
                        </Badge>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="calendar" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <CalendarIcon className="w-5 h-5" />
                    <span>Calendário de Materiais</span>
                  </CardTitle>
                  <CardDescription>
                    Visualize os materiais agendados por data
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    className="rounded-md border"
                  />
                  
                  {calendarMaterials.length > 0 && (
                    <div className="mt-4 space-y-2">
                      <h4 className="font-medium text-slate-900">
                        Materiais para {selectedDate?.toLocaleDateString('pt-BR')}:
                      </h4>
                      {calendarMaterials.map((material) => (
                        <div key={material.id} className="p-3 bg-blue-50 rounded-lg">
                          <p className="font-medium text-blue-900">{material.title}</p>
                          <p className="text-sm text-blue-700">
                            {new Date(material.scheduledDate!).toLocaleTimeString('pt-BR', {
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar com Status e Campanhas */}
        <div className="space-y-6">
          {/* Ações Rápidas */}
          <QuickActions 
            userRole="client" 
            pendingCount={materialStats.pending}
          />

          {/* Status dos Materiais */}
          <Card>
            <CardHeader>
              <CardTitle>Status dos Materiais</CardTitle>
              <CardDescription>
                Resumo do status de aprovação
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Pendentes</span>
                  <Badge variant="secondary">{materialStats.pending}</Badge>
                </div>
                <Progress value={(materialStats.pending / materialStats.total) * 100} className="h-2" />
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Aprovados</span>
                  <Badge variant="secondary">{materialStats.approved}</Badge>
                </div>
                <Progress value={(materialStats.approved / materialStats.total) * 100} className="h-2" />
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Agendados</span>
                  <Badge variant="secondary">{materialStats.scheduled}</Badge>
                </div>
                <Progress value={(materialStats.scheduled / materialStats.total) * 100} className="h-2" />
              </div>
            </CardContent>
          </Card>

          {/* Campanhas Ativas */}
          <Card>
            <CardHeader>
              <CardTitle>Campanhas Ativas</CardTitle>
              <CardDescription>
                Status das suas campanhas
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {clientCampaigns.map((campaign) => (
                <div key={campaign.id} className="p-3 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-slate-900">{campaign.name}</h4>
                    <Badge variant="outline" className="text-green-700 border-green-200">
                      {campaign.status === 'active' ? (
                        <>
                          <Play className="w-3 h-3 mr-1" />
                          Ativa
                        </>
                      ) : (
                        <>
                          <Pause className="w-3 h-3 mr-1" />
                          Pausada
                        </>
                      )}
                    </Badge>
                  </div>
                  <p className="text-sm text-slate-600 mb-2">{campaign.platform}</p>
                  <div className="text-xs text-slate-500 space-y-1">
                    <div className="flex justify-between">
                      <span>Gasto:</span>
                      <span>R$ {campaign.metrics.spent?.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Orçamento:</span>
                      <span>R$ {campaign.budget.toFixed(2)}</span>
                    </div>
                  </div>
                  <Progress 
                    value={(campaign.metrics.spent! / campaign.budget) * 100} 
                    className="h-1 mt-2" 
                  />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;