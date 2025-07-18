import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Textarea } from '../../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../../components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import {
  FileImage,
  Play,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  MessageSquare,
  Filter,
  Search,
  Eye,
  Download,
  ThumbsUp,
  ThumbsDown,
  RotateCcw
} from 'lucide-react';
import { mockMaterials } from '../../data/mockData';

const ClientMaterials: React.FC = () => {
  const { user } = useAuth();
  const [selectedMaterial, setSelectedMaterial] = useState<any>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [comment, setComment] = useState('');

  if (!user) return null;

  // Filtrar materiais do cliente
  const clientMaterials = mockMaterials.filter(m => m.clientId === user.id);

  // Aplicar filtros
  const filteredMaterials = clientMaterials.filter(material => {
    const matchesSearch = material.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         material.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || material.approvalStatus === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800 border-green-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'rejected': return 'bg-red-100 text-red-800 border-red-200';
      case 'revision': return 'bg-orange-100 text-orange-800 border-orange-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return <CheckCircle className="w-4 h-4" />;
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'rejected': return <XCircle className="w-4 h-4" />;
      case 'revision': return <RotateCcw className="w-4 h-4" />;
      default: return <Eye className="w-4 h-4" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'approved': return 'Aprovado';
      case 'pending': return 'Pendente';
      case 'rejected': return 'Rejeitado';
      case 'revision': return 'Revisão';
      default: return 'Rascunho';
    }
  };

  const handleApproval = (materialId: string, action: 'approve' | 'reject' | 'revision') => {
    // Aqui seria feita a chamada para a API
    console.log(`${action} material ${materialId} with comment: ${comment}`);
    setComment('');
    setSelectedMaterial(null);
  };

  const MaterialCard = ({ material }: { material: any }) => (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="aspect-video bg-slate-100 relative">
        {material.fileUrl ? (
          material.fileType === 'video' ? (
            <div className="w-full h-full flex items-center justify-center bg-slate-200">
              <Play className="w-12 h-12 text-slate-600" />
            </div>
          ) : (
            <img
              src={material.thumbnailUrl || material.fileUrl}
              alt={material.title}
              className="w-full h-full object-cover"
            />
          )
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-slate-200">
            <FileImage className="w-12 h-12 text-slate-600" />
          </div>
        )}
        
        <div className="absolute top-2 right-2">
          <Badge className={getStatusColor(material.approvalStatus)}>
            {getStatusIcon(material.approvalStatus)}
            <span className="ml-1">{getStatusText(material.approvalStatus)}</span>
          </Badge>
        </div>
      </div>

      <CardContent className="p-4">
        <div className="space-y-3">
          <div>
            <h3 className="font-semibold text-slate-900 line-clamp-1">
              {material.title}
            </h3>
            {material.description && (
              <p className="text-sm text-slate-600 line-clamp-2 mt-1">
                {material.description}
              </p>
            )}
          </div>

          <div className="flex items-center justify-between text-xs text-slate-500">
            <div className="flex items-center space-x-1">
              <Calendar className="w-3 h-3" />
              <span>
                {material.scheduledDate 
                  ? new Date(material.scheduledDate).toLocaleDateString('pt-BR')
                  : 'Não agendado'
                }
              </span>
            </div>
            {material.comments.length > 0 && (
              <div className="flex items-center space-x-1">
                <MessageSquare className="w-3 h-3" />
                <span>{material.comments.length}</span>
              </div>
            )}
          </div>

          <div className="flex space-x-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1"
                  onClick={() => setSelectedMaterial(material)}
                >
                  <Eye className="w-4 h-4 mr-1" />
                  Visualizar
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>{material.title}</DialogTitle>
                  <DialogDescription>
                    {material.description}
                  </DialogDescription>
                </DialogHeader>
                
                <div className="space-y-6">
                  {/* Preview do Material */}
                  <div className="aspect-video bg-slate-100 rounded-lg overflow-hidden">
                    {material.fileUrl ? (
                      material.fileType === 'video' ? (
                        <video 
                          src={material.fileUrl} 
                          controls 
                          className="w-full h-full"
                        />
                      ) : (
                        <img
                          src={material.fileUrl}
                          alt={material.title}
                          className="w-full h-full object-contain"
                        />
                      )
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <FileImage className="w-16 h-16 text-slate-400" />
                      </div>
                    )}
                  </div>

                  {/* Informações do Material */}
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-slate-700">Status:</span>
                      <Badge className={`ml-2 ${getStatusColor(material.approvalStatus)}`}>
                        {getStatusText(material.approvalStatus)}
                      </Badge>
                    </div>
                    <div>
                      <span className="font-medium text-slate-700">Agendamento:</span>
                      <span className="ml-2 text-slate-600">
                        {material.scheduledDate 
                          ? new Date(material.scheduledDate).toLocaleString('pt-BR')
                          : 'Não agendado'
                        }
                      </span>
                    </div>
                  </div>

                  {/* Comentários */}
                  <div className="space-y-4">
                    <h4 className="font-medium text-slate-900">Comentários</h4>
                    {material.comments.length === 0 ? (
                      <p className="text-slate-500 text-sm">Nenhum comentário ainda.</p>
                    ) : (
                      <div className="space-y-3">
                        {material.comments.map((comment: any) => (
                          <div key={comment.id} className="p-3 bg-slate-50 rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-medium text-sm">{comment.userName}</span>
                              <span className="text-xs text-slate-500">
                                {new Date(comment.createdAt).toLocaleString('pt-BR')}
                              </span>
                            </div>
                            <p className="text-sm text-slate-700">{comment.message}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Ações de Aprovação */}
                  {material.approvalStatus === 'pending' && (
                    <div className="space-y-4 border-t pt-4">
                      <h4 className="font-medium text-slate-900">Ação Necessária</h4>
                      <Textarea
                        placeholder="Adicione um comentário (opcional)..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        className="min-h-[80px]"
                      />
                      <div className="flex space-x-3">
                        <Button
                          onClick={() => handleApproval(material.id, 'approve')}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <ThumbsUp className="w-4 h-4 mr-2" />
                          Aprovar
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => handleApproval(material.id, 'revision')}
                          className="border-orange-200 text-orange-700 hover:bg-orange-50"
                        >
                          <RotateCcw className="w-4 h-4 mr-2" />
                          Solicitar Revisão
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => handleApproval(material.id, 'reject')}
                          className="border-red-200 text-red-700 hover:bg-red-50"
                        >
                          <ThumbsDown className="w-4 h-4 mr-2" />
                          Rejeitar
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </DialogContent>
            </Dialog>

            {material.fileUrl && (
              <Button variant="outline" size="sm" asChild>
                <a href={material.fileUrl} download target="_blank" rel="noopener noreferrer">
                  <Download className="w-4 h-4" />
                </a>
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Materiais</h1>
        <p className="text-slate-600 mt-1">
          Gerencie e aprove os materiais do seu projeto
        </p>
      </div>

      {/* Filtros e Busca */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <Input
                  placeholder="Buscar materiais..."
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
                <SelectItem value="pending">Pendente</SelectItem>
                <SelectItem value="approved">Aprovado</SelectItem>
                <SelectItem value="rejected">Rejeitado</SelectItem>
                <SelectItem value="revision">Revisão</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Tabs de Visualização */}
      <Tabs defaultValue="grid" className="w-full">
        <TabsList>
          <TabsTrigger value="grid">Grade</TabsTrigger>
          <TabsTrigger value="list">Lista</TabsTrigger>
        </TabsList>
        
        <TabsContent value="grid" className="space-y-6">
          {filteredMaterials.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <FileImage className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-slate-900 mb-2">
                  Nenhum material encontrado
                </h3>
                <p className="text-slate-600">
                  {searchTerm || filterStatus !== 'all' 
                    ? 'Tente ajustar os filtros de busca.'
                    : 'Seus materiais aparecerão aqui quando forem criados.'
                  }
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMaterials.map((material) => (
                <MaterialCard key={material.id} material={material} />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="list" className="space-y-4">
          {filteredMaterials.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <FileImage className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-slate-900 mb-2">
                  Nenhum material encontrado
                </h3>
                <p className="text-slate-600">
                  {searchTerm || filterStatus !== 'all' 
                    ? 'Tente ajustar os filtros de busca.'
                    : 'Seus materiais aparecerão aqui quando forem criados.'
                  }
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {filteredMaterials.map((material) => (
                <Card key={material.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-slate-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        {material.fileType === 'video' ? (
                          <Play className="w-6 h-6 text-slate-600" />
                        ) : (
                          <FileImage className="w-6 h-6 text-slate-600" />
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-slate-900 truncate">
                          {material.title}
                        </h3>
                        {material.description && (
                          <p className="text-sm text-slate-600 line-clamp-2 mt-1">
                            {material.description}
                          </p>
                        )}
                        <div className="flex items-center space-x-4 mt-2 text-xs text-slate-500">
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-3 h-3" />
                            <span>
                              {material.scheduledDate 
                                ? new Date(material.scheduledDate).toLocaleDateString('pt-BR')
                                : 'Não agendado'
                              }
                            </span>
                          </div>
                          {material.comments.length > 0 && (
                            <div className="flex items-center space-x-1">
                              <MessageSquare className="w-3 h-3" />
                              <span>{material.comments.length} comentários</span>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <Badge className={getStatusColor(material.approvalStatus)}>
                          {getStatusIcon(material.approvalStatus)}
                          <span className="ml-1">{getStatusText(material.approvalStatus)}</span>
                        </Badge>
                        
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => setSelectedMaterial(material)}
                            >
                              <Eye className="w-4 h-4 mr-1" />
                              Ver
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                            {/* Mesmo conteúdo do modal da grade */}
                            <DialogHeader>
                              <DialogTitle>{material.title}</DialogTitle>
                              <DialogDescription>
                                {material.description}
                              </DialogDescription>
                            </DialogHeader>
                            
                            <div className="space-y-6">
                              {/* Preview do Material */}
                              <div className="aspect-video bg-slate-100 rounded-lg overflow-hidden">
                                {material.fileUrl ? (
                                  material.fileType === 'video' ? (
                                    <video 
                                      src={material.fileUrl} 
                                      controls 
                                      className="w-full h-full"
                                    />
                                  ) : (
                                    <img
                                      src={material.fileUrl}
                                      alt={material.title}
                                      className="w-full h-full object-contain"
                                    />
                                  )
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center">
                                    <FileImage className="w-16 h-16 text-slate-400" />
                                  </div>
                                )}
                              </div>

                              {/* Informações do Material */}
                              <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                  <span className="font-medium text-slate-700">Status:</span>
                                  <Badge className={`ml-2 ${getStatusColor(material.approvalStatus)}`}>
                                    {getStatusText(material.approvalStatus)}
                                  </Badge>
                                </div>
                                <div>
                                  <span className="font-medium text-slate-700">Agendamento:</span>
                                  <span className="ml-2 text-slate-600">
                                    {material.scheduledDate 
                                      ? new Date(material.scheduledDate).toLocaleString('pt-BR')
                                      : 'Não agendado'
                                    }
                                  </span>
                                </div>
                              </div>

                              {/* Comentários */}
                              <div className="space-y-4">
                                <h4 className="font-medium text-slate-900">Comentários</h4>
                                {material.comments.length === 0 ? (
                                  <p className="text-slate-500 text-sm">Nenhum comentário ainda.</p>
                                ) : (
                                  <div className="space-y-3">
                                    {material.comments.map((comment: any) => (
                                      <div key={comment.id} className="p-3 bg-slate-50 rounded-lg">
                                        <div className="flex items-center justify-between mb-2">
                                          <span className="font-medium text-sm">{comment.userName}</span>
                                          <span className="text-xs text-slate-500">
                                            {new Date(comment.createdAt).toLocaleString('pt-BR')}
                                          </span>
                                        </div>
                                        <p className="text-sm text-slate-700">{comment.message}</p>
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </div>

                              {/* Ações de Aprovação */}
                              {material.approvalStatus === 'pending' && (
                                <div className="space-y-4 border-t pt-4">
                                  <h4 className="font-medium text-slate-900">Ação Necessária</h4>
                                  <Textarea
                                    placeholder="Adicione um comentário (opcional)..."
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    className="min-h-[80px]"
                                  />
                                  <div className="flex space-x-3">
                                    <Button
                                      onClick={() => handleApproval(material.id, 'approve')}
                                      className="bg-green-600 hover:bg-green-700"
                                    >
                                      <ThumbsUp className="w-4 h-4 mr-2" />
                                      Aprovar
                                    </Button>
                                    <Button
                                      variant="outline"
                                      onClick={() => handleApproval(material.id, 'revision')}
                                      className="border-orange-200 text-orange-700 hover:bg-orange-50"
                                    >
                                      <RotateCcw className="w-4 h-4 mr-2" />
                                      Solicitar Revisão
                                    </Button>
                                    <Button
                                      variant="outline"
                                      onClick={() => handleApproval(material.id, 'reject')}
                                      className="border-red-200 text-red-700 hover:bg-red-50"
                                    >
                                      <ThumbsDown className="w-4 h-4 mr-2" />
                                      Rejeitar
                                    </Button>
                                  </div>
                                </div>
                              )}
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ClientMaterials;