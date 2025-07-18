import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../../components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { 
  FileImage, 
  Plus, 
  Search, 
  Filter,
  Upload,
  Calendar,
  Eye,
  MessageSquare,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  Download,
  Edit,
  Trash2,
  MoreHorizontal,
  Users,
  BarChart3
} from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../../components/ui/dropdown-menu';

const AdminMaterials: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [clientFilter, setClientFilter] = useState('all');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [selectedMaterial, setSelectedMaterial] = useState<any>(null);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);

  // Mock materials data
  const materials = [
    {
      id: '1',
      title: 'Post Instagram - Black Friday',
      description: 'Post promocional para campanha Black Friday 2024',
      clientId: '1',
      clientName: 'Empresa Exemplo',
      fileUrl: '/api/placeholder/400/400',
      fileType: 'image/jpeg',
      thumbnailUrl: '/api/placeholder/200/200',
      scheduledDate: '2024-01-20T14:00:00',
      status: 'scheduled',
      approvalStatus: 'approved',
      comments: [
        {
          id: '1',
          userId: 'client-1',
          userName: 'João Silva',
          message: 'Aprovado! Ficou excelente.',
          createdAt: '2024-01-19T10:30:00'
        }
      ],
      createdAt: '2024-01-18T09:00:00',
      updatedAt: '2024-01-19T10:30:00'
    },
    {
      id: '2',
      title: 'Story Facebook - Lançamento Produto',
      description: 'Story para divulgação do novo produto',
      clientId: '2',
      clientName: 'Tech Solutions',
      fileUrl: '/api/placeholder/400/600',
      fileType: 'image/jpeg',
      thumbnailUrl: '/api/placeholder/200/300',
      scheduledDate: '2024-01-22T09:30:00',
      status: 'draft',
      approvalStatus: 'pending',
      comments: [],
      createdAt: '2024-01-19T14:00:00',
      updatedAt: '2024-01-19T14:00:00'
    },
    {
      id: '3',
      title: 'Banner Site - Campanha Verão',
      description: 'Banner principal para campanha de verão',
      clientId: '1',
      clientName: 'Empresa Exemplo',
      fileUrl: '/api/placeholder/800/400',
      fileType: 'image/jpeg',
      thumbnailUrl: '/api/placeholder/400/200',
      scheduledDate: '2024-01-25T16:00:00',
      status: 'draft',
      approvalStatus: 'revision',
      comments: [
        {
          id: '2',
          userId: 'client-1',
          userName: 'João Silva',
          message: 'Precisa ajustar as cores da marca',
          createdAt: '2024-01-19T16:45:00'
        }
      ],
      createdAt: '2024-01-19T11:00:00',
      updatedAt: '2024-01-19T16:45:00'
    },
    {
      id: '4',
      title: 'Vídeo TikTok - Tendência',
      description: 'Vídeo seguindo tendência atual do TikTok',
      clientId: '3',
      clientName: 'Marketing Pro',
      fileUrl: '/api/placeholder/400/600',
      fileType: 'video/mp4',
      thumbnailUrl: '/api/placeholder/200/300',
      scheduledDate: '2024-01-23T12:00:00',
      status: 'published',
      approvalStatus: 'approved',
      comments: [
        {
          id: '3',
          userId: 'client-3',
          userName: 'Carlos Oliveira',
          message: 'Perfeito! Publicar imediatamente.',
          createdAt: '2024-01-20T08:15:00'
        }
      ],
      createdAt: '2024-01-17T13:30:00',
      updatedAt: '2024-01-20T08:15:00'
    }
  ];

  const clients = [
    { id: '1', name: 'Empresa Exemplo' },
    { id: '2', name: 'Tech Solutions' },
    { id: '3', name: 'Marketing Pro' },
    { id: '4', name: 'E-commerce Plus' }
  ];

  const filteredMaterials = materials.filter(material => {
    const matchesSearch = material.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         material.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         material.clientName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || material.approvalStatus === statusFilter;
    const matchesClient = clientFilter === 'all' || material.clientId === clientFilter;
    return matchesSearch && matchesStatus && matchesClient;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'revision': return 'bg-orange-100 text-orange-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return <CheckCircle className="w-4 h-4" />;
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'revision': return <AlertCircle className="w-4 h-4" />;
      case 'rejected': return <XCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'approved': return 'Aprovado';
      case 'pending': return 'Pendente';
      case 'revision': return 'Revisão';
      case 'rejected': return 'Rejeitado';
      default: return status;
    }
  };

  const getPublishStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-blue-100 text-blue-800';
      case 'scheduled': return 'bg-purple-100 text-purple-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPublishStatusLabel = (status: string) => {
    switch (status) {
      case 'published': return 'Publicado';
      case 'scheduled': return 'Agendado';
      case 'draft': return 'Rascunho';
      default: return status;
    }
  };

  const handlePreviewMaterial = (material: any) => {
    setSelectedMaterial(material);
    setIsPreviewModalOpen(true);
  };

  const handleApprovalAction = (materialId: string, action: 'approve' | 'reject' | 'request_revision') => {
    console.log('Approval action:', action, 'for material:', materialId);
    // Handle approval action
  };

  const MaterialCard = ({ material }: { material: any }) => (
    <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all">
      <CardContent className="p-4">
        <div className="flex items-start space-x-4">
          {/* Thumbnail */}
          <div className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
            {material.fileType.startsWith('image/') ? (
              <img 
                src={material.thumbnailUrl} 
                alt={material.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <FileImage className="w-8 h-8 text-gray-400" />
            )}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-900 truncate">
                {material.title}
              </h3>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => handlePreviewMaterial(material)}>
                    <Eye className="w-4 h-4 mr-2" />
                    Visualizar
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Edit className="w-4 h-4 mr-2" />
                    Editar
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-red-600">
                    <Trash2 className="w-4 h-4 mr-2" />
                    Excluir
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <p className="text-xs text-gray-600 mb-3 line-clamp-2">
              {material.description}
            </p>

            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <Badge variant="outline" className="text-xs">
                  {material.clientName}
                </Badge>
                <Badge className={getPublishStatusColor(material.status) + ' text-xs'}>
                  {getPublishStatusLabel(material.status)}
                </Badge>
              </div>
              <div className="text-xs text-gray-500">
                {material.scheduledDate && new Date(material.scheduledDate).toLocaleDateString('pt-BR')}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <Badge className={getStatusColor(material.approvalStatus) + ' text-xs'}>
                {getStatusIcon(material.approvalStatus)}
                <span className="ml-1">{getStatusLabel(material.approvalStatus)}</span>
              </Badge>
              
              <div className="flex items-center space-x-1">
                {material.comments.length > 0 && (
                  <div className="flex items-center space-x-1 text-xs text-gray-500">
                    <MessageSquare className="w-3 h-3" />
                    <span>{material.comments.length}</span>
                  </div>
                )}
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => handlePreviewMaterial(material)}
                >
                  <Eye className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const MaterialPreview = ({ material }: { material: any }) => (
    <div className="space-y-6">
      {/* Material Info */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{material.title}</h3>
          <p className="text-gray-600">{material.description}</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <Badge variant="outline">{material.clientName}</Badge>
          <Badge className={getPublishStatusColor(material.status)}>
            {getPublishStatusLabel(material.status)}
          </Badge>
          <Badge className={getStatusColor(material.approvalStatus)}>
            {getStatusIcon(material.approvalStatus)}
            <span className="ml-1">{getStatusLabel(material.approvalStatus)}</span>
          </Badge>
        </div>

        {material.scheduledDate && (
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Calendar className="w-4 h-4" />
            <span>Agendado para: {new Date(material.scheduledDate).toLocaleString('pt-BR')}</span>
          </div>
        )}
      </div>

      {/* Material Preview */}
      <div className="bg-gray-100 rounded-lg p-4 text-center">
        {material.fileType.startsWith('image/') ? (
          <img 
            src={material.fileUrl} 
            alt={material.title}
            className="max-w-full max-h-96 mx-auto rounded-lg"
          />
        ) : (
          <div className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center">
            <FileImage className="w-16 h-16 text-gray-400" />
            <span className="ml-2 text-gray-600">Arquivo: {material.fileType}</span>
          </div>
        )}
      </div>

      {/* Admin Actions */}
      {material.approvalStatus === 'pending' && (
        <div className="flex items-center space-x-2 p-4 bg-yellow-50 rounded-lg">
          <AlertCircle className="w-5 h-5 text-yellow-600" />
          <span className="text-sm text-yellow-800 flex-1">
            Este material está aguardando aprovação do cliente
          </span>
          <div className="flex space-x-2">
            <Button 
              size="sm" 
              variant="outline"
              onClick={() => handleApprovalAction(material.id, 'request_revision')}
            >
              Solicitar Revisão
            </Button>
            <Button 
              size="sm" 
              className="bg-green-600 hover:bg-green-700"
              onClick={() => handleApprovalAction(material.id, 'approve')}
            >
              Aprovar como Admin
            </Button>
          </div>
        </div>
      )}

      {/* Comments */}
      {material.comments.length > 0 && (
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-gray-900">Comentários</h4>
          <div className="space-y-3">
            {material.comments.map((comment: any) => (
              <div key={comment.id} className="bg-gray-50 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-900">{comment.userName}</span>
                  <span className="text-xs text-gray-500">
                    {new Date(comment.createdAt).toLocaleString('pt-BR')}
                  </span>
                </div>
                <p className="text-sm text-gray-700">{comment.message}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestão de Materiais</h1>
          <p className="text-gray-600">Gerencie todos os materiais dos clientes</p>
        </div>
        <Dialog open={isUploadModalOpen} onOpenChange={setIsUploadModalOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Novo Material
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Upload de Material</DialogTitle>
              <DialogDescription>
                Faça upload de um novo material para um cliente
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="client">Cliente</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o cliente" />
                    </SelectTrigger>
                    <SelectContent>
                      {clients.map((client) => (
                        <SelectItem key={client.id} value={client.id}>
                          {client.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="scheduledDate">Data de Publicação</Label>
                  <Input
                    id="scheduledDate"
                    type="datetime-local"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="title">Título</Label>
                <Input
                  id="title"
                  placeholder="Título do material"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Descrição</Label>
                <Textarea
                  id="description"
                  placeholder="Descrição do material"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label>Arquivo</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">
                    Clique para fazer upload ou arraste o arquivo aqui
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Suporta: JPG, PNG, MP4, GIF (máx. 10MB)
                  </p>
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <Button variant="outline" onClick={() => setIsUploadModalOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={() => setIsUploadModalOpen(false)}>
                  Fazer Upload
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total de Materiais</p>
                <p className="text-2xl font-bold text-gray-900">{materials.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <FileImage className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pendentes</p>
                <p className="text-2xl font-bold text-gray-900">
                  {materials.filter(m => m.approvalStatus === 'pending').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Aprovados</p>
                <p className="text-2xl font-bold text-gray-900">
                  {materials.filter(m => m.approvalStatus === 'approved').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Publicados</p>
                <p className="text-2xl font-bold text-gray-900">
                  {materials.filter(m => m.status === 'published').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Buscar por título, descrição ou cliente..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Status de aprovação" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os Status</SelectItem>
                <SelectItem value="pending">Pendente</SelectItem>
                <SelectItem value="approved">Aprovado</SelectItem>
                <SelectItem value="revision">Revisão</SelectItem>
                <SelectItem value="rejected">Rejeitado</SelectItem>
              </SelectContent>
            </Select>
            <Select value={clientFilter} onValueChange={setClientFilter}>
              <SelectTrigger className="w-48">
                <Users className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Filtrar por cliente" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os Clientes</SelectItem>
                {clients.map((client) => (
                  <SelectItem key={client.id} value={client.id}>
                    {client.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Materials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMaterials.map((material) => (
          <MaterialCard key={material.id} material={material} />
        ))}
      </div>

      {filteredMaterials.length === 0 && (
        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardContent className="p-12 text-center">
            <FileImage className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Nenhum material encontrado
            </h3>
            <p className="text-gray-600 mb-4">
              Não há materiais que correspondam aos filtros selecionados.
            </p>
            <Button onClick={() => setIsUploadModalOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Adicionar Material
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Material Preview Modal */}
      <Dialog open={isPreviewModalOpen} onOpenChange={setIsPreviewModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Visualizar Material</DialogTitle>
          </DialogHeader>
          {selectedMaterial && <MaterialPreview material={selectedMaterial} />}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminMaterials;