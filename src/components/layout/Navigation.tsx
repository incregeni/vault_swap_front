import { Button, ButtonGroup, Flex, Link } from '@chakra-ui/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { type } from 'os';
const links = [
  {
    id: 'Swap',
    href: '/swap',
    isActive: false,
  },
  { id: 'Pools', href: '/pools', isActive: false },
  { id: 'Dashboard', href: '/dashboard', isActive: false },
];

const Navigation = () => {
  const router = useRouter();
  return (
    <Flex
      justify="center"
      flex="1"
      display={['none', 'none', 'none', 'flex']}
      ml={0}>
      <ButtonGroup
        variant="unstyled"
        spacing="8"
        background={
          'linear-gradient(#0D142E 0 0) padding-box, linear-gradient(to bottom, #CD74CC, #FFBD59 , #70DD88) border-box;'
        }
        border={'1px solid transparent'}
        borderRadius={'30px'}
        py={'2'}
        px={'10'}>
        {links.map(item => (
          <Button
            key={item.id}
            _hover={{ textDecorationLine: 'none', color: 'pink.600' }}>
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
      </ButtonGroup>
    </Flex>
  );
};

export default Navigation;
