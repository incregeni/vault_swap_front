import EquilibreCard from '@/components/core/Card';
import {
  Box,
  Button,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Radio,
  RadioGroup,
  SimpleGrid,
  Stack,
  Switch,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react';

const Palette = () => {
  return (
    <SimpleGrid spacing={20}>
      <Box>
        <Heading py={8}>Buttons</Heading>
        <SimpleGrid columns={3} spacing={10}>
          <Button colorScheme="yellow">Default</Button>
          <Button variant={'ghost'}>Ghost</Button>
          <Button variant={'link'}>Link</Button>
          <Button colorScheme="yellow" variant={'outline'}>
            Outline yellow
          </Button>
          <Button colorScheme="yellow" variant={'outlineSelected'}>
            Outline selected yellow
          </Button>
          <Button colorScheme="pink" variant={'outline'}>
            Outline pink
          </Button>
          <Button colorScheme="pink" variant={'outlineSelected'}>
            Outline selected pink
          </Button>
          <Button variant={'unstyled'}>Unstyled</Button>
          <Button variant={'primary'}>Primary</Button>
          <Button variant={'secondary'}>Secondary</Button>
        </SimpleGrid>
      </Box>
      <Box>
        <Heading py={8}>Switch</Heading>
        <SimpleGrid columns={3} spacing={10}>
          <Switch />
        </SimpleGrid>
      </Box>
      <Box>
        <Heading py={8}>Inputs</Heading>
        <SimpleGrid columns={3} spacing={10}>
          <Input placeholder="This is a placeholder" />
          <InputGroup>
            <Input placeholder="This, with an icon" />
            <InputRightElement
              pointerEvents="none"
              color="gray.300"
              fontSize="1.2em"
              children="$"
            />
          </InputGroup>
          <Input isInvalid placeholder="This is invalid" />
          <Input variant={'outline'} placeholder="This is a placeholder" />
          <InputGroup>
            <Input variant={'outline'} placeholder="This, with an icon" />
            <InputRightElement
              pointerEvents="none"
              color="gray.300"
              fontSize="1.2em"
              children="$"
            />
          </InputGroup>
          <Input isInvalid variant={'outline'} placeholder="This is invalid" />
          <InputGroup flexDirection={'column'}>
            <Text fontFamily={'Arista'} fontSize={'sm'}>
              Enter percentage
            </Text>
            <NumberInput
              precision={2}
              step={0.1}
              max={100}
              min={0}
              clampValueOnBlur={true}>
              <InputRightElement
                pointerEvents="none"
                color="gray.300"
                fontSize="1.2em"
                children="%"
              />
              <NumberInputField />
            </NumberInput>
          </InputGroup>
          <InputGroup flexDirection={'column'}>
            <Text fontFamily={'Arista'} fontSize={'sm'}>
              Enter percentage
            </Text>
            <NumberInput
              precision={2}
              step={0.1}
              max={100}
              min={0}
              clampValueOnBlur={true}
              variant={'outline'}>
              <InputRightElement
                pointerEvents="none"
                color="gray.300"
                fontSize="1.2em"
                children="%"
              />
              <NumberInputField />
            </NumberInput>
          </InputGroup>
        </SimpleGrid>
      </Box>
      <Box>
        <Heading mb={10}>Radio Buttons</Heading>
        <RadioGroup name="form-name" isTruncated>
          <Stack>
            <Radio>Radio 1</Radio>
            <Radio>Radio 2</Radio>
          </Stack>
        </RadioGroup>
      </Box>
      <Box>
        <Heading mb={10}>Tabs</Heading>
        <Tabs variant={'enclosed'}>
          <TabList>
            <Tab>V2</Tab>
            <Tab>V3</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>I'm an enclosed tab</TabPanel>
            <TabPanel>
              <Tabs colorScheme="yellow">
                <TabList>
                  <Tab>Stake v3</Tab>
                  <Tab>Unstake v3</Tab>
                </TabList>
                <TabPanels>
                  <TabPanel>
                    <p>I'm the default tab</p>
                  </TabPanel>
                  <TabPanel>
                    <p>Still being the default tab (inside the enclosed)</p>
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </SimpleGrid>
  );
};

export default Palette;
