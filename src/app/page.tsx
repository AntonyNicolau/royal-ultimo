"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Shield, Zap, TrendingUp, Crown, BookOpen } from "lucide-react";
import { useEffect } from "react";

export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.push("/dashboard");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Crown className="w-8 h-8 text-yellow-400" />
            <span className="text-2xl font-bold text-white">AnaliseRoyale</span>
          </div>
          <div className="flex items-center gap-3">
            <Button 
              onClick={() => router.push("/tutorial")}
              variant="ghost"
              className="text-white hover:bg-white/10"
            >
              <BookOpen className="w-4 h-4 mr-2" />
              Como Usar
            </Button>
            <Button 
              onClick={() => router.push("/login")}
              className="bg-white text-purple-900 hover:bg-gray-100"
            >
              Entrar
            </Button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
          Domine o Clash Royale
          <br />
          <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
            com Análise de IA
          </span>
        </h1>
        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          Analise seu deck, receba estratégias personalizadas e descubra combinações vencedoras baseadas nos seus troféus
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg"
            onClick={() => router.push("/login")}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white text-lg px-8 py-6"
          >
            Começar Grátis
          </Button>
          <Button 
            size="lg"
            variant="outline"
            onClick={() => router.push("/tutorial")}
            className="border-white text-white hover:bg-white/10 text-lg px-8 py-6"
          >
            <BookOpen className="w-5 h-5 mr-2" />
            Ver Como Funciona
          </Button>
        </div>
        <p className="text-sm text-gray-400 mt-4">
          ✨ 2 análises grátis • Sem cartão de crédito
        </p>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="bg-white/10 backdrop-blur-lg border-white/20 p-8 text-center hover:bg-white/15 transition-all">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Reconhecimento de Cartas</h3>
            <p className="text-gray-300">
              Envie um print do seu deck e nossa IA identifica automaticamente todas as cartas
            </p>
          </Card>

          <Card className="bg-white/10 backdrop-blur-lg border-white/20 p-8 text-center hover:bg-white/15 transition-all">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Análise Instantânea</h3>
            <p className="text-gray-300">
              Receba probabilidade de vitória, pontos fortes e fracos do seu deck em segundos
            </p>
          </Card>

          <Card className="bg-white/10 backdrop-blur-lg border-white/20 p-8 text-center hover:bg-white/15 transition-all">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Estratégias Personalizadas</h3>
            <p className="text-gray-300">
              Recomendações baseadas nos seus troféus e meta atual do jogo
            </p>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <Card className="bg-gradient-to-r from-purple-600 to-blue-600 border-0 p-12">
          <h2 className="text-4xl font-bold text-white mb-4">
            Pronto para subir de arena?
          </h2>
          <p className="text-xl text-gray-100 mb-8">
            Junte-se a milhares de jogadores que já melhoraram seus decks
          </p>
          <Button 
            size="lg"
            onClick={() => router.push("/login")}
            className="bg-white text-purple-900 hover:bg-gray-100 text-lg px-8 py-6"
          >
            Analisar Meu Deck Agora
          </Button>
        </Card>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 text-center text-gray-400 border-t border-white/10">
        <p>© 2024 AnaliseRoyale. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}
