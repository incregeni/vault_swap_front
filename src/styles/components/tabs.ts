import { tabsAnatomy as parts } from '@chakra-ui/anatomy';
import {
  createMultiStyleConfigHelpers,
  defineStyle,
} from '@chakra-ui/styled-system';

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(parts.keys);

const customEnclosedVariant = definePartsStyle(props => {
  const { colorScheme: c } = props;

  return {
    tab: {
      borderTopRadius: '5px',
      borderTop: '1px solid',
      borderLeft: '1px solid',
      borderRight: '1px solid',
      borderTopColor: 'rgba(255, 255, 255, 0.5);',
      borderLeftColor: 'rgba(255, 255, 255, 0.5);',
      borderRightColor: 'rgba(255, 255, 255, 0.5);',
      marginLeft: '8',
      px: '6',
      py: '1',
      _hover: {
        borderTopColor: `${c}.400`,
        borderLeftColor: `${c}.400`,
        borderRightColor: `${c}.400`,
        color: `${c}.400`,
      },
      _selected: {
        borderColor: `${c}.500`,
        color: `${c}.500`,
      },
    },
    tablist: {
      borderBottom: '0',
      mb: '0.5px',
    },
    tabpanel: {
      bg: 'linear-gradient(156.7deg, #15204c 4.67%, #1F2E64 73.14%, #924C91 126.09%) no-repeat padding-box, linear-gradient(to bottom, #CD74CC, #FFBD59 , #70DD88) border-box',
      border: '1px solid transparent',
      borderRadius: '30px',
    },
  };
});

const customLineVariant = definePartsStyle(props => {
  const { colorScheme: c } = props;

  return {
    tab: {
      w: '-webkit-fill-available',
      borderTopRadius: 'md',

      _hover: {
        color: `${c}.400`,
      },
      _active: {
        bgColor: 'transparent',
      },
      _selected: {
        color: `${c}.500`,
      },
    },
    tablist: {
      justifyContent: 'space-around',
    },
    tabpanel: {},
  };
});

export const tabsTheme = defineMultiStyleConfig({
  variants: {
    enclosed: customEnclosedVariant,
    line: customLineVariant,
  },
  defaultProps: {
    colorScheme: 'pink',
  },
});
