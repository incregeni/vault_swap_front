import { inputAnatomy as parts } from '@chakra-ui/anatomy';
import {
  createMultiStyleConfigHelpers,
  defineStyle,
} from '@chakra-ui/styled-system';

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(parts.keys);

const baseStyle = definePartsStyle(props => {
  const { colorScheme: c } = props;

  return {
    field: {
      rounded: 'full',
      textAlign: 'right',
      _focusVisible: {
        color: `${c}.500`,
      },
      _invalid: {
        color: `pink.500`,
      },
    },
  };
});

const customVariant = defineStyle({
  field: {
    borderRadius: 'md',
    lineHeight: '25px',
    bg: 'linear-gradient(#15204c 0 0) padding-box, linear-gradient(to bottom, #CD74CC, #FFBD59 , #70DD88) border-box;',
    border: '1px solid transparent',
  },
});

const outlineNumberRounded = defineStyle({
  field: {
    borderRadius: 'md',
    border: '1px solid transparent',
  },
});

const xl = defineStyle({
  fontSize: 'lg',
  px: '8',
  h: '16',
});

const sizes = {
  xl: definePartsStyle({ field: xl, addon: xl }),
};

export const inputTheme = defineMultiStyleConfig({
  baseStyle,
  sizes,
  variants: {
    primary: customVariant,
  },
  defaultProps: {
    colorScheme: 'yellow',
    //@ts-expect-error
    focusBorderColor: 'yellow.500',
    errorBorderColor: 'pink.500',
    variant: 'primary',
  },
});

export const numberInputTheme = defineMultiStyleConfig({
  baseStyle,
  variants: {
    primary: customVariant,
    outline: outlineNumberRounded,
  },
  defaultProps: {
    colorScheme: 'yellow',
    //@ts-expect-error
    focusBorderColor: 'yellow.500',
    errorBorderColor: 'pink.500',
    variant: 'primary',
  },
});
