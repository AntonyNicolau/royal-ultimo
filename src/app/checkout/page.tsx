"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Crown, CreditCard, CheckCircle, ArrowLeft } from "lucide-react";

export default function CheckoutPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  const handleCheckout = () => {
    setIsProcessing(true);
    
    // URL do produto Kiwify (SUBSTITUA pela sua URL real)
    const kiwifyProductUrl = "https://pay.kiwify.com.br/SEU_PRODUTO_ID";
    
    // Adiciona email do usuário como parâmetro (se disponível)
    const checkoutUrl = user?.email 
      ? `${kiwifyProductUrl}?email=${encodeURIComponent(user.email)}`
      : kiwifyProductUrl;
    
    // Redireciona para checkout Kiwify
    window.location.href = checkoutUrl;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
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
          <Button 
            variant="ghost"
            onClick={() => router.back()}
            className="text-white hover:bg-white/10"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
        </nav>
      </header>

      {/* Checkout Content */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Desbloqueie Seu Potencial
              <br />
              <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                no Clash Royale
              </span>
            </h1>
            <p className="text-xl text-gray-300">
              Acesso vitalício por apenas R$ 29,90
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Plano Premium */}
            <Card className="bg-gradient-to-br from-yellow-500 to-orange-500 border-0 p-8 relative overflow-hidden">
              <div className="absolute top-4 right-4">
                <Crown className="w-12 h-12 text-white animate-pulse" />
              </div>
              
              <h2 className="text-3xl font-bold text-white mb-2">Plano Premium</h2>
              <div className="text-5xl font-bold text-white mb-6">
                R$ 29,90
                <span className="text-lg font-normal text-white/80 ml-2">único</span>
              </div>

              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3 text-white">
                  <CheckCircle className="w-6 h-6 flex-shrink-0 mt-0.5" />
                  <span className="text-lg">Análises ILIMITADAS de decks</span>
                </li>
                <li className="flex items-start gap-3 text-white">
                  <CheckCircle className="w-6 h-6 flex-shrink-0 mt-0.5" />
                  <span className="text-lg">Análises completas e detalhadas</span>
                </li>
                <li className="flex items-start gap-3 text-white">
                  <CheckCircle className="w-6 h-6 flex-shrink-0 mt-0.5" />
                  <span className="text-lg">Sugestões personalizadas de melhorias</span>
                </li>
                <li className="flex items-start gap-3 text-white">
                  <CheckCircle className="w-6 h-6 flex-shrink-0 mt-0.5" />
                  <span className="text-lg">Combos vencedores revelados</span>
                </li>
                <li className="flex items-start gap-3 text-white">
                  <CheckCircle className="w-6 h-6 flex-shrink-0 mt-0.5" />
                  <span className="text-lg">Estratégias baseadas em seus troféus</span>
                </li>
                <li className="flex items-start gap-3 text-white">
                  <CheckCircle className="w-6 h-6 flex-shrink-0 mt-0.5" />
                  <span className="text-lg font-bold">Acesso VITALÍCIO</span>
                </li>
              </ul>

              <Button 
                size="lg"
                onClick={handleCheckout}
                disabled={isProcessing}
                className="w-full bg-white text-orange-600 hover:bg-gray-100 text-xl font-bold py-7"
              >
                {isProcessing ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-orange-600 mr-2"></div>
                    Processando...
                  </>
                ) : (
                  <>
                    <CreditCard className="w-6 h-6 mr-2" />
                    Comprar Agora
                  </>
                )}
              </Button>
            </Card>

            {/* Garantias */}
            <div className="space-y-6">
              <Card className="bg-white/10 backdrop-blur-lg border-white/20 p-6">
                <h3 className="text-2xl font-bold text-white mb-4">Por que escolher Premium?</h3>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2"></div>
                    <span>Suba de arena mais rápido com estratégias comprovadas</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2"></div>
                    <span>Descubra os melhores decks para seu nível de troféus</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2"></div>
                    <span>Aprenda combos que os profissionais usam</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2"></div>
                    <span>Economize tempo testando decks aleatórios</span>
                  </li>
                </ul>
              </Card>

              <Card className="bg-white/10 backdrop-blur-lg border-white/20 p-6">
                <h3 className="text-2xl font-bold text-white mb-4">Garantias</h3>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span><strong className="text-white">Garantia de 7 dias:</strong> Se não gostar, devolvemos 100% do seu dinheiro</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span><strong className="text-white">Pagamento seguro:</strong> Processado pela Kiwify, plataforma confiável</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span><strong className="text-white">Acesso imediato:</strong> Comece a usar assim que o pagamento for confirmado</span>
                  </li>
                </ul>
              </Card>

              <Card className="bg-green-500/20 backdrop-blur-lg border-green-400/30 p-6">
                <p className="text-green-300 text-center font-semibold">
                  🎉 Oferta Especial: Pagamento único, sem mensalidades!
                </p>
              </Card>
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-400 text-sm">
              Ao clicar em "Comprar Agora", você será redirecionado para a página segura de pagamento da Kiwify
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 text-center text-gray-400 border-t border-white/10">
        <p>© 2024 AnaliseRoyale. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}
