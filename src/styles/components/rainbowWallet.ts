import { Theme, darkTheme } from '@rainbow-me/rainbowkit';
import merge from 'lodash.merge';
import { colors } from '../theme';

export const myTheme = merge(darkTheme(), {
  colors: {
    accentColor: colors.yellow[500],
    accentColorForeground: colors.darkblue[500],
    actionButtonSecondaryBackground: colors.blue[500],
    error: colors.pink[500],
    modalBackground: colors.blue[500],
  },
  fonts: {
    body: 'Righteous',
  },
} as Theme);
