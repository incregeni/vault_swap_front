import { BigNumber, ethers } from 'ethers';

export const getBalanceInEther = (balance: BigNumber | undefined): number => {
  if (!balance) return 0;
  const displayBalance = ethers.utils.formatEther(balance.toString());
  return Number(displayBalance);
};

export const getBalanceInWei = (balance: string, decimals = 18): BigNumber => {
  return balance
    ? ethers.utils.parseUnits(balance, decimals || 18)
    : BigNumber.from(0);
};
