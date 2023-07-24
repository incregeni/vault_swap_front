export interface VeNFT {
  id: number;
  lockEnds: bigint;
  lockAmount: number;
  lockValue: number;
}

export interface ILockDuration {
  label: string;
  value: number;
}

export interface IInputPercentage {
  label: string;
  value: number;
}
