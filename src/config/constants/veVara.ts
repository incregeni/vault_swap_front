import { ILockDuration, IInputPercentage } from '@/interfaces';

export const LOCK_DURATIONS: ILockDuration[] = [
  {
    label: '1 Week',
    value: 7,
  },
  {
    label: '1 Month',
    value: 30,
  },
  {
    label: '1 Year',
    value: 365,
  },
  {
    label: '4 Years',
    value: 4 * 365,
  },
];

export const VALUE_PRECENTAGES: IInputPercentage[] = [
  { label: '25%', value: 25 },
  { label: '50%', value: 50 },
  { label: '75%', value: 75 },
  { label: '100%', value: 100 },
];
