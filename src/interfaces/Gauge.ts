import { Bribe } from './Bribe';

export interface Gauge {
  address: `0x${string}`;
  decimals: number;
  totalSupply: number;
  bribeAddress: string;
  feesAddress: string;
  tbv: number;
  votes: number;
  apr: number;
  wrappedBribeAddress?: string;
  reward?: number;
  bribes?: Bribe[];
}
