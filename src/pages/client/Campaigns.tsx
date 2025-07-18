import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { Progress } from '../../components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Eye,
  MousePointer,
  Target,
  DollarSign,
  Play,
  Pause,
  Calendar,
  ExternalLink
} from 'lucide-react';
import { mockCampaigns } from '../../data/mockData';

const ClientCampaigns: React.FC = () => {
  const { user } = useAuth();
  const [selectedPeriod, setSelectedPeriod] = useState('30d');

  if (!user) return null;

  // Filtrar campanhas do cliente
  const clientCampaigns = mockCampaigns.filter(c => c.clientId === user.id);

  // Calcular métricas totais
  const totalMetrics = clientCampaigns.reduce((acc, campaign) => {
    acc.impressions += campaign.metrics.impressions || 0;
    acc.clicks += campaign.metrics.clicks || 0;
    acc.spent += campaign.metrics.spent || 0;
    acc.conversions += campaign.metrics.conversions || 0;
    acc.budget += campaign.budget;
    return acc;
  }, { impressions: 0, clicks: 0, spent: 0, conversions: 0, budget: 0 });

  const totalCTR = totalMetrics.impressions > 0 ? (totalMetrics.clicks / totalMetrics.impressions * 100) : 0;
  const totalCPC = totalMetrics.clicks > 0 ? (totalMetrics.spent / totalMetrics.clicks) : 0;
  const totalCPM = totalMetrics.impressions > 0 ? (totalMetrics.spent / totalMetrics.impressions * 1000) : 0;
  const budgetUsed = totalMetrics.budget > 0 ? (totalMetrics.spent / totalMetrics.budget * 100) : 0;

  const getPlatformIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'facebook': return '📘';
      case 'instagram': return '📷';
      case 'google ads': return '🔍';
      case 'linkedin': return '💼';
      case 'tiktok': return '🎵';
      default: return '📊';
    }
  };

  const getPlatformColor = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'facebook': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'instagram': return 'bg-pink-100 text-pink-800 border-pink-200';
      case 'google ads': return 'bg-green-100 text-green-800 border-green-200';
      case 'linkedin': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'tiktok': return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'paused': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'completed': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <Play className="w-3 h-3" />;
      case 'paused': return <Pause className="w-3 h-3" />;
      case 'completed': return <Target className="w-3 h-3" />;
      default: return <Eye className="w-3 h-3" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Ativa';
      case 'paused': return 'Pausada';
      case 'completed': return 'Finalizada';
      default: return 'Rascunho';
    }
  };

  const CampaignCard = ({ campaign }: { campaign: any }) => (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="text-2xl">{getPlatformIcon(campaign.platform)}</span>
            <div>
              <CardTitle className="text-lg">{campaign.name}</CardTitle>
              <CardDescription className="flex items-center space-x-2">
                <Badge className={getPlatformColor(campaign.platform)}>
                  {campaign.platform}
                </Badge>
                <Badge className={getStatusColor(campaign.status)}>
                  {getStatusIcon(campaign.status)}
                  <span className="ml-1">{getStatusText(campaign.status)}</span>
                </Badge>
              </CardDescription>
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Métricas Principais */}
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-slate-50 rounded-lg">
            <div className="flex items-center justify-center space-x-1 text-slate-600 mb-1">
              <Eye className="w-4 h-4" />
              <span className="text-xs font-medium">Impressões</span>
            </div>
            <p className="text-lg font-bold text-slate-900">
              {(campaign.metrics.impressions || 0).toLocaleString('pt-BR')}
            </p>
          </div>
          
          <div className="text-center p-3 bg-slate-50 rounded-lg">
            <div className="flex items-center justify-center space-x-1 text-slate-600 mb-1">
              <MousePointer className="w-4 h-4" />
              <span className="text-xs font-medium">Cliques</span>
            </div>
            <p className="text-lg font-bold text-slate-900">
              {(campaign.metrics.clicks || 0).toLocaleString('pt-BR')}
            </p>
          </div>
        </div>

        {/* Métricas Secundárias */}
        <div className="grid grid-cols-3 gap-3 text-sm">
          <div className="text-center">
            <p className="text-slate-600">CTR</p>
            <p className="font-semibold text-slate-900">
              {(campaign.metrics.ctr || 0).toFixed(2)}%
            </p>
          </div>
          <div className="text-center">
            <p className="text-slate-600">CPC</p>
            <p className="font-semibold text-slate-900">
              R$ {(campaign.metrics.cpc || 0).toFixed(2)}
            </p>
          </div>
          <div className="text-center">
            <p className="text-slate-600">Conversões</p>
            <p className="font-semibold text-slate-900">
              {campaign.metrics.conversions || 0}
            </p>
          </div>
        </div>

        {/* Orçamento */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-slate-600">Orçamento utilizado</span>
            <span className="font-medium">
              R$ {(campaign.metrics.spent || 0).toFixed(2)} / R$ {campaign.budget.toFixed(2)}
            </span>
          </div>
          <Progress 
            value={(campaign.metrics.spent! / campaign.budget) * 100} 
            className="h-2"
          />
        </div>

        {/* Datas */}
        <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t">
          <div className="flex items-center space-x-1">
            <Calendar className="w-3 h-3" />
            <span>
              {campaign.startDate 
                ? new Date(campaign.startDate).toLocaleDateString('pt-BR')
                : 'Não iniciada'
              }
            </span>
          </div>
          <div>
            até {campaign.endDate 
              ? new Date(campaign.endDate).toLocaleDateString('pt-BR')
              : 'Indefinido'
            }
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Campanhas</h1>
        <p className="text-slate-600 mt-1">
          Acompanhe o desempenho das suas campanhas de marketing
        </p>
      </div>

      {/* Métricas Gerais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Impressões</CardTitle>
            <Eye className="h-4 w-4 text-slate-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {totalMetrics.impressions.toLocaleString('pt-BR')}
            </div>
            <p className="text-xs text-slate-600 flex items-center mt-1">
              <TrendingUp className="w-3 h-3 mr-1 text-green-600" />
              +12% vs período anterior
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Cliques</CardTitle>
            <MousePointer className="h-4 w-4 text-slate-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {totalMetrics.clicks.toLocaleString('pt-BR')}
            </div>
            <p className="text-xs text-slate-600 flex items-center mt-1">
              <TrendingUp className="w-3 h-3 mr-1 text-green-600" />
              +8% vs período anterior
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">CTR Médio</CardTitle>
            <BarChart3 className="h-4 w-4 text-slate-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCTR.toFixed(2)}%</div>
            <p className="text-xs text-slate-600 flex items-center mt-1">
              <TrendingDown className="w-3 h-3 mr-1 text-red-600" />
              -0.3% vs período anterior
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
              R$ {totalMetrics.spent.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </div>
            <p className="text-xs text-slate-600 flex items-center mt-1">
              <TrendingUp className="w-3 h-3 mr-1 text-green-600" />
              +15% vs período anterior
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Resumo de Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Resumo de Performance</CardTitle>
          <CardDescription>
            Métricas consolidadas de todas as campanhas ativas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Orçamento Total Utilizado</span>
                <span className="font-medium">
                  {budgetUsed.toFixed(1)}%
                </span>
              </div>
              <Progress value={budgetUsed} className="h-3" />
              <p className="text-xs text-slate-500">
                R$ {totalMetrics.spent.toFixed(2)} de R$ {totalMetrics.budget.toFixed(2)}
              </p>
            </div>

            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-600 mb-1">CPC Médio</p>
              <p className="text-2xl font-bold text-blue-900">
                R$ {totalCPC.toFixed(2)}
              </p>
            </div>

            <div className="text-center p-4 bg-green-50 rounded-lg">
              <p className="text-sm text-green-600 mb-1">Total de Conversões</p>
              <p className="text-2xl font-bold text-green-900">
                {totalMetrics.conversions}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Campanhas */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-slate-900">
            Suas Campanhas ({clientCampaigns.length})
          </h2>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <ExternalLink className="w-4 h-4 mr-2" />
              Ver no Ads Manager
            </Button>
          </div>
        </div>

        {clientCampaigns.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <BarChart3 className="w-16 h-16 text-slate-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-slate-900 mb-2">
                Nenhuma campanha encontrada
              </h3>
              <p className="text-slate-600">
                Suas campanhas aparecerão aqui quando forem criadas
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {clientCampaigns.map((campaign) => (
              <CampaignCard key={campaign.id} campaign={campaign} />
            ))}
          </div>
        )}
      </div>

      {/* Insights e Recomendações */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            <span>Insights e Recomendações</span>
          </CardTitle>
          <CardDescription>
            Análises automáticas baseadas no desempenho das suas campanhas
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
              <div>
                <h4 className="font-medium text-green-900">Performance Positiva</h4>
                <p className="text-sm text-green-700 mt-1">
                  Sua campanha "Campanha Black Friday" está performando 23% acima da média do setor.
                </p>
              </div>
            </div>
          </div>

          <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
              <div>
                <h4 className="font-medium text-yellow-900">Oportunidade de Otimização</h4>
                <p className="text-sm text-yellow-700 mt-1">
                  Considere aumentar o orçamento da campanha "Lead Generation" que está com CTR alto.
                </p>
              </div>
            </div>
          </div>

          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              <div>
                <h4 className="font-medium text-blue-900">Sugestão de Teste</h4>
                <p className="text-sm text-blue-700 mt-1">
                  Teste novos públicos similares baseados nos conversores da campanha de Instagram.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ClientCampaigns;