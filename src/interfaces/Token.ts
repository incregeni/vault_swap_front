export interface Token {
  price: number | string;
  stable: boolean;
  address: `0x${string}`;
  name: string;
  symbol: string;
  decimals: number | string;
  logoURI: string;
  liquidStakedAddress: string;
  balance: number | string;
}
