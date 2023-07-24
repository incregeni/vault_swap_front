import { Gauge } from './Gauge';
import { Token } from './Token';

export interface Pair {
  address: `0x${string}`;
  tvl: number;
  apr: number;
  symbol: string;
  decimals: number;
  stable: boolean;
  totalSupply: number;
  reserve0: number;
  reserve1: number;
  token0: Token;
  token1: Token;
  gauge?: Gauge;
  balanceStaked: number | string;
  balanceStakedUSD: number | string;
  balanceDeposited: number | string;
  balanceDepositedUSD: number | string;
}
