"use client";

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

// Verifica se o Supabase está configurado corretamente
export const isSupabaseConfigured = () => {
  return (
    typeof window !== "undefined" &&
    supabaseUrl &&
    supabaseAnonKey &&
    supabaseUrl.includes("supabase.co")
  );
};

// Só cria o cliente quando realmente existe configuração
export const supabase = isSupabaseConfigured()
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
    })
  : null;

// Helper para verificar sessão ativa
export const getSession = async () => {
  if (!supabase) return null;

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return session;
};

// Helper para obter usuário atual
export const getCurrentUser = async () => {
  if (!supabase) return null;

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
};
