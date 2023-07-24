import { defineStyle, defineStyleConfig } from '@chakra-ui/styled-system';

// Defining a custom variant
const customVariant = defineStyle({
  bg: 'linear-gradient(#15204c 0 0) padding-box, linear-gradient(to bottom, #CD74CC, #FFBD59 , #70DD88) border-box;',
  border: '1px solid transparent',
  borderRadius: 'xl',
  justifyContent: 'center',
  alignItems: 'center',
  p: '4',
  boxShadow: 'lg',
});

export const tooltipTheme = defineStyleConfig({
  defaultProps: {
    variant: 'primary',
  },
  variants: {
    primary: customVariant,
  },
});
