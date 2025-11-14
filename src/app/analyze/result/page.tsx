"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ResultPage() {
  const searchParams = useSearchParams();
  const data = searchParams.get("data");

  const [parsed, setParsed] = useState<any>(null);

  useEffect(() => {
    if (data) {
      try {
        setParsed(JSON.parse(data));
      } catch (e) {
        console.error("Erro ao ler dados", e);
      }
    }
  }, [data]);

  if (!parsed) {
    return <div className="p-6">Carregando resultado...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Resultado da Análise</h1>
      <pre className="bg-gray-900 text-white p-4 rounded-md text-sm overflow-auto">
        {JSON.stringify(parsed, null, 2)}
      </pre>
    </div>
  );
}