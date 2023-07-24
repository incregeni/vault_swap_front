import { create } from 'zustand';
import { BigNumber } from 'ethers';
import { multicall } from '@wagmi/core';

import { CONTRACTS } from '@/config/company';

interface BaconTokenState {
  balance: BigNumber;
  vaultSwapAllowance: BigNumber;
  actions: {
    reset: () => void;
    setBalance: (value: BigNumber) => void;
    setVaultSwapAllowance: (value: BigNumber) => void;
    fetBalanceAndAllowance: (address?: string) => void;
  };
}

export const useBaconTokenStore = create<BaconTokenState>((set, get) => ({
  balance: BigNumber.from(0),
  vaultSwapAllowance: BigNumber.from(0),
  actions: {
    reset: () =>
      set({
        balance: BigNumber.from(0),
        vaultSwapAllowance: BigNumber.from(0),
      }),

    setBalance: (x: BigNumber) => set({ balance: x }),

    setVaultSwapAllowance: (x: BigNumber) => set({ vaultSwapAllowance: x }),

    fetBalanceAndAllowance: async (address?: string) => {
      const {
        actions: { reset, setBalance, setVaultSwapAllowance },
      } = get();

      if (!address) {
        reset();
        return;
      }

      const [balanceResult, allowanceResult] = await multicall({
        contracts: [
          {
            address: CONTRACTS.BACON_ADDRESS,
            abi: CONTRACTS.BACON_ABI,
            functionName: 'balanceOf',
            args: [address],
          },
          {
            address: CONTRACTS.VAULT_SWAP_ADDRESS,
            abi: CONTRACTS.VAULT_SWAP_ABI,
            functionName: 'allowance',
            args: [address, CONTRACTS.VAULT_SWAP_ADDRESS],
          },
        ],
      });

      if (balanceResult.status === 'success') {
        setBalance(BigNumber.from(balanceResult.result));
      }
      if (allowanceResult.status === 'success') {
        setVaultSwapAllowance(BigNumber.from(allowanceResult.result));
      }
    },
  },
}));
