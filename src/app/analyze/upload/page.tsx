"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Crown, Upload, ArrowLeft, Loader2, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";

export default function AnalyzeUploadPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (!selectedFile.type.startsWith("image/")) {
        toast.error("Por favor, selecione uma imagem válida");
        return;
      }
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error("Selecione uma imagem primeiro");
      return;
    }

    setLoading(true);
    try {
      // Mock OCR processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock detected cards
      const detectedCards = ["1", "2", "3", "4", "5", "6", "7", "8"];
      
      toast.success("Cartas detectadas com sucesso!");
      router.push(`/analyze/result?cards=${detectedCards.join(",")}&source=ocr`);
    } catch (error) {
      toast.error("Erro ao processar imagem");
    } finally {
      setLoading(false);
    }
  };

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type.startsWith("image/")) {
      setFile(droppedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(droppedFile);
    } else {
      toast.error("Por favor, solte uma imagem válida");
    }
  }, []);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
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
        <Card className="max-w-3xl mx-auto bg-white/10 backdrop-blur-lg border-white/20">
          <CardHeader>
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Upload className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-white text-center text-2xl">
              Análise por Print
            </CardTitle>
            <CardDescription className="text-gray-300 text-center">
              Envie uma captura de tela do seu deck para análise automática com OCR
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Upload Area */}
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-all ${
                preview
                  ? "border-purple-500 bg-purple-500/10"
                  : "border-white/20 hover:border-white/40 hover:bg-white/5"
              }`}
            >
              {preview ? (
                <div className="space-y-4">
                  <img
                    src={preview}
                    alt="Preview"
                    className="max-h-96 mx-auto rounded-lg"
                  />
                  <Button
                    variant="outline"
                    onClick={() => {
                      setPreview(null);
                      setFile(null);
                    }}
                    className="border-white/20 text-white hover:bg-white/10"
                  >
                    Remover Imagem
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <ImageIcon className="w-16 h-16 text-gray-400 mx-auto" />
                  <div>
                    <p className="text-white mb-2">
                      Arraste e solte uma imagem aqui
                    </p>
                    <p className="text-gray-400 text-sm mb-4">ou</p>
                    <label htmlFor="file-upload">
                      <Button
                        variant="outline"
                        className="border-white/20 text-white hover:bg-white/10"
                        onClick={() => document.getElementById("file-upload")?.click()}
                      >
                        Selecionar Arquivo
                      </Button>
                    </label>
                    <input
                      id="file-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </div>
                  <p className="text-gray-400 text-xs">
                    Formatos aceitos: PNG, JPG, JPEG
                  </p>
                </div>
              )}
            </div>

            {/* Tips */}
            <Card className="bg-blue-500/10 border-blue-500/30">
              <CardContent className="p-4">
                <h4 className="text-white font-semibold mb-2">💡 Dicas para melhor resultado:</h4>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• Tire um print claro do seu deck no jogo</li>
                  <li>• Certifique-se de que todas as 8 cartas estejam visíveis</li>
                  <li>• Evite reflexos ou sombras na imagem</li>
                  <li>• Use boa iluminação</li>
                </ul>
              </CardContent>
            </Card>

            {/* Upload Button */}
            <Button
              onClick={handleUpload}
              disabled={!file || loading}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              size="lg"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Processando com OCR...
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4 mr-2" />
                  Analisar Deck
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
