import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Layout from './components/layout/Layout';
import Landing from './pages/Landing';
import Login from './pages/Login';

// Client Pages
import ClientDashboard from './pages/client/Dashboard';
import ClientMaterials from './pages/client/Materials';
import ClientLibrary from './pages/client/Library';
import ClientCampaigns from './pages/client/Campaigns';

// Admin Pages
import AdminDashboard from './pages/admin/Dashboard';
import AdminClients from './pages/admin/Clients';
import AdminMaterials from './pages/admin/Materials';

import { Toaster } from './components/ui/toaster';
import './App.css';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Layout>{children}</Layout>;
};

const AppRoutes: React.FC = () => {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/landing" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      
      {/* Client Routes */}
      <Route path="/" element={
        user ? (
          <ProtectedRoute>
            {user?.role === 'admin' ? <Navigate to="/admin" replace /> : <ClientDashboard />}
          </ProtectedRoute>
        ) : (
          <Navigate to="/landing" replace />
        )
      } />
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <ClientDashboard />
        </ProtectedRoute>
      } />
      <Route path="/materials" element={
        <ProtectedRoute>
          <ClientMaterials />
        </ProtectedRoute>
      } />
      <Route path="/library" element={
        <ProtectedRoute>
          <ClientLibrary />
        </ProtectedRoute>
      } />
      <Route path="/campaigns" element={
        <ProtectedRoute>
          <ClientCampaigns />
        </ProtectedRoute>
      } />

      {/* Admin Routes */}
      <Route path="/admin" element={
        <ProtectedRoute>
          {user?.role === 'admin' ? <AdminDashboard /> : <Navigate to="/" replace />}
        </ProtectedRoute>
      } />
      <Route path="/admin/dashboard" element={
        <ProtectedRoute>
          {user?.role === 'admin' ? <AdminDashboard /> : <Navigate to="/" replace />}
        </ProtectedRoute>
      } />
      <Route path="/admin/clients" element={
        <ProtectedRoute>
          {user?.role === 'admin' ? <AdminClients /> : <Navigate to="/" replace />}
        </ProtectedRoute>
      } />
      <Route path="/admin/materials" element={
        <ProtectedRoute>
          {user?.role === 'admin' ? <AdminMaterials /> : <Navigate to="/" replace />}
        </ProtectedRoute>
      } />

      {/* Catch all route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
        <Toaster />
      </Router>
    </AuthProvider>
  );
};

export default App;