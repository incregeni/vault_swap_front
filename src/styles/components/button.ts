import { defineStyle, defineStyleConfig } from '@chakra-ui/styled-system';

const baseStyle = defineStyle(props => {
  const { colorScheme: c } = props;
  return {
    borderRadius: 'md',
    fontFamily: 'Righteous',
    fontSize: '20px',
    lineHeight: '25px',
    letterSpacing: '0.13em',
    bg: 'blue.500',
    color: `${c}.800`,
    borderColor: `${c}.500`,
    transition: 'transform 0.15s ease-out, background 0.15s ease-out',
    _hover: {
      transform: 'scale(1.02, 1.02)',
    },
    _active: {
      transform: 'scale(1, 1)',
    },
    _disabled: {
      _hover: {
        transform: 'scale(1, 1)',
      },
      pointerEvents: 'none',
    },
  };
});

// Defining a custom variant
const customVariant = defineStyle({
  borderRadius: 'md',
  fontFamily: 'Righteous',
  lineHeight: '25px',
  bg: 'linear-gradient(#15204c 0 0) padding-box, linear-gradient(to bottom, #CD74CC, #FFBD59 , #70DD88) border-box;',
  border: '1px solid transparent',
  color: 'white',

  _hover: {
    bg: 'linear-gradient(to right, #CD74CC, #FFBD59 , #70DD88)',
    border: '1px solid #15204c',
    color: 'darkblue.500',
    transform: 'scale(1.02, 1.02)',
  },

  _active: {
    bgGradient: 'linear-gradient(to right, #CD74CC, #FFBD59 , #70DD88)',
  },
});

const filledVariant = defineStyle({
  rounded: 'full',
  fontFamily: 'Righteous',
  lineHeight: '25px',
  bg: 'linear-gradient(to right, #CD74CC, #FFBD59 , #70DD88)',
  color: 'darkblue.500',
});

const outlineVariant = defineStyle(props => {
  const { colorScheme: c } = props;
  return {
    color: `gray.500`,

    _hover: {
      color: `${c}.500`,
      transform: 'scale(1.02, 1.02)',
    },
    _active: {
      color: `${c}.500`,
      background: 'blue.500',
    },
  };
});

const outlineSelectedVariant = defineStyle(props => {
  const { colorScheme: c } = props;
  return {
    color: `${c}.500`,
    borderColor: `${c}.500`,
    background: 'blue.500',
    border: '1px solid',
  };
});

export const buttonTheme = defineStyleConfig({
  baseStyle,
  variants: {
    primary: customVariant,
    secondary: filledVariant,
    outline: outlineVariant,
    outlineSelected: outlineSelectedVariant,
  },
  defaultProps: {
    variant: 'primary',
  },
});
