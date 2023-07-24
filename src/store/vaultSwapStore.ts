import { create } from 'zustand';
import { BigNumber, ethers } from 'ethers';
import { readContract } from '@wagmi/core';

import { CONTRACTS } from '@/config/company';

interface VaultSwapState {
  srcTokenBal: BigNumber;
  targetTokenBal: BigNumber;
  ownerAddress: `0x${string}`;
  actions: {
    reset: () => void;
    setSrcTokenBal: (value: BigNumber) => void;
    setTargetTokenBal: (value: BigNumber) => void;
    setOwnerAddress: (value: `0x${string}`) => void;
    fetPosition: (address?: string) => void;
    fetOwnerAddress: () => void;
  };
}

export const useVaultSwapStore = create<VaultSwapState>((set, get) => ({
  ownerAddress: ethers.constants.AddressZero,
  srcTokenBal: BigNumber.from(0),
  targetTokenBal: BigNumber.from(0),
  actions: {
    reset: () =>
      set({
        srcTokenBal: BigNumber.from(0),
        targetTokenBal: BigNumber.from(0),
        ownerAddress: ethers.constants.AddressZero,
      }),

    setSrcTokenBal: (x: BigNumber) => set({ srcTokenBal: x }),

    setTargetTokenBal: (x: BigNumber) => set({ targetTokenBal: x }),

    setOwnerAddress: (x: `0x${string}`) => set({ ownerAddress: x }),

    fetPosition: async (address?: string) => {
      const {
        actions: { reset, setSrcTokenBal, setTargetTokenBal },
      } = get();

      if (!address) {
        reset();
        return;
      }

      const data = await readContract({
        address: CONTRACTS.VAULT_SWAP_ADDRESS,
        abi: CONTRACTS.VAULT_SWAP_ABI,
        functionName: 'getUserSrcAndTargetTokenBalance',
        args: [address],
      });

      setSrcTokenBal(data[0]);
      setTargetTokenBal(data[1]);
    },
    fetOwnerAddress: async () => {
      const {
        actions: { setOwnerAddress },
      } = get();

      const data = await readContract({
        address: CONTRACTS.VAULT_SWAP_ADDRESS,
        abi: CONTRACTS.VAULT_SWAP_ABI,
        functionName: 'owner',
        args: [],
      });

      setOwnerAddress(data);
    },
  },
}));
