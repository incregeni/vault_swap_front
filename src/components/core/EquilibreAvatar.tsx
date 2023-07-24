import {
  Avatar,
  AvatarProps,
  ChakraProps,
  Icon,
  Image,
} from '@chakra-ui/react';

type EquilibreAvatarProps = AvatarProps & {
  src: string;
};

const EquilibreAvatar = ({ src, ...props }: EquilibreAvatarProps) => {
  return (
    <Avatar
      src={src}
      icon={<Image objectFit="contain" src="/images/unknown-logo.png" />}
      {...props}
    />
  );
};

export default EquilibreAvatar;
