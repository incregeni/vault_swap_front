import { defineStyle, defineStyleConfig } from '@chakra-ui/styled-system';

const customVariant = defineStyle(props => {
  const { colorScheme: c } = props;
  return {
    borderWidth: '1px',
    borderStyle: 'solid',
    borderRadius: '10',
    borderColor: `${c}.900`,
  };
});

export const dividerTheme = defineStyleConfig({
  variants: {
    thick: customVariant,
  },
  defaultProps: {
    variant: 'thick',
    colorScheme: 'whiteAlpha',
  },
});
