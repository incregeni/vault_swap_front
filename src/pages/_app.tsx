import { CustomAvatar } from '@/components/core/AvatarRainbow';
import Layout from '@/components/layout/Layout';
import { chains, configuration } from '@/config/wagmi';
import { myTheme } from '@/styles/components';
import '@/styles/globals.css';
import { ChakraProvider } from '@chakra-ui/react';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { WagmiConfig } from 'wagmi';
import { Fonts } from '../styles/Fonts';
import theme from '../styles/theme';
import React from 'react';

export default function App({ Component, pageProps }: AppProps) {
  const AnyComponent = Component as any;
  return (
    <React.Fragment>
      <Head>
        <title>Équilibre Finance</title>
        <meta
          name="description"
          content="Équilibre Finance offical Dapp in KAVA"
        />
        <meta
          name="viewport"
          content="minimum-scale=1, width=device-width, initial-scale=1"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <WagmiConfig config={configuration}>
        <RainbowKitProvider
          chains={chains}
          theme={myTheme}
          avatar={CustomAvatar}
          coolMode>
          <ChakraProvider theme={theme}>
            <Fonts />
            <Layout>
              <AnyComponent {...pageProps} />
            </Layout>
          </ChakraProvider>
        </RainbowKitProvider>
      </WagmiConfig>
    </React.Fragment>
  );
}
