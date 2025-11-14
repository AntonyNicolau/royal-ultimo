"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Crown, ArrowLeft } from "lucide-react";

export default function BoardPage() {
  const router = useRouter();

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

      <div className="container mx-auto px-4 py-8">
        <Card className="bg-white/10 backdrop-blur-lg border-white/20 mb-6">
          <CardHeader>
            <CardTitle className="text-white text-2xl text-center">
              🗺️ Tabuleiro Estratégico
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-300 text-center mb-6">
              Entenda as regiões do campo e onde posicionar suas tropas para máxima efetividade
            </p>

            {/* Board Visualization */}
            <div className="max-w-2xl mx-auto">
              <div className="relative bg-gradient-to-b from-blue-900 to-red-900 rounded-lg p-8 aspect-[9/16] border-4 border-yellow-600">
                {/* Enemy Side */}
                <div className="absolute top-4 left-0 right-0 text-center">
                  <span className="bg-red-600 text-white px-4 py-1 rounded-full text-sm font-bold">
                    LADO INIMIGO
                  </span>
                </div>

                {/* Enemy King Tower */}
                <div className="absolute top-12 left-1/2 -translate-x-1/2 w-16 h-16 bg-red-600 rounded-full flex items-center justify-center border-4 border-red-800">
                  <span className="text-2xl">👑</span>
                </div>

                {/* Enemy Princess Towers */}
                <div className="absolute top-24 left-8 w-12 h-12 bg-red-500 rounded-full flex items-center justify-center border-2 border-red-700">
                  <span className="text-xl">🏰</span>
                </div>
                <div className="absolute top-24 right-8 w-12 h-12 bg-red-500 rounded-full flex items-center justify-center border-2 border-red-700">
                  <span className="text-xl">🏰</span>
                </div>

                {/* Center Line */}
                <div className="absolute top-1/2 left-0 right-0 border-t-2 border-dashed border-yellow-400"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-yellow-400 text-black px-3 py-1 rounded text-xs font-bold">
                  CENTRO
                </div>

                {/* Your Princess Towers */}
                <div className="absolute bottom-24 left-8 w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center border-2 border-blue-700">
                  <span className="text-xl">🏰</span>
                </div>
                <div className="absolute bottom-24 right-8 w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center border-2 border-blue-700">
                  <span className="text-xl">🏰</span>
                </div>

                {/* Your King Tower */}
                <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center border-4 border-blue-800">
                  <span className="text-2xl">👑</span>
                </div>

                {/* Your Side */}
                <div className="absolute bottom-4 left-0 right-0 text-center">
                  <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-bold">
                    SEU LADO
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Strategy Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="bg-white/10 backdrop-blur-lg border-white/20">
            <CardHeader>
              <CardTitle className="text-white text-lg">🛡️ Posicionamento Defensivo</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 text-sm space-y-2">
              <p><strong className="text-white">Tanques:</strong> Coloque na frente das torres para absorver dano</p>
              <p><strong className="text-white">Suporte:</strong> Atrás das torres para proteção</p>
              <p><strong className="text-white">Anti-aérea:</strong> No centro para cobrir ambos os lados</p>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-lg border-white/20">
            <CardHeader>
              <CardTitle className="text-white text-lg">⚔️ Posicionamento Ofensivo</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 text-sm space-y-2">
              <p><strong className="text-white">Push Principal:</strong> Tanque na ponte + suporte atrás</p>
              <p><strong className="text-white">Split Push:</strong> Tropas leves em ambos os lados</p>
              <p><strong className="text-white">Contra-ataque:</strong> Aproveite tropas sobreviventes</p>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-lg border-white/20">
            <CardHeader>
              <CardTitle className="text-white text-lg">✨ Uso de Feitiços</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 text-sm space-y-2">
              <p><strong className="text-white">Área:</strong> Bola de Fogo, Foguete - para grupos</p>
              <p><strong className="text-white">Reset:</strong> Zap, Tronco - para interromper ataques</p>
              <p><strong className="text-white">Dano Direto:</strong> Foguete na torre quando vantagem</p>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-lg border-white/20">
            <CardHeader>
              <CardTitle className="text-white text-lg">🎯 Controle de Elixir</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 text-sm space-y-2">
              <p><strong className="text-white">Início:</strong> Jogue barato, teste o oponente</p>
              <p><strong className="text-white">Meio:</strong> Mantenha 4-5 de elixir para defesa</p>
              <p><strong className="text-white">Final:</strong> Use tudo em pushes decisivos</p>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-lg border-white/20">
            <CardHeader>
              <CardTitle className="text-white text-lg">🔄 Rotação de Cartas</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 text-sm space-y-2">
              <p><strong className="text-white">Ciclo Rápido:</strong> Use cartas baratas para chegar nas chave</p>
              <p><strong className="text-white">Não Desperdice:</strong> Cada carta tem momento certo</p>
              <p><strong className="text-white">Previsão:</strong> Antecipe jogadas do oponente</p>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-lg border-white/20">
            <CardHeader>
              <CardTitle className="text-white text-lg">💥 Combos Efetivos</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 text-sm space-y-2">
              <p><strong className="text-white">Tanque + Suporte:</strong> Gigante + Mosqueteira</p>
              <p><strong className="text-white">Aéreo + Terrestre:</strong> Balão + Lenhador</p>
              <p><strong className="text-white">Swarm + Feitiço:</strong> Horda + Zap preventivo</p>
            </CardContent>
          </Card>
        </div>

        {/* Tips */}
        <Card className="bg-gradient-to-r from-purple-600 to-blue-600 border-0 mt-8">
          <CardContent className="p-6">
            <h3 className="text-white text-xl font-bold mb-4 text-center">
              🎓 Dicas Avançadas
            </h3>
            <div className="grid md:grid-cols-2 gap-4 text-white">
              <div>
                <p className="font-semibold mb-2">Timing é Tudo:</p>
                <p className="text-sm text-gray-100">
                  Espere o oponente gastar elixir antes de fazer seu push principal
                </p>
              </div>
              <div>
                <p className="font-semibold mb-2">Defenda Primeiro:</p>
                <p className="text-sm text-gray-100">
                  Uma boa defesa gera contra-ataques devastadores com vantagem de elixir
                </p>
              </div>
              <div>
                <p className="font-semibold mb-2">Pressão Constante:</p>
                <p className="text-sm text-gray-100">
                  Mantenha o oponente ocupado em ambos os lados para dividir sua atenção
                </p>
              </div>
              <div>
                <p className="font-semibold mb-2">Adapte-se:</p>
                <p className="text-sm text-gray-100">
                  Identifique o deck inimigo rapidamente e ajuste sua estratégia
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
