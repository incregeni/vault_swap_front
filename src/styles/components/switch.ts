import { defineStyle, defineStyleConfig } from '@chakra-ui/styled-system';

const baseStyle = defineStyle(props => {
  const { colorScheme: c } = props;
  return {
    thumb: {
      bg: `gray.100`,
      border: '1px solid',
      color: 'blue.500',
      w: '1.25rem',
      h: '1.25rem',
      _checked: {
        bg: `${c}.500`,
      },
    },
    track: {
      display: 'flex',
      alignItems: 'center',
      bg: `gray.400`,
      height: '4px',
      pl: '0',
      _checked: {
        bg: `${c}.500`,
      },
    },
  };
});

export const switchTheme = defineStyleConfig({
  baseStyle,
  defaultProps: {
    colorScheme: 'yellow',
  },
});
