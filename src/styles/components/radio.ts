import { radioAnatomy as parts } from '@chakra-ui/anatomy';
import {
  createMultiStyleConfigHelpers,
  defineStyle,
} from '@chakra-ui/styled-system';

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(parts.keys);

const baseStyle = definePartsStyle(props => {
  const { colorScheme: c } = props;

  return {
    control: {
      borderColor: `gray.500`,
      _checked: {
        bg: `${c}.500`,
        borderColor: `${c}.500`,
        color: `${c}.500`,
      },
    },
    label: {
      _checked: {
        color: `${c}.500`,
      },
      color: `gray.500`,
    },
  };
});

export const radioTheme = defineMultiStyleConfig({
  baseStyle,
  defaultProps: {
    colorScheme: 'yellow',
  },
});
