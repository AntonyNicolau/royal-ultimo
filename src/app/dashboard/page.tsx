"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Crown, Upload, Trophy, Map, LogOut, Sparkles, Lock, BookOpen } from "lucide-react";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { getUserSubscription } from "@/lib/subscription";
import PaywallModal from "@/components/custom/PaywallModal";

export default function DashboardPage() {
  const { user, signOut } = useAuth();
  const router = useRouter();
  const [subscription, setSubscription] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showPaywall, setShowPaywall] = useState(false);

  useEffect(() => {
    if (user) {
      loadSubscription();
    }
  }, [user]);

  const loadSubscription = async () => {
    if (!user) return;
    
    try {
      const sub = await getUserSubscription(user.id);
      setSubscription(sub);
    } catch (error) {
      console.error('Erro ao carregar assinatura:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success("Logout realizado com sucesso!");
      router.push("/");
    } catch (error) {
      toast.error("Erro ao fazer logout");
    }
  };

  const handleAnalyzeClick = () => {
    // Verifica se tem análises disponíveis
    if (subscription?.plan === 'free' && subscription?.analyses_remaining <= 0) {
      setShowPaywall(true);
      return;
    }
    
    router.push("/analyze/upload");
  };

  const isPremium = subscription?.plan === 'premium' && subscription?.status === 'active';
  const analysesRemaining = isPremium ? -1 : (subscription?.analyses_remaining || 0);
  const analysesUsed = subscription?.analyses_total - analysesRemaining;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/20 backdrop-blur-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => router.push("/")}>
              <Crown className="w-8 h-8 text-yellow-400" />
              <span className="text-2xl font-bold text-white">AnaliseRoyale</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-white text-sm">
                {user?.email}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={handleSignOut}
                className="border-white/20 text-white hover:bg-white/10"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sair
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Status Card */}
        <Card className="bg-white/10 backdrop-blur-lg border-white/20 mb-8">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-yellow-400" />
              Status da Conta
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">
                  {isPremium ? "∞" : `${analysesUsed}/${subscription?.analyses_total || 2}`}
                </div>
                <div className="text-gray-300 text-sm">Análises Realizadas</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400 mb-2 flex items-center justify-center gap-2">
                  {isPremium && <Crown className="w-8 h-8" />}
                  {isPremium ? "Premium" : "Demo"}
                </div>
                <div className="text-gray-300 text-sm">Plano Atual</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400 mb-2">
                  {isPremium ? "∞" : analysesRemaining}
                </div>
                <div className="text-gray-300 text-sm">Análises Restantes</div>
              </div>
            </div>
            {!isPremium && analysesRemaining <= 0 && (
              <div className="mt-6 p-4 bg-orange-500/20 border border-orange-500/30 rounded-lg">
                <div className="flex items-center gap-2 text-orange-300 mb-2">
                  <Lock className="w-5 h-5" />
                  <span className="font-semibold">Limite de análises atingido</span>
                </div>
                <p className="text-sm text-gray-300 mb-4">
                  Você usou todas as suas análises gratuitas. Assine o plano Premium para análises ilimitadas!
                </p>
                <Button 
                  onClick={() => router.push("/checkout")}
                  className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
                >
                  <Crown className="w-4 h-4 mr-2" />
                  Assinar Premium - R$ 29,90
                </Button>
              </div>
            )}
            {!isPremium && analysesRemaining > 0 && (
              <div className="mt-6 p-4 bg-blue-500/20 border border-blue-500/30 rounded-lg">
                <p className="text-sm text-gray-300 mb-4">
                  💡 Você ainda tem {analysesRemaining} análise{analysesRemaining > 1 ? 's' : ''} grátis! Faça upgrade para análises ilimitadas.
                </p>
                <Button 
                  onClick={() => router.push("/checkout")}
                  variant="outline"
                  className="border-white text-white hover:bg-white/10"
                >
                  Ver Plano Premium
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Actions Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Tutorial */}
          <Card 
            className="bg-white/10 backdrop-blur-lg border-white/20 hover:bg-white/15 transition-all cursor-pointer group"
            onClick={() => router.push("/tutorial")}
          >
            <CardHeader>
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-white">Como Usar</CardTitle>
              <CardDescription className="text-gray-300">
                Aprenda a usar o AnaliseRoyale em 4 passos simples
              </CardDescription>
            </CardHeader>
          </Card>

          {/* Análise por Print */}
          <Card 
            className="bg-white/10 backdrop-blur-lg border-white/20 hover:bg-white/15 transition-all cursor-pointer group"
            onClick={handleAnalyzeClick}
          >
            <CardHeader>
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Upload className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-white">Analisar por Print</CardTitle>
              <CardDescription className="text-gray-300">
                Envie uma imagem do seu deck e receba análise completa
              </CardDescription>
            </CardHeader>
          </Card>

          {/* Análise por Troféus */}
          <Card 
            className="bg-white/10 backdrop-blur-lg border-white/20 hover:bg-white/15 transition-all cursor-pointer group"
            onClick={() => router.push("/analyze/trophies")}
          >
            <CardHeader>
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Trophy className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-white">Analisar por Troféus</CardTitle>
              <CardDescription className="text-gray-300">
                Informe seus troféus e monte um deck estratégico
              </CardDescription>
            </CardHeader>
          </Card>

          {/* Tabuleiro Estratégico */}
          <Card 
            className="bg-white/10 backdrop-blur-lg border-white/20 hover:bg-white/15 transition-all cursor-pointer group"
            onClick={() => router.push("/board")}
          >
            <CardHeader>
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Map className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-white">Tabuleiro Estratégico</CardTitle>
              <CardDescription className="text-gray-300">
                Visualize posicionamentos ideais e estratégias
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Tips Section */}
        <Card className="bg-white/10 backdrop-blur-lg border-white/20 mt-8">
          <CardHeader>
            <CardTitle className="text-white">💡 Dicas da Semana</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start gap-2">
                <span className="text-yellow-400 mt-1">•</span>
                <span>Mantenha uma curva de elixir balanceada entre 3.0 e 4.0 para melhor controle</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-400 mt-1">•</span>
                <span>Sempre tenha pelo menos 2 feitiços no seu deck para versatilidade</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-400 mt-1">•</span>
                <span>Combine tanques com tropas de suporte para pushes mais efetivos</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Paywall Modal */}
      <PaywallModal 
        isOpen={showPaywall}
        onClose={() => setShowPaywall(false)}
        analysesRemaining={analysesRemaining}
      />
    </div>
  );
}
