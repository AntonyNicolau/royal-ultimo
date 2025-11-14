import { supabase } from './supabase';

export interface UserSubscription {
  id: string;
  user_id: string;
  plan: 'free' | 'premium';
  status: 'active' | 'inactive' | 'cancelled';
  analyses_remaining: number;
  analyses_total: number;
  kiwify_order_id?: string;
  expires_at?: string;
  created_at: string;
  updated_at: string;
}

// Verifica se usuário tem plano premium ativo
export async function checkPremiumStatus(userId: string): Promise<boolean> {
  try {
    const { data, error } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('user_id', userId)
      .eq('status', 'active')
      .eq('plan', 'premium')
      .single();

    if (error) return false;
    
    // Verifica se não expirou
    if (data.expires_at) {
      const expiresAt = new Date(data.expires_at);
      if (expiresAt < new Date()) {
        return false;
      }
    }

    return true;
  } catch {
    return false;
  }
}

// Obtém informações da assinatura do usuário
export async function getUserSubscription(userId: string): Promise<UserSubscription | null> {
  try {
    const { data, error } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error) {
      // Se não existe, cria uma assinatura free
      const { data: newSub, error: createError } = await supabase
        .from('subscriptions')
        .insert({
          user_id: userId,
          plan: 'free',
          status: 'active',
          analyses_remaining: 2,
          analyses_total: 2,
        })
        .select()
        .single();

      if (createError) return null;
      return newSub;
    }

    return data;
  } catch {
    return null;
  }
}

// Consome uma análise (decrementa contador)
export async function consumeAnalysis(userId: string): Promise<boolean> {
  try {
    const subscription = await getUserSubscription(userId);
    if (!subscription) return false;

    // Premium tem análises ilimitadas
    if (subscription.plan === 'premium' && subscription.status === 'active') {
      return true;
    }

    // Free precisa ter análises restantes
    if (subscription.analyses_remaining <= 0) {
      return false;
    }

    // Decrementa contador
    const { error } = await supabase
      .from('subscriptions')
      .update({ 
        analyses_remaining: subscription.analyses_remaining - 1,
        updated_at: new Date().toISOString()
      })
      .eq('user_id', userId);

    return !error;
  } catch {
    return false;
  }
}

// Ativa plano premium após pagamento Kiwify
export async function activatePremium(userId: string, kiwifyOrderId: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('subscriptions')
      .update({
        plan: 'premium',
        status: 'active',
        kiwify_order_id: kiwifyOrderId,
        analyses_remaining: -1, // -1 = ilimitado
        analyses_total: -1,
        expires_at: null, // Sem expiração (ou adicione lógica de renovação)
        updated_at: new Date().toISOString()
      })
      .eq('user_id', userId);

    return !error;
  } catch {
    return false;
  }
}
