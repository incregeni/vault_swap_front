import { CONTRACTS } from '@/config/company';
import { background } from '@chakra-ui/react';
import { RainbowKitProvider, AvatarComponent } from '@rainbow-me/rainbowkit';

export const CustomAvatar: AvatarComponent = ({ address, ensImage, size }) => {
  return ensImage ? (
    <img
      src={ensImage}
      width={size}
      height={size}
      style={{ borderRadius: 999 }}
    />
  ) : (
    <img
      src={CONTRACTS.GOV_TOKEN_LOGO}
      width={size}
      height={size}
      style={{
        borderRadius: 999,
      }}
    />
  );
};
