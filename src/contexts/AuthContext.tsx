import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthContextType } from '../types';
import { mockUsers } from '../data/mockData';
import { blink } from '../blink/client';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verificar autenticação com Blink SDK
    const unsubscribe = blink.auth.onAuthStateChanged((state) => {
      if (state.user) {
        // Usuário autenticado com Blink
        const blinkUser: User = {
          id: state.user.id,
          name: state.user.displayName || state.user.email || 'Usuário',
          email: state.user.email || '',
          role: 'client', // Por padrão, usuários do Google são clientes
          avatar: state.user.photoURL || undefined,
          company: 'Google Account',
          status: 'active',
          createdAt: new Date().toISOString()
        };
        setUser(blinkUser);
        localStorage.setItem('clientus_user', JSON.stringify(blinkUser));
      } else {
        // Verificar usuário local (sistema demo)
        const storedUser = localStorage.getItem('clientus_user');
        if (storedUser) {
          try {
            const userData = JSON.parse(storedUser);
            // Verificar se é um usuário do sistema demo (não do Blink)
            if (mockUsers.find(u => u.email === userData.email)) {
              setUser(userData);
            } else {
              localStorage.removeItem('clientus_user');
              setUser(null);
            }
          } catch (error) {
            console.error('Erro ao carregar usuário:', error);
            localStorage.removeItem('clientus_user');
            setUser(null);
          }
        } else {
          setUser(null);
        }
      }
      setLoading(state.isLoading);
    });

    return unsubscribe;
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setLoading(true);
    
    // Simular delay de autenticação
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Buscar usuário nos dados mockados
    const foundUser = mockUsers.find(u => u.email === email);
    
    console.log('🔍 Tentativa de login:', { email, password, foundUser });
    
    if (foundUser && password === 'password') {
      console.log('✅ Login bem-sucedido para:', foundUser.name, foundUser.role);
      setUser(foundUser);
      localStorage.setItem('clientus_user', JSON.stringify(foundUser));
      setLoading(false);
      return true;
    }
    
    console.log('❌ Login falhou - usuário não encontrado ou senha incorreta');
    setLoading(false);
    return false;
  };

  const logout = async () => {
    try {
      // Fazer logout do Blink SDK se estiver autenticado
      await blink.auth.logout();
    } catch (error) {
      console.error('Erro ao fazer logout do Blink:', error);
    }
    
    setUser(null);
    localStorage.removeItem('clientus_user');
  };

  const value: AuthContextType = {
    user,
    login,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};