import { Bribe, Gauge, Pair, Token } from '@/interfaces';

export const mapToken = (token: any): Token | Token[] => {
  const mapping = (t: any) =>
    <Token>{
      address: t.address,
      decimals: t.decimals,
      name: t.name,
      symbol: t.symbol,
      logoURI: t.logoURI,
      stable: t.stable,
      price: t.price,
      liquidStakedAddress: t.liquid_staked_address,
      balance: 0.0,
    };
  if (Array.isArray(token)) {
    return token.map(x => mapping(x));
  } else {
    return mapping(token);
  }
};

export const mapBribe = (bribe: any): Bribe | Bribe[] => {
  const mapping = (b: any) =>
    <Bribe>{
      token: mapToken(b.token),
      rewardAmount: b.reward_ammount ?? 0,
    };
  if (Array.isArray(bribe)) {
    return bribe.map(x => mapping(x));
  } else {
    return mapping(bribe);
  }
};

export const mapGauge = (gauge: any): Gauge | Gauge[] => {
  const mapping = (g: any) =>
    <Gauge>{
      address: g.address,
      decimals: g.decimals,
      totalSupply: g.total_supply,
      bribeAddress: g.bribe_address ?? '',
      feesAddress: g.fees_address ?? '',
      tbv: g.tbv,
      votes: g.votes,
      apr: g.apr,
      wrappedBribeAddress: g.wrapped_bribe_address ?? '',
      reward: g.reward ?? 0,
      bribes: g.bribes ? mapBribe(g.bribes) : undefined,
    };
  if (Array.isArray(gauge)) {
    return gauge.map(x => mapping(x));
  } else {
    return mapping(gauge);
  }
};

export const mapPair = (pair: any): Pair | Pair[] => {
  const mapping = (p: any) =>
    <Pair>{
      address: p.address,
      tvl: p.tvl,
      apr: p.apr,
      symbol: p.symbol,
      decimals: p.decimals,
      stable: p.stable,
      totalSupply: p.total_supply,
      reserve0: p.reserve0,
      reserve1: p.reserve1,
      token0: mapToken(p.token0),
      token1: mapToken(p.token1),
      gauge: p.gauge ? mapGauge(p.gauge) : undefined,
    };
  if (Array.isArray(pair)) {
    return pair.map(x => mapping(x));
  } else {
    return mapping(pair);
  }
};
