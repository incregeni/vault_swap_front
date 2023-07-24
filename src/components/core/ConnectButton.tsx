import { CONTRACTS } from '@/config/company';
import WalletIcon from '@/styles/WalletIcon';
import { Avatar, Button, useBreakpointValue, Text, Image } from '@chakra-ui/react';
import { ConnectButton } from '@rainbow-me/rainbowkit';

export const EquilibreConnect = (mobile: any) => {
  const isDesktop = useBreakpointValue({ base: false, lg: true });
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        mounted,
      }) => {
        // Note: If your app doesn't use authentication, you
        // can remove all 'authenticationStatus' checks
        const ready = mounted;
        const connected = ready && account && chain;

        return (
          <div
            {...(!ready && {
              'aria-hidden': true,
              style: {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              },
            })}>
            {(() => {
              if (!connected) {
                return (
                  <Button
                    size={'sm'}
                    p={isDesktop ? 4 : 0}
                    borderRadius={'lg'}
                    onClick={openConnectModal}
                    variant={isDesktop ? 'primary' : 'unstyled'}>
                    Connect Wallet
                  </Button>
                );
              }

              if (chain.unsupported) {
                return (
                  <Button colorScheme="pink" onClick={openChainModal}>
                    Wrong network
                  </Button>
                );
              }

              return isDesktop ? (
                <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                  {/* MULTICHAIN OPTION */}
                  {/* <Button
                    colorScheme="yellow"
                    variant={'outline'}
                    borderRadius={'xl'}
                    onClick={openChainModal}
                    p={0}
                    style={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar
                      size={'xs'}
                      name={chain.name}
                      src={CONTRACTS.KAVA_LOGO}
                    />
                  </Button> */}

                  <Button
                    colorScheme="yellow"
                    variant={'primary'}
                    borderRadius={'full'}
                    size={'sm'}
                    onClick={openAccountModal}
                    py={5}
                    px={5}
                    gap={2}
                    _hover={{
                      color: 'blue.500',
                      transform: 'scale(1.05)',
                    }}
                    _active={{
                      bg: 'blue.500',
                    }}>
                    <Text fontSize={'xs'} color={'yellow.500'}>
                    {account.displayName}
                    </Text>
                    <WalletIcon w={'6'} h={'6'} />
                  </Button>
                </div>
              ) : (
                <>
                  <Button
                    colorScheme="yellow"
                    variant={'unstyled'}
                    _hover={{ color: 'yellow.500' }}
                    borderRadius={'full'}
                    size={'sm'}
                    onClick={openAccountModal}>
                    {account.displayName}
                    {/* {account.displayBalance
                      ? ` (${account.displayBalance})`
                      : ''} */}
                  </Button>
                </>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};
