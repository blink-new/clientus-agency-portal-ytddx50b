import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../../components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import {
  Users,
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Eye,
  Mail,
  Phone,
  Calendar,
  Building2,
  CheckCircle,
  Clock,
  XCircle,
  MoreHorizontal
} from 'lucide-react';
import { mockUsers, mockMaterials, mockCampaigns } from '../../data/mockData';

const AdminClients: React.FC = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [selectedClient, setSelectedClient] = useState<any>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newClient, setNewClient] = useState({
    name: '',
    email: '',
    contactPerson: '',
    projectType: '',
    status: 'pending'
  });

  if (!user || user.role !== 'admin') return null;

  // Filtrar apenas clientes
  const clients = mockUsers.filter(u => u.role === 'client');

  // Aplicar filtros
  const filteredClients = clients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.contactPerson?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || client.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'inactive': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="w-4 h-4" />;
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'inactive': return <XCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Ativo';
      case 'pending': return 'Pendente';
      case 'inactive': return 'Inativo';
      default: return 'Desconhecido';
    }
  };

  const getClientStats = (clientId: string) => {
    const clientMaterials = mockMaterials.filter(m => m.clientId === clientId);
    const clientCampaigns = mockCampaigns.filter(c => c.clientId === clientId);
    
    return {
      materials: clientMaterials.length,
      campaigns: clientCampaigns.length,
      pendingMaterials: clientMaterials.filter(m => m.approvalStatus === 'pending').length,
      totalSpent: clientCampaigns.reduce((acc, c) => acc + (c.metrics.spent || 0), 0)
    };
  };

  const handleCreateClient = () => {
    // Aqui seria feita a chamada para a API
    console.log('Creating client:', newClient);
    setNewClient({
      name: '',
      email: '',
      contactPerson: '',
      projectType: '',
      status: 'pending'
    });
    setIsCreateDialogOpen(false);
  };

  const handleStatusChange = (clientId: string, newStatus: string) => {
    // Aqui seria feita a chamada para a API
    console.log(`Changing client ${clientId} status to ${newStatus}`);
  };

  const ClientCard = ({ client }: { client: any }) => {
    const stats = getClientStats(client.id);
    
    return (
      <Card className="hover:shadow-md transition-shadow">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Building2 className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">{client.name}</h3>
                <p className="text-sm text-slate-600">{client.contactPerson}</p>
              </div>
            </div>
            <Badge className={getStatusColor(client.status)}>
              {getStatusIcon(client.status)}
              <span className="ml-1">{getStatusText(client.status)}</span>
            </Badge>
          </div>

          <div className="space-y-2 mb-4">
            <div className="flex items-center space-x-2 text-sm text-slate-600">
              <Mail className="w-4 h-4" />
              <span>{client.email}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-slate-600">
              <Building2 className="w-4 h-4" />
              <span>{client.projectType}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-slate-600">
              <Calendar className="w-4 h-4" />
              <span>Cliente desde {new Date(client.createdAt).toLocaleDateString('pt-BR')}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
            <div className="text-center p-2 bg-slate-50 rounded">
              <p className="font-medium text-slate-900">{stats.materials}</p>
              <p className="text-slate-600">Materiais</p>
            </div>
            <div className="text-center p-2 bg-slate-50 rounded">
              <p className="font-medium text-slate-900">{stats.campaigns}</p>
              <p className="text-slate-600">Campanhas</p>
            </div>
          </div>

          <div className="flex space-x-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1"
                  onClick={() => setSelectedClient(client)}
                >
                  <Eye className="w-4 h-4 mr-1" />
                  Ver Detalhes
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle className="flex items-center space-x-2">
                    <Building2 className="w-5 h-5" />
                    <span>{client.name}</span>
                  </DialogTitle>
                  <DialogDescription>
                    Informações detalhadas do cliente
                  </DialogDescription>
                </DialogHeader>
                
                <div className="space-y-6">
                  {/* Informações Básicas */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium text-slate-700">Nome da Empresa</Label>
                      <p className="text-sm text-slate-900 mt-1">{client.name}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-slate-700">Pessoa de Contato</Label>
                      <p className="text-sm text-slate-900 mt-1">{client.contactPerson}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-slate-700">Email</Label>
                      <p className="text-sm text-slate-900 mt-1">{client.email}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-slate-700">Tipo de Projeto</Label>
                      <p className="text-sm text-slate-900 mt-1">{client.projectType}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-slate-700">Status</Label>
                      <Badge className={`mt-1 ${getStatusColor(client.status)}`}>
                        {getStatusIcon(client.status)}
                        <span className="ml-1">{getStatusText(client.status)}</span>
                      </Badge>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-slate-700">Cliente desde</Label>
                      <p className="text-sm text-slate-900 mt-1">
                        {new Date(client.createdAt).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                  </div>

                  {/* Estatísticas */}
                  <div>
                    <Label className="text-sm font-medium text-slate-700 mb-3 block">Estatísticas</Label>
                    <div className="grid grid-cols-4 gap-4">
                      <div className="text-center p-3 bg-blue-50 rounded-lg">
                        <p className="text-lg font-bold text-blue-900">{stats.materials}</p>
                        <p className="text-xs text-blue-600">Materiais</p>
                      </div>
                      <div className="text-center p-3 bg-green-50 rounded-lg">
                        <p className="text-lg font-bold text-green-900">{stats.campaigns}</p>
                        <p className="text-xs text-green-600">Campanhas</p>
                      </div>
                      <div className="text-center p-3 bg-yellow-50 rounded-lg">
                        <p className="text-lg font-bold text-yellow-900">{stats.pendingMaterials}</p>
                        <p className="text-xs text-yellow-600">Pendentes</p>
                      </div>
                      <div className="text-center p-3 bg-purple-50 rounded-lg">
                        <p className="text-lg font-bold text-purple-900">
                          R$ {stats.totalSpent.toFixed(0)}
                        </p>
                        <p className="text-xs text-purple-600">Investido</p>
                      </div>
                    </div>
                  </div>

                  {/* Ações */}
                  <div className="flex space-x-3 pt-4 border-t">
                    <Select 
                      value={client.status} 
                      onValueChange={(value) => handleStatusChange(client.id, value)}
                    >
                      <SelectTrigger className="w-40">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Ativo</SelectItem>
                        <SelectItem value="pending">Pendente</SelectItem>
                        <SelectItem value="inactive">Inativo</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <Button variant="outline" className="flex-1">
                      <Edit className="w-4 h-4 mr-2" />
                      Editar Cliente
                    </Button>
                    
                    <Button variant="outline">
                      <Mail className="w-4 h-4 mr-2" />
                      Enviar Email
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            <Button variant="outline" size="sm">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Gestão de Clientes</h1>
          <p className="text-slate-600 mt-1">
            Gerencie todos os clientes e seus projetos
          </p>
        </div>
        
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Novo Cliente
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Criar Novo Cliente</DialogTitle>
              <DialogDescription>
                Adicione um novo cliente ao sistema
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Nome da Empresa</Label>
                  <Input
                    id="name"
                    value={newClient.name}
                    onChange={(e) => setNewClient({...newClient, name: e.target.value})}
                    placeholder="Ex: Empresa ABC"
                  />
                </div>
                <div>
                  <Label htmlFor="contactPerson">Pessoa de Contato</Label>
                  <Input
                    id="contactPerson"
                    value={newClient.contactPerson}
                    onChange={(e) => setNewClient({...newClient, contactPerson: e.target.value})}
                    placeholder="Ex: João Silva"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={newClient.email}
                  onChange={(e) => setNewClient({...newClient, email: e.target.value})}
                  placeholder="contato@empresa.com"
                />
              </div>
              
              <div>
                <Label htmlFor="projectType">Tipo de Projeto</Label>
                <Select 
                  value={newClient.projectType} 
                  onValueChange={(value) => setNewClient({...newClient, projectType: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo de projeto" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Social Media">Social Media</SelectItem>
                    <SelectItem value="Performance Marketing">Performance Marketing</SelectItem>
                    <SelectItem value="E-commerce">E-commerce</SelectItem>
                    <SelectItem value="Branding">Branding</SelectItem>
                    <SelectItem value="SEO">SEO</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="status">Status Inicial</Label>
                <Select 
                  value={newClient.status} 
                  onValueChange={(value) => setNewClient({...newClient, status: value})}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pendente</SelectItem>
                    <SelectItem value="active">Ativo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex space-x-3 pt-4">
                <Button onClick={handleCreateClient} className="flex-1">
                  Criar Cliente
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setIsCreateDialogOpen(false)}
                  className="flex-1"
                >
                  Cancelar
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <Users className="w-8 h-8 text-blue-600" />
              <div>
                <p className="text-2xl font-bold text-slate-900">{clients.length}</p>
                <p className="text-sm text-slate-600">Total de Clientes</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-8 h-8 text-green-600" />
              <div>
                <p className="text-2xl font-bold text-slate-900">
                  {clients.filter(c => c.status === 'active').length}
                </p>
                <p className="text-sm text-slate-600">Clientes Ativos</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <Clock className="w-8 h-8 text-yellow-600" />
              <div>
                <p className="text-2xl font-bold text-slate-900">
                  {clients.filter(c => c.status === 'pending').length}
                </p>
                <p className="text-sm text-slate-600">Aguardando Aprovação</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <Building2 className="w-8 h-8 text-purple-600" />
              <div>
                <p className="text-2xl font-bold text-slate-900">
                  {new Set(clients.map(c => c.projectType)).size}
                </p>
                <p className="text-sm text-slate-600">Tipos de Projeto</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filtros e Busca */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <Input
                  placeholder="Buscar clientes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full sm:w-48">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Filtrar por status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os status</SelectItem>
                <SelectItem value="active">Ativos</SelectItem>
                <SelectItem value="pending">Pendentes</SelectItem>
                <SelectItem value="inactive">Inativos</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Clientes */}
      <Tabs defaultValue="cards" className="w-full">
        <TabsList>
          <TabsTrigger value="cards">Cards</TabsTrigger>
          <TabsTrigger value="table">Tabela</TabsTrigger>
        </TabsList>
        
        <TabsContent value="cards" className="space-y-6">
          {filteredClients.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <Users className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-slate-900 mb-2">
                  Nenhum cliente encontrado
                </h3>
                <p className="text-slate-600">
                  {searchTerm || filterStatus !== 'all' 
                    ? 'Tente ajustar os filtros de busca.'
                    : 'Comece adicionando seu primeiro cliente.'
                  }
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredClients.map((client) => (
                <ClientCard key={client.id} client={client} />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="table">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Contato</TableHead>
                    <TableHead>Projeto</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Materiais</TableHead>
                    <TableHead>Campanhas</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredClients.map((client) => {
                    const stats = getClientStats(client.id);
                    return (
                      <TableRow key={client.id}>
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                              <Building2 className="w-4 h-4 text-blue-600" />
                            </div>
                            <div>
                              <p className="font-medium text-slate-900">{client.name}</p>
                              <p className="text-sm text-slate-600">{client.email}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{client.contactPerson}</TableCell>
                        <TableCell>{client.projectType}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(client.status)}>
                            {getStatusIcon(client.status)}
                            <span className="ml-1">{getStatusText(client.status)}</span>
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="text-center">
                            <p className="font-medium">{stats.materials}</p>
                            {stats.pendingMaterials > 0 && (
                              <p className="text-xs text-yellow-600">
                                {stats.pendingMaterials} pendentes
                              </p>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="text-center">{stats.campaigns}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Edit className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminClients;