"use client";

import { useState, useEffect } from 'react';
import { AlertCircle, X } from 'lucide-react';

export function FirebaseConfigBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Check if Firebase is configured
    const isConfigured = 
      process.env.NEXT_PUBLIC_FIREBASE_API_KEY && 
      process.env.NEXT_PUBLIC_FIREBASE_API_KEY !== 'demo-api-key';
    
    setShow(!isConfigured);
  }, []);

  if (!show) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-3 shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <div className="text-sm">
            <strong className="font-semibold">Firebase não configurado.</strong>
            {' '}Configure as variáveis de ambiente no arquivo <code className="bg-white/20 px-2 py-0.5 rounded">.env.local</code> para habilitar autenticação.
          </div>
        </div>
        <button
          onClick={() => setShow(false)}
          className="p-1 hover:bg-white/20 rounded transition-colors"
          aria-label="Fechar"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
