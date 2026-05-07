import { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react';
import { getPatientCredits } from '../../lib/memo3d/api';

const CreditsContext = createContext(null);

const COST_PER_PHOTO = 40;

/**
 * Provider de créditos de IA da paciente. Carrega saldo + ledger no mount,
 * expõe `setBalance(n)` pra atualização imediata após operações que retornam
 * o novo saldo (ex: enhance-photo retorna creditsBalance), e `refetch()` pra
 * sincronizar do servidor quando precisar.
 */
export function CreditsProvider({ children }) {
  const [balance, setBalance] = useState(null);
  const [ledger, setLedger] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const fetchedOnce = useRef(false);

  const refetch = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getPatientCredits();
      setBalance(data.balance);
      setLedger(data.ledger || []);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (fetchedOnce.current) return;
    fetchedOnce.current = true;
    refetch();
  }, [refetch]);

  const value = {
    balance,
    ledger,
    loading,
    error,
    refetch,
    setBalance,
    photosRemaining: balance == null ? null : Math.floor(balance / COST_PER_PHOTO),
    costPerPhoto: COST_PER_PHOTO,
  };

  return <CreditsContext.Provider value={value}>{children}</CreditsContext.Provider>;
}

export function useCredits() {
  const ctx = useContext(CreditsContext);
  if (!ctx) throw new Error('useCredits deve ser usado dentro de CreditsProvider');
  return ctx;
}
