import { create } from 'zustand';
import { BigNumber } from 'ethers';
import { multicall, fetchBalance } from '@wagmi/core';

import { CONTRACTS } from '@/config/company';

interface UsttTokenState {
  vaultSwapBal: BigNumber;
  balance: BigNumber;
  vaultSwapAllowance: BigNumber;
  actions: {
    reset: () => void;
    setVaultSwapBal: (value: BigNumber) => void;
    setBalance: (value: BigNumber) => void;
    setVaultSwapAllowance: (value: BigNumber) => void;
    fetBalanceAndAllowance: (address?: string) => void;
    fetVaultSwapBal: () => void;
  };
}

export const useUsttTokenStore = create<UsttTokenState>((set, get) => ({
  vaultSwapBal: BigNumber.from(0),
  balance: BigNumber.from(0),
  vaultSwapAllowance: BigNumber.from(0),
  actions: {
    reset: () =>
      set({
        vaultSwapBal: BigNumber.from(0),
        balance: BigNumber.from(0),
        vaultSwapAllowance: BigNumber.from(0),
      }),

    setVaultSwapBal: (x: BigNumber) => set({ vaultSwapBal: x }),

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
            address: CONTRACTS.USTT_ADDRESS,
            abi: CONTRACTS.USTT_ABI,
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

    fetVaultSwapBal: async () => {
      const {
        actions: { setVaultSwapBal },
      } = get();

      const data = await fetchBalance({
        address: CONTRACTS.VAULT_SWAP_ADDRESS,
        token: CONTRACTS.USTT_ADDRESS,
      });

      setVaultSwapBal(BigNumber.from(data.value));
    },
  },
}));
