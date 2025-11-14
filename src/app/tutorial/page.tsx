"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { Crown, Upload, Zap, TrendingUp, CheckCircle } from "lucide-react";

export default function TutorialPage() {
  const router = useRouter();

  const steps = [
    {
      number: 1,
      title: "Tire um Print do Seu Deck",
      description: "Abra o Clash Royale, vá até seu deck e tire um print da tela mostrando todas as 8 cartas claramente.",
      icon: Upload,
      color: "from-purple-500 to-pink-500",
      tips: ["Certifique-se que todas as cartas estão visíveis", "Evite reflexos na tela", "Print em modo retrato funciona melhor"]
    },
    {
      number: 2,
      title: "Faça Upload do Print",
      description: "No dashboard, clique em 'Analisar Deck' e faça upload da imagem. Nossa IA irá reconhecer automaticamente todas as cartas.",
      icon: Zap,
      color: "from-blue-500 to-cyan-500",
      tips: ["Formatos aceitos: JPG, PNG", "Tamanho máximo: 5MB", "Reconhecimento instantâneo"]
    },
    {
      number: 3,
      title: "Receba a Análise Completa",
      description: "Em segundos, você receberá uma análise detalhada com probabilidade de vitória, pontos fortes e fracos do seu deck.",
      icon: TrendingUp,
      color: "from-orange-500 to-red-500",
      tips: ["Análise baseada em IA avançada", "Considera meta atual do jogo", "Personalizada para seus troféus"]
    },
    {
      number: 4,
      title: "Aplique as Estratégias",
      description: "Use as recomendações para melhorar seu deck, ajustar sua estratégia e subir de arena rapidamente!",
      icon: CheckCircle,
      color: "from-green-500 to-emerald-500",
      tips: ["Sugestões de substituições", "Combos vencedores", "Dicas de gameplay"]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => router.push("/")}>
            <Crown className="w-8 h-8 text-yellow-400" />
            <span className="text-2xl font-bold text-white">AnaliseRoyale</span>
          </div>
          <Button 
            onClick={() => router.push("/login")}
            className="bg-white text-purple-900 hover:bg-gray-100"
          >
            Começar Agora
          </Button>
        </nav>
      </header>

      {/* Hero */}
      <section className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
          Como Usar o
          <br />
          <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
            AnaliseRoyale
          </span>
        </h1>
        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          Siga estes 4 passos simples para dominar o Clash Royale
        </p>
      </section>

      {/* Steps */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <Card 
                key={index}
                className="bg-white/10 backdrop-blur-lg border-white/20 p-8 hover:bg-white/15 transition-all"
              >
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  {/* Icon & Number */}
                  <div className="flex-shrink-0">
                    <div className={`w-20 h-20 bg-gradient-to-br ${step.color} rounded-full flex items-center justify-center relative`}>
                      <Icon className="w-10 h-10 text-white" />
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center">
                        <span className="text-purple-900 font-bold text-lg">{step.number}</span>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-white mb-3">{step.title}</h3>
                    <p className="text-gray-300 text-lg mb-4">{step.description}</p>
                    
                    {/* Tips */}
                    <div className="space-y-2">
                      {step.tips.map((tip, tipIndex) => (
                        <div key={tipIndex} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full"></div>
                          <span className="text-gray-400 text-sm">{tip}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 py-16 text-center">
        <Card className="bg-gradient-to-r from-purple-600 to-blue-600 border-0 p-12 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Pronto para começar?
          </h2>
          <p className="text-xl text-gray-100 mb-8">
            Crie sua conta grátis e ganhe 2 análises para testar!
          </p>
          <Button 
            size="lg"
            onClick={() => router.push("/login")}
            className="bg-white text-purple-900 hover:bg-gray-100 text-lg px-8 py-6"
          >
            Começar Agora - É Grátis
          </Button>
          <p className="text-sm text-gray-200 mt-4">
            ✨ Sem cartão de crédito • Análise instantânea
          </p>
        </Card>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 text-center text-gray-400 border-t border-white/10">
        <p>© 2024 AnaliseRoyale. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}
