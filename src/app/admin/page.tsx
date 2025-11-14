"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Crown, Users, TrendingUp, DollarSign, LogOut, Shield } from "lucide-react";
import { supabase } from "@/lib/supabase";

interface AdminStats {
  totalUsers: number;
  premiumUsers: number;
  freeUsers: number;
  totalRevenue: number;
}

export default function AdminPage() {
  const { user, loading, signOut } = useAuth();
  const router = useRouter();
  const [stats, setStats] = useState<AdminStats>({
    totalUsers: 0,
    premiumUsers: 0,
    freeUsers: 0,
    totalRevenue: 0,
  });
  const [loadingStats, setLoadingStats] = useState(true);

  // Email do admin (SUBSTITUA pelo seu email)
  const ADMIN_EMAIL = "seu-email@exemplo.com";

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
      return;
    }

    // Verifica se é admin
    if (!loading && user && user.email !== ADMIN_EMAIL) {
      router.push("/dashboard");
      return;
    }

    // Carrega estatísticas
    if (user && user.email === ADMIN_EMAIL) {
      loadStats();
    }
  }, [user, loading, router]);

  const loadStats = async () => {
    try {
      setLoadingStats(true);

      // Busca todas as assinaturas
      const { data: subscriptions, error } = await supabase
        .from('subscriptions')
        .select('*');

      if (error) throw error;

      const totalUsers = subscriptions?.length || 0;
      const premiumUsers = subscriptions?.filter(s => s.plan === 'premium' && s.status === 'active').length || 0;
      const freeUsers = totalUsers - premiumUsers;
      const totalRevenue = premiumUsers * 29.90; // R$ 29,90 por usuário premium

      setStats({
        totalUsers,
        premiumUsers,
        freeUsers,
        totalRevenue,
      });
    } catch (error) {
      console.error('Erro ao carregar estatísticas:', error);
    } finally {
      setLoadingStats(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
  };

  if (loading || loadingStats) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </div>
    );
  }

  // Verifica se é admin
  if (user?.email !== ADMIN_EMAIL) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="w-8 h-8 text-yellow-400" />
            <span className="text-2xl font-bold text-white">Painel Admin</span>
          </div>
          <Button 
            onClick={handleSignOut}
            variant="outline"
            className="border-white text-white hover:bg-white/10"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sair
          </Button>
        </nav>
      </header>

      {/* Content */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">
              Bem-vindo, Admin! 👑
            </h1>
            <p className="text-gray-300 text-lg">
              Aqui estão as estatísticas do AnaliseRoyale
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="bg-white/10 backdrop-blur-lg border-white/20 p-6">
              <div className="flex items-center justify-between mb-4">
                <Users className="w-10 h-10 text-blue-400" />
                <div className="text-right">
                  <p className="text-3xl font-bold text-white">{stats.totalUsers}</p>
                  <p className="text-gray-400 text-sm">Total de Usuários</p>
                </div>
              </div>
            </Card>

            <Card className="bg-white/10 backdrop-blur-lg border-white/20 p-6">
              <div className="flex items-center justify-between mb-4">
                <Crown className="w-10 h-10 text-yellow-400" />
                <div className="text-right">
                  <p className="text-3xl font-bold text-white">{stats.premiumUsers}</p>
                  <p className="text-gray-400 text-sm">Usuários Premium</p>
                </div>
              </div>
            </Card>

            <Card className="bg-white/10 backdrop-blur-lg border-white/20 p-6">
              <div className="flex items-center justify-between mb-4">
                <TrendingUp className="w-10 h-10 text-green-400" />
                <div className="text-right">
                  <p className="text-3xl font-bold text-white">{stats.freeUsers}</p>
                  <p className="text-gray-400 text-sm">Usuários Free</p>
                </div>
              </div>
            </Card>

            <Card className="bg-gradient-to-br from-green-500 to-emerald-600 border-0 p-6">
              <div className="flex items-center justify-between mb-4">
                <DollarSign className="w-10 h-10 text-white" />
                <div className="text-right">
                  <p className="text-3xl font-bold text-white">
                    R$ {stats.totalRevenue.toFixed(2)}
                  </p>
                  <p className="text-white/80 text-sm">Receita Total</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Informações Adicionais */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="bg-white/10 backdrop-blur-lg border-white/20 p-6">
              <h3 className="text-2xl font-bold text-white mb-4">Taxa de Conversão</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-gray-300 mb-2">
                    <span>Free → Premium</span>
                    <span className="font-bold text-white">
                      {stats.totalUsers > 0 
                        ? ((stats.premiumUsers / stats.totalUsers) * 100).toFixed(1)
                        : 0}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-green-400 to-emerald-500 h-3 rounded-full transition-all"
                      style={{ 
                        width: stats.totalUsers > 0 
                          ? `${(stats.premiumUsers / stats.totalUsers) * 100}%` 
                          : '0%' 
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="bg-white/10 backdrop-blur-lg border-white/20 p-6">
              <h3 className="text-2xl font-bold text-white mb-4">Ações Rápidas</h3>
              <div className="space-y-3">
                <Button 
                  onClick={() => router.push("/dashboard")}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                >
                  Ir para Dashboard
                </Button>
                <Button 
                  onClick={loadStats}
                  variant="outline"
                  className="w-full border-white text-white hover:bg-white/10"
                >
                  Atualizar Estatísticas
                </Button>
              </div>
            </Card>
          </div>

          {/* Instruções */}
          <Card className="bg-yellow-500/20 backdrop-blur-lg border-yellow-400/30 p-6 mt-6">
            <h3 className="text-xl font-bold text-yellow-300 mb-3">⚙️ Configurações Importantes</h3>
            <ul className="space-y-2 text-yellow-200">
              <li className="flex items-start gap-2">
                <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2"></div>
                <span>Altere o email do admin em <code className="bg-black/30 px-2 py-1 rounded">src/app/admin/page.tsx</code></span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2"></div>
                <span>Configure a URL do produto Kiwify em <code className="bg-black/30 px-2 py-1 rounded">src/app/checkout/page.tsx</code></span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2"></div>
                <span>Crie a tabela 'subscriptions' no Supabase (veja instruções abaixo)</span>
              </li>
            </ul>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 text-center text-gray-400 border-t border-white/10">
        <p>© 2024 AnaliseRoyale. Painel Administrativo.</p>
      </footer>
    </div>
  );
}
