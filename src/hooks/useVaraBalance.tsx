import { useState, useEffect } from 'react';
import { BigNumber } from 'ethers';
import { useAccount } from 'wagmi';
import { fetchBalance } from '@wagmi/core';
import { GOV_TOKEN_ADDRESS } from '@/config/company/contracts';

const useVaraBalance = () => {
  const [balance, setBalance] = useState<BigNumber>(BigNumber.from(0));
  const { address, isConnected } = useAccount();

  const fetchVaraBalance = async () => {
    if (isConnected && address) {
      const { value } = await fetchBalance({
        address,
        token: GOV_TOKEN_ADDRESS,
      });

      setBalance(BigNumber.from(value));
    } else {
      setBalance(BigNumber.from(0));
    }
  };

  useEffect(() => {
    fetchVaraBalance();

    const referechInterval = setInterval(() => {
      fetchVaraBalance();
    }, 60000);

    return () => clearInterval(referechInterval);
  }, [address, isConnected]);
  return balance;
};

export default useVaraBalance;
