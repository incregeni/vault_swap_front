import { CONTRACTS } from '@/config/company';
import { Token } from '@/interfaces';
import { mapToken } from '@/utils/interfaceMaps';
import axios from 'axios';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface GlobalState {
  tvl: number;
  maxApr: number;
  volume: {
    volume_m5: number;
    volume_h1: number;
    volume_h6: number;
    volume_h24: number;
  };
  isLoading: boolean;
  actions: {
    initGlobalData: () => void;
  };
}
const BASE_URL = process.env.NEXT_PUBLIC_API ?? 'https://localhost:8000';

export const useGlobalStateStore = create<GlobalState>()(
  devtools((set, get) => ({
    tvl: 0,
    maxApr: 0,
    volume: {
      volume_m5: 0,
      volume_h1: 0,
      volume_h6: 0,
      volume_h24: 0,
    },
    isLoading: false,
    actions: {
      initGlobalData: async () => {
        set({ isLoading: true });
        await axios
          .get(BASE_URL.concat('/configuration'))
          .then(response => {
            let configuration = response.data.meta;

            set({
              tvl: configuration.tvl,
              maxApr: configuration.maxApr,
              volume: configuration.volume,
            });
          })
          .catch(error => console.log(error));
        set({ isLoading: false });
      },
    },
  }))
);

// if (process.env.NODE_ENV === 'development') {
//   mountStoreDevtool('BaseAssets', useBaseAssetStore);
// }
