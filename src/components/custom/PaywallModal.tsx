"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Crown, Zap, CheckCircle, X } from "lucide-react";
import { useRouter } from "next/navigation";

interface PaywallModalProps {
  isOpen: boolean;
  onClose: () => void;
  analysesRemaining: number;
}

export default function PaywallModal({ isOpen, onClose, analysesRemaining }: PaywallModalProps) {
  const router = useRouter();

  const handleUpgrade = () => {
    router.push("/checkout");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 border-white/20">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold text-white text-center mb-2">
            {analysesRemaining === 0 ? "Análises Esgotadas! 😢" : "Desbloqueie Análises Ilimitadas! 🚀"}
          </DialogTitle>
          <DialogDescription className="text-gray-300 text-center text-lg">
            {analysesRemaining === 0 
              ? "Você usou suas 2 análises grátis. Faça upgrade para continuar dominando!"
              : `Você tem ${analysesRemaining} análise${analysesRemaining > 1 ? 's' : ''} restante${analysesRemaining > 1 ? 's' : ''}. Garanta acesso ilimitado agora!`
            }
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-6">
          {/* Plano Free */}
          <Card className="bg-white/10 backdrop-blur-lg border-white/20 p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold text-white">Plano Grátis</h3>
                <p className="text-gray-400">Limitado</p>
              </div>
              <div className="text-3xl font-bold text-white">R$ 0</div>
            </div>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-gray-300">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span>2 análises grátis</span>
              </li>
              <li className="flex items-center gap-2 text-gray-500">
                <X className="w-5 h-5 text-red-400" />
                <span>Análises completas bloqueadas</span>
              </li>
              <li className="flex items-center gap-2 text-gray-500">
                <X className="w-5 h-5 text-red-400" />
                <span>Sem sugestões de melhorias</span>
              </li>
            </ul>
          </Card>

          {/* Plano Premium */}
          <Card className="bg-gradient-to-r from-yellow-500 to-orange-500 border-0 p-6 relative overflow-hidden">
            <div className="absolute top-2 right-2">
              <Crown className="w-8 h-8 text-white animate-pulse" />
            </div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-2xl font-bold text-white">Plano Premium</h3>
                <p className="text-white/80">Acesso Total</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-white">R$ 29,90</div>
                <p className="text-white/80 text-sm text-right">pagamento único</p>
              </div>
            </div>
            <ul className="space-y-3 mb-6">
              <li className="flex items-center gap-2 text-white">
                <CheckCircle className="w-5 h-5" />
                <span className="font-semibold">Análises ILIMITADAS</span>
              </li>
              <li className="flex items-center gap-2 text-white">
                <CheckCircle className="w-5 h-5" />
                <span>Análises completas e detalhadas</span>
              </li>
              <li className="flex items-center gap-2 text-white">
                <CheckCircle className="w-5 h-5" />
                <span>Sugestões de melhorias personalizadas</span>
              </li>
              <li className="flex items-center gap-2 text-white">
                <CheckCircle className="w-5 h-5" />
                <span>Combos vencedores revelados</span>
              </li>
              <li className="flex items-center gap-2 text-white">
                <CheckCircle className="w-5 h-5" />
                <span>Estratégias baseadas em seus troféus</span>
              </li>
              <li className="flex items-center gap-2 text-white">
                <CheckCircle className="w-5 h-5" />
                <span>Acesso vitalício</span>
              </li>
            </ul>
            <Button 
              size="lg"
              onClick={handleUpgrade}
              className="w-full bg-white text-orange-600 hover:bg-gray-100 text-lg font-bold py-6"
            >
              <Zap className="w-5 h-5 mr-2" />
              Fazer Upgrade Agora
            </Button>
          </Card>

          <p className="text-center text-gray-400 text-sm">
            🔒 Pagamento 100% seguro via Kiwify • Garantia de 7 dias
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
