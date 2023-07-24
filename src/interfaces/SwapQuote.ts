import { Route } from './Route';
import { Token } from './Token';

export interface SwapQuote {
  from?: Token;
  to?: Token;
  inAmount?: string;
  outAmount?: string;
  routes?: Route[];
  priceImpact?: string;
  type?: 'external' | 'internal';
  externalData?: { estimatedGas: string; data: any; gasPrice: string };
}
