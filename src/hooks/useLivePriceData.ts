
import { useState, useEffect, useRef } from 'react';
import { fetchTokenPairData, TokenPair } from '@/services/dexScreenerApi';

export const useLivePriceData = (pairAddress: string, refreshInterval: number = 30000) => {
  const [data, setData] = useState<TokenPair | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const fetchData = async () => {
    try {
      setError(null);
      const tokenData = await fetchTokenPairData(pairAddress);
      if (tokenData) {
        setData(tokenData);
        console.log('Live BTC price updated:', tokenData.priceUsd);
      } else {
        setError('No data found for this pair');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch data');
      console.error('Error fetching live price data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Initial fetch
    fetchData();

    // Set up interval for live updates
    intervalRef.current = setInterval(fetchData, refreshInterval);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [pairAddress, refreshInterval]);

  return { data, loading, error, refetch: fetchData };
};
