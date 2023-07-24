import { defineStyle, defineStyleConfig } from '@chakra-ui/styled-system';

// Defining a custom variant
const customVariant = defineStyle({
  w: 'container.sm',
  h: 'container.sm',
  bg: 'linear-gradient(156.7deg, #15204c 4.67%, #1F2E64 73.14%, #924C91 126.09%) no-repeat padding-box, linear-gradient(to bottom, #CD74CC, #FFBD59 , #70DD88) border-box',
  border: '1px solid transparent',
  borderRadius: '30px',
  justifyContent: 'center',
  alignItems: 'center',
  p: '8',
  boxShadow: 'lg',
});

export const boxTheme = defineStyleConfig({
  variants: {
    primary: customVariant,
  },
});
