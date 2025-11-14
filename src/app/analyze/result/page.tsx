"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Crown, ArrowLeft, TrendingUp, AlertCircle, CheckCircle, Zap, Shield, Swords } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function AnalyzeResultPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState<any>(null);

  useEffect(() => {
    // Mock analysis result
    setTimeout(() => {
      setResult({
        winProbability: 68,
        deckCards: [
          { name: "Cavaleiro", type: "Tanque", elixir: 3 },
          { name: "Arqueiras", type: "Suporte", elixir: 3 },
          { name: "Gigante", type: "Tanque", elixir: 5 },
          { name: "Mini P.E.K.K.A", type: "Dano", elixir: 4 },
          { name: "Mosqueteira", type: "Suporte", elixir: 4 },
          { name: "Bola de Fogo", type: "Feitiço", elixir: 4 },
          { name: "Zap", type: "Feitiço", elixir: 2 },
          { name: "Horda de Servos", type: "Aérea", elixir: 5 },
        ],
        avgElixir: 3.75,
        strengths: [
          "Boa curva de elixir balanceada",
          "Presença de feitiços versáteis",
          "Combinação tanque + suporte efetiva",
        ],
        weaknesses: [
          "Vulnerável a decks aéreos pesados",
          "Falta de defesa anti-aérea forte",
        ],
        strategy: {
          opening: "Inicie com Cavaleiro ou Arqueiras para testar a defesa adversária. Economize elixir nos primeiros 30 segundos.",
          elixirControl: "Mantenha sempre 4-5 de elixir disponível para defesas emergenciais. Use Zap estrategicamente.",
          push: "Combine Gigante com Mosqueteira ou Mini P.E.K.K.A para pushes devastadores. Proteja com Bola de Fogo.",
          defense: "Use Mini P.E.K.K.A para tanques inimigos. Arqueiras para tropas terrestres leves. Horda de Servos apenas em emergências.",
          counterAttack: "Após defender com sucesso, aproveite tropas sobreviventes para contra-ataque rápido com Cavaleiro.",
        },
        recommendations: [
          "Considere substituir Horda de Servos por Megaservo para melhor custo-benefício",
          "Adicione uma carta de construção como Torre Infernal para melhor defesa",
        ],
        topDecks: [
          {
            name: "Deck Gigante Clássico",
            winRate: 72,
            cards: ["Gigante", "Mosqueteira", "Mini P.E.K.K.A", "Zap", "Bola de Fogo", "Valquíria", "Megaservo", "Coletor de Elixir"],
          },
          {
            name: "Deck Controle",
            winRate: 69,
            cards: ["Cavaleiro", "Arqueiras", "Canhão", "Bola de Fogo", "Zap", "Tronco", "Foguete", "Espírito de Gelo"],
          },
          {
            name: "Deck Beatdown",
            winRate: 67,
            cards: ["Golem", "Dragão Infernal", "Megaservo", "Raio", "Tornado", "Bebê Dragão", "Lenhador", "Tronco"],
          },
        ],
      });
      setLoading(false);
    }, 1500);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-yellow-400 mx-auto mb-4"></div>
          <p className="text-white text-xl">Analisando seu deck...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/20 backdrop-blur-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.push("/dashboard")}
              className="text-white hover:bg-white/10"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </Button>
            <div className="flex items-center gap-2">
              <Crown className="w-8 h-8 text-yellow-400" />
              <span className="text-2xl font-bold text-white">AnaliseRoyale</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 space-y-6">
        {/* Win Probability */}
        <Card className="bg-gradient-to-r from-purple-600 to-blue-600 border-0">
          <CardContent className="p-8 text-center">
            <TrendingUp className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
            <h2 className="text-white text-4xl font-bold mb-2">
              {result.winProbability}%
            </h2>
            <p className="text-gray-100 text-xl">Probabilidade de Vitória</p>
            <Progress value={result.winProbability} className="mt-4 h-3" />
          </CardContent>
        </Card>

        {/* Deck Overview */}
        <Card className="bg-white/10 backdrop-blur-lg border-white/20">
          <CardHeader>
            <CardTitle className="text-white">Seu Deck</CardTitle>
            <CardDescription className="text-gray-300">
              Custo médio de elixir: {result.avgElixir} ⚡
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
              {result.deckCards.map((card: any, index: number) => (
                <div key={index} className="text-center">
                  <div className="w-full aspect-square bg-gradient-to-br from-gray-700 to-gray-900 rounded-lg mb-2 flex items-center justify-center">
                    <span className="text-3xl">🃏</span>
                  </div>
                  <p className="text-white text-xs font-semibold">{card.name}</p>
                  <p className="text-purple-300 text-xs">{card.elixir}⚡</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Strengths & Weaknesses */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="bg-green-500/10 backdrop-blur-lg border-green-500/30">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                Pontos Fortes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {result.strengths.map((strength: string, index: number) => (
                  <li key={index} className="text-gray-300 flex items-start gap-2">
                    <span className="text-green-400 mt-1">✓</span>
                    <span>{strength}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-orange-500/10 backdrop-blur-lg border-orange-500/30">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-orange-400" />
                Pontos Fracos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {result.weaknesses.map((weakness: string, index: number) => (
                  <li key={index} className="text-gray-300 flex items-start gap-2">
                    <span className="text-orange-400 mt-1">!</span>
                    <span>{weakness}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Strategy */}
        <Card className="bg-white/10 backdrop-blur-lg border-white/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Swords className="w-5 h-5 text-yellow-400" />
              Estratégia Completa
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="opening" className="w-full">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="opening">Abertura</TabsTrigger>
                <TabsTrigger value="elixir">Elixir</TabsTrigger>
                <TabsTrigger value="push">Push</TabsTrigger>
                <TabsTrigger value="defense">Defesa</TabsTrigger>
                <TabsTrigger value="counter">Contra-ataque</TabsTrigger>
              </TabsList>
              <TabsContent value="opening" className="text-gray-300 mt-4">
                <div className="flex items-start gap-3">
                  <Zap className="w-5 h-5 text-yellow-400 mt-1 flex-shrink-0" />
                  <p>{result.strategy.opening}</p>
                </div>
              </TabsContent>
              <TabsContent value="elixir" className="text-gray-300 mt-4">
                <div className="flex items-start gap-3">
                  <Zap className="w-5 h-5 text-purple-400 mt-1 flex-shrink-0" />
                  <p>{result.strategy.elixirControl}</p>
                </div>
              </TabsContent>
              <TabsContent value="push" className="text-gray-300 mt-4">
                <div className="flex items-start gap-3">
                  <TrendingUp className="w-5 h-5 text-red-400 mt-1 flex-shrink-0" />
                  <p>{result.strategy.push}</p>
                </div>
              </TabsContent>
              <TabsContent value="defense" className="text-gray-300 mt-4">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
                  <p>{result.strategy.defense}</p>
                </div>
              </TabsContent>
              <TabsContent value="counter" className="text-gray-300 mt-4">
                <div className="flex items-start gap-3">
                  <Swords className="w-5 h-5 text-orange-400 mt-1 flex-shrink-0" />
                  <p>{result.strategy.counterAttack}</p>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Recommendations */}
        <Card className="bg-white/10 backdrop-blur-lg border-white/20">
          <CardHeader>
            <CardTitle className="text-white">💡 Recomendações</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {result.recommendations.map((rec: string, index: number) => (
                <li key={index} className="text-gray-300 flex items-start gap-2">
                  <span className="text-yellow-400 mt-1">→</span>
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Top Decks */}
        <Card className="bg-white/10 backdrop-blur-lg border-white/20">
          <CardHeader>
            <CardTitle className="text-white">🏆 Top 3 Decks da Semana</CardTitle>
            <CardDescription className="text-gray-300">
              Decks mais vencedores na meta atual
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {result.topDecks.map((deck: any, index: number) => (
                <Card key={index} className="bg-white/5 border-white/10">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-white font-semibold">{deck.name}</h4>
                      <span className="text-green-400 font-bold">{deck.winRate}% WR</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {deck.cards.map((card: string, cardIndex: number) => (
                        <span
                          key={cardIndex}
                          className="text-xs bg-purple-600/30 text-purple-200 px-2 py-1 rounded"
                        >
                          {card}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex gap-4 justify-center">
          <Button
            onClick={() => router.push("/dashboard")}
            variant="outline"
            className="border-white/20 text-white hover:bg-white/10"
          >
            Nova Análise
          </Button>
          <Button
            onClick={() => router.push("/board")}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
          >
            Ver Tabuleiro Estratégico
          </Button>
        </div>
      </div>
    </div>
  );
}
