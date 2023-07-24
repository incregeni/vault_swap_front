import { StyleFunctionProps, extendTheme, keyframes } from '@chakra-ui/react';
import {
  buttonTheme,
  dividerTheme,
  inputTheme,
  modalTheme,
  numberInputTheme,
  // radioTheme,
  // switchTheme,
} from './components';
import { boxTheme } from './components/box';
import { popoverTheme } from './components/popover';
import { switchTheme } from './components/switch';
import { tabsTheme } from './components/tabs';
import { radioTheme } from './components/radio';
import { tooltipTheme } from './components/tooltip';

const gradient = keyframes({
  '0%': {
    backgroundPosition: '0% 0%',
  },
  '50%': {
    backgroundPosition: '30% 40%',
  },
  '100%': {
    backgroundPosition: '0% 0%',
  },
});
const config = {
  initialColorMode: 'dark',
};

export const colors = {
  green: {
    50: '#ffffff',
    100: '#d7f5de',
    200: '#c2f1cd',
    300: '#aeecbb',
    400: '#99e7aa',
    500: '#70dd88',
    600: '#47d366',
    700: '#32ce55',
    800: '#2cbb4c',
    900: '#23913b',
  },
  yellow: {
    50: '#ffffff',
    100: '#fff0d9',
    200: '#ffe6bf',
    300: '#ffdba6',
    400: '#ffd18c',
    500: '#ffbd59',
    600: '#ffa926',
    700: '#ff9f0d',
    800: '#f29200',
    900: '#bf7300',
  },
  blue: {
    50: '#667dd0',
    100: '#3f5cc3',
    200: '#3752b2',
    300: '#31499e',
    400: '#2b408b',
    500: '#1F2E64',
    600: '#131c3d',
    700: '#0d132a',
    800: '#070a16',
    900: '#000000',
  },
  darkblue: {
    50: '#3451b9',
    100: '#293f91',
    200: '#23377e',
    300: '#1e2e6a',
    400: '#182556',
    500: '#0D142E',
    600: '#020306',
    700: '#000000',
    800: '#000000',
    900: '#000000',
  },
  pink: {
    50: '#fcf7fc',
    100: '#efd2ee',
    200: '#e8bfe8',
    300: '#e1ace1',
    400: '#da9ada',
    500: '#CD74CC',
    600: '#c04ebe',
    700: '#b441b3',
    800: '#a13aa0',
    900: '#7c2c7b',
  },
  purple: {
    50: '#dab7d9',
    100: '#c895c7',
    200: '#bf85be',
    300: '#b774b6',
    400: '#ae63ad',
    500: '#924C91',
    600: '#703b70',
    700: '#60325f',
    800: '#4f294e',
    900: '#2d182d',
  },
  red: {
    50: '#ffffff',
    100: '#ffd6d8',
    200: '#ffbcc0',
    300: '#ffa3a8',
    400: '#ff8990',
    500: '#FF5660',
    600: '#ff2330',
    700: '#ff0a18',
    800: '#ef000e',
    900: '#bc000b',
  },
};

const styles = {
  global: (props: StyleFunctionProps) => ({
    body: {
      backgroundImage:
        // 'linear-gradient(156.7deg, #0D142E 4.67%, #1F2E64 53.14%, #924C91 126.09%) no-repeat;',
        'linear-gradient(172deg, #0D142E 9.45%, #1F2E64 45.60%, #924C91 100%);',
      backgroundSize: '200% 250%',
      animation: `${gradient} 10s ease infinite`,
    },
  }),
};
const components = {
  Modal: modalTheme,
  Button: buttonTheme,
  Switch: switchTheme,
  Input: inputTheme,
  NumberInput: numberInputTheme,
  Radio: radioTheme,
  Tabs: tabsTheme,
  Divider: dividerTheme,
  Box: boxTheme,
  Popover: popoverTheme,
  Tooltip: tooltipTheme,
};
const theme = extendTheme({
  config,
  styles,
  colors,
  fonts: {
    heading: 'Righteous',
    body: 'Righteous',
    // body: 'Arista',
  },
  components,
});

export default theme;
