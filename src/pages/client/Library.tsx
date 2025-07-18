import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../../components/ui/dialog';
import {
  FileText,
  Download,
  Search,
  Filter,
  Calendar,
  FileImage,
  File,
  Eye,
  Folder
} from 'lucide-react';
import { mockDocuments } from '../../data/mockData';

const ClientLibrary: React.FC = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [selectedDocument, setSelectedDocument] = useState<any>(null);

  if (!user) return null;

  // Filtrar documentos do cliente
  const clientDocuments = mockDocuments.filter(d => d.clientId === user.id);

  // Aplicar filtros
  const filteredDocuments = clientDocuments.filter(document => {
    const matchesSearch = document.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || document.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  // Agrupar por categoria
  const documentsByCategory = filteredDocuments.reduce((acc, doc) => {
    if (!acc[doc.category]) {
      acc[doc.category] = [];
    }
    acc[doc.category].push(doc);
    return acc;
  }, {} as Record<string, typeof filteredDocuments>);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'briefing': return <FileText className="w-5 h-5 text-blue-600" />;
      case 'contract': return <File className="w-5 h-5 text-green-600" />;
      case 'report': return <FileImage className="w-5 h-5 text-purple-600" />;
      default: return <File className="w-5 h-5 text-slate-600" />;
    }
  };

  const getCategoryName = (category: string) => {
    switch (category) {
      case 'briefing': return 'Briefings';
      case 'contract': return 'Contratos';
      case 'report': return 'Relatórios';
      default: return 'Geral';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'briefing': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'contract': return 'bg-green-100 text-green-800 border-green-200';
      case 'report': return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (fileType: string) => {
    switch (fileType.toLowerCase()) {
      case 'pdf': return '📄';
      case 'doc':
      case 'docx': return '📝';
      case 'xls':
      case 'xlsx': return '📊';
      case 'ppt':
      case 'pptx': return '📋';
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif': return '🖼️';
      default: return '📁';
    }
  };

  const DocumentCard = ({ document }: { document: any }) => (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start space-x-3">
          <div className="text-2xl">{getFileIcon(document.fileType)}</div>
          
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-slate-900 truncate">
              {document.name}
            </h3>
            
            <div className="flex items-center space-x-4 mt-2 text-sm text-slate-600">
              <Badge className={getCategoryColor(document.category)}>
                {getCategoryName(document.category)}
              </Badge>
              <span>{formatFileSize(document.size)}</span>
              <div className="flex items-center space-x-1">
                <Calendar className="w-3 h-3" />
                <span>{new Date(document.createdAt).toLocaleDateString('pt-BR')}</span>
              </div>
            </div>
          </div>

          <div className="flex space-x-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setSelectedDocument(document)}
                >
                  <Eye className="w-4 h-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle className="flex items-center space-x-2">
                    <span className="text-xl">{getFileIcon(document.fileType)}</span>
                    <span>{document.name}</span>
                  </DialogTitle>
                  <DialogDescription>
                    Informações do documento
                  </DialogDescription>
                </DialogHeader>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-slate-700">Categoria:</span>
                      <Badge className={`ml-2 ${getCategoryColor(document.category)}`}>
                        {getCategoryName(document.category)}
                      </Badge>
                    </div>
                    <div>
                      <span className="font-medium text-slate-700">Tamanho:</span>
                      <span className="ml-2 text-slate-600">{formatFileSize(document.size)}</span>
                    </div>
                    <div>
                      <span className="font-medium text-slate-700">Tipo:</span>
                      <span className="ml-2 text-slate-600 uppercase">{document.fileType}</span>
                    </div>
                    <div>
                      <span className="font-medium text-slate-700">Data:</span>
                      <span className="ml-2 text-slate-600">
                        {new Date(document.createdAt).toLocaleDateString('pt-BR')}
                      </span>
                    </div>
                  </div>

                  <div className="flex space-x-3 pt-4 border-t">
                    <Button asChild className="flex-1">
                      <a href={document.fileUrl} target="_blank" rel="noopener noreferrer">
                        <Eye className="w-4 h-4 mr-2" />
                        Visualizar
                      </a>
                    </Button>
                    <Button variant="outline" asChild className="flex-1">
                      <a href={document.fileUrl} download>
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </a>
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            <Button variant="outline" size="sm" asChild>
              <a href={document.fileUrl} download>
                <Download className="w-4 h-4" />
              </a>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Biblioteca</h1>
        <p className="text-slate-600 mt-1">
          Acesse todos os documentos do seu projeto
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
                  placeholder="Buscar documentos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-full sm:w-48">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Filtrar por categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as categorias</SelectItem>
                <SelectItem value="briefing">Briefings</SelectItem>
                <SelectItem value="contract">Contratos</SelectItem>
                <SelectItem value="report">Relatórios</SelectItem>
                <SelectItem value="general">Geral</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {Object.entries(documentsByCategory).map(([category, docs]) => (
          <Card key={category}>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                {getCategoryIcon(category)}
                <div>
                  <p className="font-medium text-slate-900">{getCategoryName(category)}</p>
                  <p className="text-sm text-slate-600">{docs.length} documentos</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Lista de Documentos */}
      {filteredDocuments.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <Folder className="w-16 h-16 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-900 mb-2">
              Nenhum documento encontrado
            </h3>
            <p className="text-slate-600">
              {searchTerm || filterCategory !== 'all' 
                ? 'Tente ajustar os filtros de busca.'
                : 'Seus documentos aparecerão aqui quando forem adicionados.'
              }
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {Object.entries(documentsByCategory).map(([category, docs]) => (
            <div key={category}>
              <div className="flex items-center space-x-3 mb-4">
                {getCategoryIcon(category)}
                <h2 className="text-xl font-semibold text-slate-900">
                  {getCategoryName(category)}
                </h2>
                <Badge variant="secondary">{docs.length}</Badge>
              </div>
              
              <div className="grid grid-cols-1 gap-4">
                {docs.map((document) => (
                  <DocumentCard key={document.id} document={document} />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Upload Area (Placeholder) */}
      <Card className="border-2 border-dashed border-slate-300 hover:border-slate-400 transition-colors">
        <CardContent className="p-8 text-center">
          <div className="space-y-4">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto">
              <FileText className="w-8 h-8 text-slate-600" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-slate-900">
                Precisa de um documento?
              </h3>
              <p className="text-slate-600 mt-1">
                Entre em contato com nossa equipe para solicitar documentos adicionais
              </p>
            </div>
            <Button variant="outline">
              Solicitar Documento
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ClientLibrary;