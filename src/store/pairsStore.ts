import { Pair } from '@/interfaces';
import { mapPair } from '@/utils/interfaceMaps';
import axios from 'axios';
import { fetchBalance } from '@wagmi/core';
import { create } from 'zustand';

interface PairsState {
  pairs: Pair[];
  isLoading: boolean;
  actions: {
    initPairs: () => Promise<void>;
    getPair: (address: string) => Pair | undefined;
  };
}
const BASE_URL = process.env.NEXT_PUBLIC_API ?? 'https://localhost:8000';

export const usePairStore = create<PairsState>((set, get) => ({
  pairs: [],
  isLoading: false,
  actions: {
    initPairs: async () => {
      set({ isLoading: true });
      await axios
        .get(BASE_URL.concat('/pairs'))
        .then(response => {
          let pairs = response.data.data;
          pairs = mapPair(pairs);
          set({ pairs });
        })
        .catch(error => console.log(error));
      set({ isLoading: false });
    },
    getPair: (address: string) => {
      const { pairs } = get();
      return pairs.find(
        (pair: Pair) => pair.address.toLowerCase() === address.toLowerCase()
      );
    },
  },
}));
