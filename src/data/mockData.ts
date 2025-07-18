import { User, Material, Campaign, Document, Notification } from '../types';

export const mockUsers: User[] = [
  {
    id: 'admin-1',
    name: 'Administrador',
    email: 'admin@clientus.com',
    role: 'admin',
    contactPerson: 'Admin User',
    projectType: 'system',
    status: 'active',
    visibleMetrics: [],
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2025-01-01T00:00:00Z'
  },
  {
    id: 'client-1',
    name: 'Empresa ABC',
    email: 'contato@empresaabc.com',
    role: 'client',
    contactPerson: 'João Silva',
    projectType: 'Social Media',
    status: 'active',
    visibleMetrics: ['impressions', 'clicks', 'ctr', 'spent'],
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2025-01-01T00:00:00Z'
  },
  {
    id: 'client-2',
    name: 'Startup XYZ',
    email: 'hello@startupxyz.com',
    role: 'client',
    contactPerson: 'Maria Santos',
    projectType: 'Performance Marketing',
    status: 'active',
    visibleMetrics: ['impressions', 'clicks', 'ctr', 'spent', 'conversions'],
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2025-01-01T00:00:00Z'
  },
  {
    id: 'client-3',
    name: 'Loja Online',
    email: 'marketing@lojaonline.com',
    role: 'client',
    contactPerson: 'Pedro Costa',
    projectType: 'E-commerce',
    status: 'pending',
    visibleMetrics: ['impressions', 'clicks', 'conversions', 'spent'],
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2025-01-01T00:00:00Z'
  }
];

export const mockMaterials: Material[] = [
  {
    id: 'mat-1',
    clientId: 'client-1',
    title: 'Post Instagram - Promoção',
    description: 'Post promocional para Instagram com desconto de 20%',
    fileUrl: 'https://picsum.photos/800/800?random=1',
    fileType: 'image',
    thumbnailUrl: 'https://picsum.photos/200/200?random=1',
    scheduledDate: '2025-01-20T10:00:00Z',
    status: 'scheduled',
    approvalStatus: 'pending',
    comments: [
      {
        id: 'comment-1',
        userId: 'client-1',
        userName: 'João Silva',
        message: 'Gostei da arte, mas poderia ajustar a cor do botão?',
        createdAt: '2025-01-17T14:30:00Z'
      }
    ],
    createdAt: '2025-01-17T10:00:00Z',
    updatedAt: '2025-01-17T14:30:00Z'
  },
  {
    id: 'mat-2',
    clientId: 'client-1',
    title: 'Stories - Behind the Scenes',
    description: 'Stories mostrando bastidores da empresa',
    fileUrl: 'https://picsum.photos/800/1200?random=2',
    fileType: 'image',
    thumbnailUrl: 'https://picsum.photos/200/300?random=2',
    scheduledDate: '2025-01-18T15:30:00Z',
    status: 'published',
    approvalStatus: 'approved',
    comments: [
      {
        id: 'comment-2',
        userId: 'client-1',
        userName: 'João Silva',
        message: 'Perfeito! Aprovado.',
        createdAt: '2025-01-17T16:00:00Z'
      }
    ],
    createdAt: '2025-01-17T12:00:00Z',
    updatedAt: '2025-01-17T16:00:00Z'
  },
  {
    id: 'mat-3',
    clientId: 'client-2',
    title: 'Vídeo Explicativo',
    description: 'Vídeo explicando o produto principal',
    fileUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
    fileType: 'video',
    scheduledDate: '2025-01-22T09:00:00Z',
    status: 'draft',
    approvalStatus: 'revision',
    comments: [
      {
        id: 'comment-3',
        userId: 'client-2',
        userName: 'Maria Santos',
        message: 'Precisa ajustar o áudio no início do vídeo.',
        createdAt: '2025-01-17T11:00:00Z'
      }
    ],
    createdAt: '2025-01-17T09:00:00Z',
    updatedAt: '2025-01-17T11:00:00Z'
  },
  {
    id: 'mat-4',
    clientId: 'client-2',
    title: 'Carrossel LinkedIn',
    description: 'Carrossel educativo para LinkedIn',
    fileUrl: 'https://picsum.photos/800/600?random=3',
    fileType: 'image',
    thumbnailUrl: 'https://picsum.photos/200/150?random=3',
    scheduledDate: '2025-01-19T14:00:00Z',
    status: 'scheduled',
    approvalStatus: 'approved',
    comments: [],
    createdAt: '2025-01-17T08:00:00Z',
    updatedAt: '2025-01-17T08:00:00Z'
  }
];

export const mockCampaigns: Campaign[] = [
  {
    id: 'camp-1',
    clientId: 'client-1',
    name: 'Campanha Black Friday',
    platform: 'Facebook',
    status: 'active',
    budget: 5000.00,
    startDate: '2025-01-15T00:00:00Z',
    endDate: '2025-01-30T23:59:59Z',
    metrics: {
      impressions: 125000,
      clicks: 3200,
      ctr: 2.56,
      spent: 1250.00,
      conversions: 85,
      cpc: 0.39,
      cpm: 10.00
    },
    createdAt: '2025-01-15T00:00:00Z',
    updatedAt: '2025-01-17T12:00:00Z'
  },
  {
    id: 'camp-2',
    clientId: 'client-1',
    name: 'Awareness Instagram',
    platform: 'Instagram',
    status: 'active',
    budget: 2000.00,
    startDate: '2025-01-10T00:00:00Z',
    endDate: '2025-01-25T23:59:59Z',
    metrics: {
      impressions: 85000,
      clicks: 1800,
      ctr: 2.12,
      spent: 800.00,
      conversions: 42,
      cpc: 0.44,
      cpm: 9.41
    },
    createdAt: '2025-01-10T00:00:00Z',
    updatedAt: '2025-01-17T12:00:00Z'
  },
  {
    id: 'camp-3',
    clientId: 'client-2',
    name: 'Lead Generation',
    platform: 'Google Ads',
    status: 'active',
    budget: 8000.00,
    startDate: '2025-01-12T00:00:00Z',
    endDate: '2025-02-12T23:59:59Z',
    metrics: {
      impressions: 95000,
      clicks: 4200,
      ctr: 4.42,
      spent: 2100.00,
      conversions: 156,
      cpc: 0.50,
      cpm: 22.11
    },
    createdAt: '2025-01-12T00:00:00Z',
    updatedAt: '2025-01-17T12:00:00Z'
  }
];

export const mockDocuments: Document[] = [
  {
    id: 'doc-1',
    clientId: 'client-1',
    name: 'Briefing Inicial.pdf',
    fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    fileType: 'pdf',
    category: 'briefing',
    size: 245760,
    createdAt: '2025-01-01T00:00:00Z'
  },
  {
    id: 'doc-2',
    clientId: 'client-1',
    name: 'Contrato de Serviços.pdf',
    fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    fileType: 'pdf',
    category: 'contract',
    size: 512000,
    createdAt: '2025-01-01T00:00:00Z'
  },
  {
    id: 'doc-3',
    clientId: 'client-2',
    name: 'Relatório Mensal.xlsx',
    fileUrl: 'https://file-examples.com/storage/fe68c1f7c66b2b9c7e0b6e8/2017/10/file_example_XLS_10.xls',
    fileType: 'xlsx',
    category: 'report',
    size: 89600,
    createdAt: '2025-01-15T00:00:00Z'
  },
  {
    id: 'doc-4',
    clientId: 'client-2',
    name: 'Brand Guidelines.pdf',
    fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    fileType: 'pdf',
    category: 'briefing',
    size: 1024000,
    createdAt: '2025-01-05T00:00:00Z'
  }
];

export const mockNotifications: Notification[] = [
  {
    id: 'notif-1',
    userId: 'client-1',
    title: 'Material Pendente',
    message: 'Você tem 1 material aguardando aprovação',
    type: 'warning',
    read: false,
    createdAt: '2025-01-17T14:30:00Z'
  },
  {
    id: 'notif-2',
    userId: 'client-2',
    title: 'Material Rejeitado',
    message: 'O vídeo explicativo precisa de revisão',
    type: 'error',
    read: false,
    createdAt: '2025-01-17T11:00:00Z'
  },
  {
    id: 'notif-3',
    userId: 'admin-1',
    title: 'Novo Cliente',
    message: 'Loja Online aguarda aprovação',
    type: 'info',
    read: true,
    createdAt: '2025-01-17T09:00:00Z'
  }
];