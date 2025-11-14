"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Crown, Trophy, ArrowLeft, Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function AnalyzeTrophiesPage() {
  const router = useRouter();
  const [trophies, setTrophies] = useState("");
  const [loading, setLoading] = useState(false);
  const [availableCards, setAvailableCards] = useState<any[]>([]);
  const [selectedCards, setSelectedCards] = useState<string[]>([]);
  const [step, setStep] = useState<"input" | "select" | "result">("input");

  const handleTrophiesSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Mock API call - será substituído por chamada real
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock cards data
      const mockCards = [
        { id: "1", name: "Cavaleiro", type: "Tanque", elixir: 3, unlockTrophies: 0 },
        { id: "2", name: "Arqueiras", type: "Suporte", elixir: 3, unlockTrophies: 0 },
        { id: "3", name: "Gigante", type: "Tanque", elixir: 5, unlockTrophies: 0 },
        { id: "4", name: "Mini P.E.K.K.A", type: "Dano", elixir: 4, unlockTrophies: 0 },
        { id: "5", name: "Mosqueteira", type: "Suporte", elixir: 4, unlockTrophies: 0 },
        { id: "6", name: "Bola de Fogo", type: "Feitiço", elixir: 4, unlockTrophies: 0 },
        { id: "7", name: "Zap", type: "Feitiço", elixir: 2, unlockTrophies: 0 },
        { id: "8", name: "Horda de Servos", type: "Aérea", elixir: 5, unlockTrophies: 0 },
        { id: "9", name: "Valquíria", type: "Tanque", elixir: 4, unlockTrophies: 1000 },
        { id: "10", name: "Mago", type: "Suporte", elixir: 5, unlockTrophies: 1000 },
      ];

      setAvailableCards(mockCards);
      setStep("select");
      toast.success("Cartas disponíveis carregadas!");
    } catch (error) {
      toast.error("Erro ao carregar cartas");
    } finally {
      setLoading(false);
    }
  };

  const toggleCardSelection = (cardId: string) => {
    if (selectedCards.includes(cardId)) {
      setSelectedCards(selectedCards.filter(id => id !== cardId));
    } else if (selectedCards.length < 8) {
      setSelectedCards([...selectedCards, cardId]);
    } else {
      toast.error("Você já selecionou 8 cartas");
    }
  };

  const handleAnalyze = async () => {
    if (selectedCards.length !== 8) {
      toast.error("Selecione exatamente 8 cartas");
      return;
    }

    setLoading(true);
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Redirect to results
      router.push(`/analyze/result?cards=${selectedCards.join(",")}&trophies=${trophies}`);
    } catch (error) {
      toast.error("Erro ao analisar deck");
    } finally {
      setLoading(false);
    }
  };

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
        {step === "input" && (
          <Card className="max-w-2xl mx-auto bg-white/10 backdrop-blur-lg border-white/20">
            <CardHeader>
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trophy className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-white text-center text-2xl">
                Análise por Troféus
              </CardTitle>
              <CardDescription className="text-gray-300 text-center">
                Informe quantos troféus você possui para ver as cartas disponíveis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleTrophiesSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="trophies" className="text-white">
                    Quantidade de Troféus
                  </Label>
                  <Input
                    id="trophies"
                    type="number"
                    placeholder="Ex: 4000"
                    value={trophies}
                    onChange={(e) => setTrophies(e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 text-lg"
                    required
                    min="0"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Carregando...
                    </>
                  ) : (
                    "Ver Cartas Disponíveis"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

        {step === "select" && (
          <div className="space-y-6">
            <Card className="bg-white/10 backdrop-blur-lg border-white/20">
              <CardHeader>
                <CardTitle className="text-white">
                  Selecione 8 Cartas ({selectedCards.length}/8)
                </CardTitle>
                <CardDescription className="text-gray-300">
                  Escolha as cartas que você deseja usar no seu deck
                </CardDescription>
              </CardHeader>
            </Card>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {availableCards.map((card) => (
                <Card
                  key={card.id}
                  className={`cursor-pointer transition-all ${
                    selectedCards.includes(card.id)
                      ? "bg-gradient-to-br from-purple-600 to-blue-600 border-yellow-400 border-2"
                      : "bg-white/10 backdrop-blur-lg border-white/20 hover:bg-white/15"
                  }`}
                  onClick={() => toggleCardSelection(card.id)}
                >
                  <CardContent className="p-4 text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-gray-700 to-gray-900 rounded-lg mx-auto mb-2 flex items-center justify-center">
                      <span className="text-2xl">🃏</span>
                    </div>
                    <h3 className="text-white font-semibold text-sm mb-1">
                      {card.name}
                    </h3>
                    <p className="text-gray-300 text-xs mb-1">{card.type}</p>
                    <p className="text-purple-300 text-xs font-bold">
                      {card.elixir} ⚡
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="flex justify-center">
              <Button
                onClick={handleAnalyze}
                disabled={selectedCards.length !== 8 || loading}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 px-8"
                size="lg"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Analisando...
                  </>
                ) : (
                  "Analisar Deck"
                )}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
