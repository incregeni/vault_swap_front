import { modalAnatomy as parts } from '@chakra-ui/anatomy';
import {
  createMultiStyleConfigHelpers,
  defineStyle,
} from '@chakra-ui/styled-system';

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(parts.keys);

const baseStyle = definePartsStyle(props => {
  const { colorScheme: c } = props;

  return {
    dialog: {
      bg: 'linear-gradient(#15204c 0 0) padding-box, linear-gradient(to bottom, #CD74CC, #FFBD59 , #70DD88) border-box;',
      border: '1px solid transparent',
      borderRadius: '30px',
    },
  };
});

export const modalTheme = defineMultiStyleConfig({
  baseStyle,
});
