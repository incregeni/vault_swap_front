import { Global } from '@emotion/react';
export const Fonts = () => (
  <Global
    styles={`
      /* latin-ext */
      @font-face {
        font-family: 'Arista';
        font-style: normal;
        font-weight: 700;
        font-display: swap;
        src: url(/fonts/AristaProAlternate-Light.woff2) format('woff2');
      }
      /* latin */
      @font-face {
        font-family: 'Righteous';
        font-style: normal;
        font-weight: 700;
        font-display: swap;
        src: url(/fonts/Righteous-Regular.woff2) format('woff2');
      }
      `}
  />
);
