import {
  Button,
  Divider,
  Flex,
  IconButton,
  Link,
  Slide,
  useDisclosure,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { FiArrowRight, FiMenu } from 'react-icons/fi';
import { EquilibreConnect } from '../core/ConnectButton';
const links = [
  {
    id: 'Swap',
    href: '/swap',
    isActive: false,
  },
  { id: 'Pools', href: '/pools', isActive: false },
  { id: 'Dashboard', href: '/dashboard', isActive: false },
];

const MobileNavigation = () => {
  const router = useRouter();
  const { isOpen, onToggle } = useDisclosure();
  return (
    <>
      <IconButton
        icon={<FiMenu fontSize="1.25rem" />}
        aria-label="Open Menu"
        onClick={onToggle}
        display={['flex', 'flex', 'flex', 'none']}
      />
      <Slide direction="right" in={isOpen}>
        <Flex
          flexDir={'column'}
          overflowY="auto"
          background={
            'linear-gradient(#0B194B 0 0) padding-box, linear-gradient(to bottom, #CD74CC, #FFBD59 , #70DD88) border-box;'
          }
          border={'1px solid transparent'}
          borderRadius={'xl'}
          w={'40vw'}
          h={''}
          pos={'fixed'}
          top={2}
          right={2}
          zIndex={20}>
          <Flex justify="flex-end">
            <IconButton
              variant={'ghost'}
              mt={2}
              mr={3}
              aria-label="Close Menu"
              size="xs"
              icon={<FiArrowRight />}
              onClick={onToggle}
            />
          </Flex>
          <Flex flexDir={'column'} align={'start'} px={6} pb={6} pt={2}>
            <EquilibreConnect mobile={true} />
            {links.map(item => (
              <Button
                key={item.id}
                variant={'unstyled'}
                _hover={{ textDecorationLine: 'none', color: 'pink.600' }}
                onClick={onToggle}>
                <NextLink href={item.href} passHref>
                  <Link
                    fontSize={'md'}
                    fontFamily={'Arista'}
                    letterSpacing={'widest'}
                    color={
                      router.pathname === item.href ? 'yellow.500' : 'gray.400'
                    }
                    style={{ textDecoration: 'none' }}>
                    {item.id}
                  </Link>
                </NextLink>
              </Button>
            ))}
          </Flex>
        </Flex>
      </Slide>
    </>
  );
};

export default MobileNavigation;
