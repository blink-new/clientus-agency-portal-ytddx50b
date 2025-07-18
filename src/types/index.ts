export interface User {
  id: string;
  name: string;
  email: string;
  role: 'client' | 'admin';
  avatar?: string;
  company?: string;
  contactPerson?: string;
  projectType?: string;
  status: 'active' | 'inactive' | 'pending';
  visibleMetrics?: string[];
  createdAt: string;
  updatedAt?: string;
}

export interface Material {
  id: string;
  clientId: string;
  title: string;
  description?: string;
  fileUrl?: string;
  fileType?: string;
  thumbnailUrl?: string;
  scheduledDate?: string;
  status: 'draft' | 'scheduled' | 'published' | 'archived';
  approvalStatus: 'pending' | 'approved' | 'rejected' | 'revision';
  comments: Comment[];
  createdAt: string;
  updatedAt: string;
}

export interface Campaign {
  id: string;
  clientId: string;
  name: string;
  platform: string;
  status: 'active' | 'paused' | 'completed' | 'draft';
  budget: number;
  startDate?: string;
  endDate?: string;
  metrics: {
    impressions?: number;
    clicks?: number;
    ctr?: number;
    spent?: number;
    conversions?: number;
    cpc?: number;
    cpm?: number;
  };
  createdAt: string;
  updatedAt: string;
}

export interface Document {
  id: string;
  clientId: string;
  name: string;
  fileUrl: string;
  fileType: string;
  category: 'briefing' | 'contract' | 'report' | 'general';
  size: number;
  createdAt: string;
}

export interface Comment {
  id: string;
  userId: string;
  userName: string;
  message: string;
  createdAt: string;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  createdAt: string;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  loading: boolean;
}