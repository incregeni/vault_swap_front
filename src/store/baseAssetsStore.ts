import { CONTRACTS } from '@/config/company';
import { Token } from '@/interfaces';
import { mapToken } from '@/utils/interfaceMaps';
import axios from 'axios';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface BaseAssetState {
  baseAssets: Token[];
  isLoading: boolean;
  actions: {
    initBaseAssets: () => void;
    getBaseAsset: (address: string) => Token | undefined;
  };
}
const BASE_URL = process.env.NEXT_PUBLIC_API ?? 'https://localhost:8000';

export const useBaseAssetStore = create<BaseAssetState>()(
  devtools((set, get) => ({
    baseAssets: [],
    isLoading: false,
    actions: {
      initBaseAssets: async () => {
        set({ isLoading: true });
        await axios
          .get(BASE_URL.concat('/assets'))
          .then(response => {
            let baseAssets = response.data.data;
            baseAssets = mapToken(baseAssets);

            //* We add Kava Gas token as it's not in the api
            baseAssets.unshift(<Token>{
              address: `0x${CONTRACTS.KAVA_ADDRESS}`,
              decimals: CONTRACTS.KAVA_DECIMALS,
              name: CONTRACTS.KAVA_NAME,
              symbol: CONTRACTS.KAVA_SYMBOL,
              liquidStakedAddress: '',
              logoURI: CONTRACTS.KAVA_LOGO,
              price: baseAssets.find(
                (t: Token) =>
                  t.address.toLowerCase() ===
                  CONTRACTS.WKAVA_ADDRESS.toLowerCase()
              ).price,
              stable: false,
              balance: 0,
            });
            set({ baseAssets });
          })
          .catch(error => console.log(error));
        set({ isLoading: false });
      },
      getBaseAsset: (address: string) => {
        const { baseAssets } = get();
        return baseAssets.find(
          (token: Token) =>
            token.address.toLowerCase() === address.toLowerCase()
        );
      },
    },
  }))
);

// if (process.env.NODE_ENV === 'development') {
//   mountStoreDevtool('BaseAssets', useBaseAssetStore);
// }
