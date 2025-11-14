"use client";

import { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signInWithApple: () => Promise<void>;
  signOut: () => Promise<void>;
  isConfigured: boolean;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const configured = isSupabaseConfigured();

  useEffect(() => {
    // Se Supabase não está configurado, pula inicialização
    if (!configured) {
      console.warn('⚠️ Supabase não configurado. Rodando em modo demo.');
      setLoading(false);
      return;
    }

    // Verifica sessão inicial
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Escuta mudanças de autenticação
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [configured]);

  const signIn = async (email: string, password: string) => {
    if (!configured) {
      throw new Error('Supabase não configurado. Configure as variáveis de ambiente para usar autenticação.');
    }
    
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) throw error;
  };

  const signUp = async (email: string, password: string) => {
    if (!configured) {
      throw new Error('Supabase não configurado. Configure as variáveis de ambiente para usar autenticação.');
    }
    
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });
    
    if (error) throw error;
  };

  const signInWithGoogle = async () => {
    if (!configured) {
      throw new Error('Supabase não configurado. Configure as variáveis de ambiente para usar autenticação.');
    }
    
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    
    if (error) throw error;
  };

  const signInWithApple = async () => {
    if (!configured) {
      throw new Error('Supabase não configurado. Configure as variáveis de ambiente para usar autenticação.');
    }
    
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'apple',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    
    if (error) throw error;
  };

  const signOut = async () => {
    if (!configured) {
      return;
    }
    
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  const value = {
    user,
    session,
    loading,
    signIn,
    signUp,
    signInWithGoogle,
    signInWithApple,
    signOut,
    isConfigured: configured,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
