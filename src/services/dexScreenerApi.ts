
const DEX_SCREENER_BASE_URL = 'https://api.dexscreener.com/latest/dex';

export interface TokenPair {
  chainId: string;
  dexId: string;
  url: string;
  pairAddress: string;
  baseToken: {
    address: string;
    name: string;
    symbol: string;
  };
  quoteToken: {
    address: string;
    name: string;
    symbol: string;
  };
  priceNative: string;
  priceUsd: string;
  txns: {
    m5: { buys: number; sells: number };
    h1: { buys: number; sells: number };
    h6: { buys: number; sells: number };
    h24: { buys: number; sells: number };
  };
  volume: {
    h24: number;
    h6: number;
    h1: number;
    m5: number;
  };
  priceChange: {
    m5: number;
    h1: number;
    h6: number;
    h24: number;
  };
  liquidity?: {
    usd: number;
    base: number;
    quote: number;
  };
  fdv: number;
  marketCap: number;
}

export interface DexScreenerResponse {
  schemaVersion: string;
  pairs: TokenPair[];
}

export const fetchTokenPairData = async (pairAddress: string): Promise<TokenPair | null> => {
  try {
    const response = await fetch(`${DEX_SCREENER_BASE_URL}/pairs/osmosis/${pairAddress}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: DexScreenerResponse = await response.json();
    return data.pairs?.[0] || null;
  } catch (error) {
    console.error('Error fetching token pair data:', error);
    return null;
  }
};

export const fetchMultipleTokenPairs = async (addresses: string[]): Promise<TokenPair[]> => {
  try {
    const addressesQuery = addresses.join(',');
    const response = await fetch(`${DEX_SCREENER_BASE_URL}/pairs/osmosis/${addressesQuery}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: DexScreenerResponse = await response.json();
    return data.pairs || [];
  } catch (error) {
    console.error('Error fetching multiple token pairs:', error);
    return [];
  }
};
