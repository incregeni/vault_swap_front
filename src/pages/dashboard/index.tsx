import { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Input,
  SimpleGrid,
  Text,
  Flex,
  Image,
} from '@chakra-ui/react';
import { getColor } from '@chakra-ui/theme-tools';
import { theme as defaultTheme } from '@chakra-ui/theme';
import moment from 'moment';
import { useAccount } from 'wagmi';

import { CONSTANTS_VEVARA } from '@/config/constants';
import { ILockDuration, IInputPercentage, Token } from '@/interfaces';
import generateToast from '@/components/toast/generateToast';
import { useBaseAssetStore } from '@/store/baseAssetsStore';
import { getBalanceInEther, getBalanceInWei } from '@/utils/formatBalance';
import { CONTRACTS } from '@/config/company';
import callContractWait from '@/lib/callContractWait';
import { useBaconTokenStore } from '@/store/baconTokenStore';
import { useUsttTokenStore } from '@/store/usttTokenStore';
import { useVaultSwapStore } from '@/store/vaultSwapStore';

const { VALUE_PRECENTAGES, LOCK_DURATIONS } = CONSTANTS_VEVARA;

const Dashboard = () => {
  const [usttDepositAmount, setUsttDepositAmount] = useState('');
  const [baconDepositAmount, setBaconDepositAmount] = useState('');
  const [usttWithdrawAmount, setUsttWithdrawAmount] = useState('');
  const [baconWithdrawAmount, setBaconWithdrawAmount] = useState('');
  const [swapAmount, setSwapAmount] = useState('');
  const [isLoading, setLoading] = useState<boolean>(false);

  const { address } = useAccount();

  const {
    ownerAddress,
    depositedSrcBal,
    depositedTargetBal,
    fetUserPosition,
    fetOwnerAddress,
  } = useVaultSwapStore(state => ({
    ownerAddress: state.ownerAddress,
    depositedSrcBal: state.srcTokenBal,
    depositedTargetBal: state.targetTokenBal,
    fetUserPosition: state.actions.fetPosition,
    fetOwnerAddress: state.actions.fetOwnerAddress,
  }));
  const {
    userUsttBalInWei,
    vaultSwapUsttBal,
    usttAllowanceVaultInWei,
    usttFetBalAndAllowance,
    fetVaultSwapUsttBal,
  } = useUsttTokenStore(state => ({
    userUsttBalInWei: state.balance,
    vaultSwapUsttBal: state.vaultSwapBal,
    usttAllowanceVaultInWei: state.vaultSwapAllowance,
    usttFetBalAndAllowance: state.actions.fetBalanceAndAllowance,
    fetVaultSwapUsttBal: state.actions.fetVaultSwapBal,
  }));
  const {
    userBaconBalInWei,
    baconAllowanceVaultInWei,
    baconFetBalAndAllowance,
  } = useBaconTokenStore(state => ({
    userBaconBalInWei: state.balance,
    baconAllowanceVaultInWei: state.vaultSwapAllowance,
    baconFetBalAndAllowance: state.actions.fetBalanceAndAllowance,
  }));

  useEffect(() => {
    fetVaultSwapUsttBal();
    fetOwnerAddress();
  }, []);

  const onChangeUsttDepositAmount = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newAmount = e.target.value;
    if (Number(newAmount) < 0) return;
    setUsttDepositAmount(newAmount);
  };

  const onChangeBaconDepositAmount = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newAmount = e.target.value;
    if (Number(newAmount) < 0) return;
    setBaconDepositAmount(newAmount);
  };
  const onDepositUsttAndBacon = async () => {
    // if (!!amountError) return;

    if (usttAllowanceVaultInWei.lt(getBalanceInWei(usttDepositAmount))) {
      // 1. implement USTT approve logic
      setLoading(true);

      const txObj = {
        address: CONTRACTS.USTT_ADDRESS,
        abi: CONTRACTS.USTT_ABI,
        functionName: 'approve',
        args: [
          CONTRACTS.VAULT_SWAP_ADDRESS,
          getBalanceInWei(usttDepositAmount),
        ],
      };
      const toastObj = {
        title: 'Approve',
        description: 'USTT Token approved',
      };
      const result = await callContractWait(txObj, toastObj);

      if (result) {
        await usttFetBalAndAllowance(address);
      }
    }
    if (baconAllowanceVaultInWei.lt(getBalanceInWei(baconDepositAmount))) {
      // 2. implement BACON approve logic
      setLoading(true);

      const txObj = {
        address: CONTRACTS.BACON_ADDRESS,
        abi: CONTRACTS.BACON_ABI,
        functionName: 'approve',
        args: [
          CONTRACTS.VAULT_SWAP_ADDRESS,
          getBalanceInWei(baconDepositAmount),
        ],
      };
      const toastObj = {
        title: 'Approve',
        description: 'BACON Token approved',
      };
      const result = await callContractWait(txObj, toastObj);

      if (result) {
        await baconFetBalAndAllowance(address);
      }
    }
    // 3. implement 'deposit' logic
    setLoading(true);

    const txObj = {
      address: CONTRACTS.VAULT_SWAP_ADDRESS,
      abi: CONTRACTS.VAULT_SWAP_ABI,
      functionName: 'deposit',
      args: [
        getBalanceInWei(usttDepositAmount),
        getBalanceInWei(baconDepositAmount),
      ],
    };
    const toastObj = {
      title: 'deposit',
      description: 'USTT and Bacon deposited to VaultSwap',
    };
    const result = await callContractWait(txObj, toastObj);

    if (result) {
      await usttFetBalAndAllowance(address);
      await baconFetBalAndAllowance(address);
      await fetUserPosition();
    }

    setLoading(false);
    setUsttDepositAmount('');
    setBaconDepositAmount('');
  };

  const onChangeUsttWithdrawAmount = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newAmount = e.target.value;
    if (Number(newAmount) < 0) return;
    setUsttWithdrawAmount(newAmount);
  };

  const onChangeBaconWithdrawAmount = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newAmount = e.target.value;
    if (Number(newAmount) < 0) return;
    setBaconWithdrawAmount(newAmount);
  };
  const onWithdrawUsttAndBacon = async () => {
    // implement 'withdraw' logic
    setLoading(true);

    const txObj = {
      address: CONTRACTS.VAULT_SWAP_ADDRESS,
      abi: CONTRACTS.VAULT_SWAP_ABI,
      functionName: 'withdraw',
      args: [
        getBalanceInWei(usttWithdrawAmount),
        getBalanceInWei(baconWithdrawAmount),
      ],
    };
    const toastObj = {
      title: 'withdraw',
      description: 'USTT and Bacon withdrawed from VaultSwap',
    };
    const result = await callContractWait(txObj, toastObj);

    if (result) {
      await fetUserPosition();
      await usttFetBalAndAllowance(address);
      await baconFetBalAndAllowance(address);
    }

    setLoading(false);
    setUsttDepositAmount('');
    setBaconDepositAmount('');
  };
  const onChangeSwapAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newAmount = e.target.value;
    if (Number(newAmount) < 0) return;
    setSwapAmount(newAmount);
  };
  const onSwap = async () => {
    // implement 'withdraw' logic
    setLoading(true);

    const txObj = {
      address: CONTRACTS.VAULT_SWAP_ADDRESS,
      abi: CONTRACTS.VAULT_SWAP_ABI,
      functionName: 'swap',
      args: [getBalanceInWei(swapAmount)],
    };
    const toastObj = {
      title: 'swap',
      description: 'Swap USTT to BACON',
    };
    const result = await callContractWait(txObj, toastObj);

    if (result) {
      await fetVaultSwapUsttBal();
      await fetUserPosition();
    }

    setLoading(false);
    setSwapAmount('');
  };

  return (
    <Box
      background={
        'linear-gradient(156.7deg, #0D142E 4.67%, #1F2E64 53.14%, #924C91 126.09%) padding-box, linear-gradient(to bottom, #CD74CC, #FFBD59 , #70DD88) border-box;'
      }
      w={'100%'}
      minW={'350px'}
      maxW={'528px'}
      padding={'25px 26px'}
      borderRadius={'30px'}
      border={'1px solid transparent'}
      letterSpacing={'1.95px'}>
      <Box>
        <Flex
          justifyContent={'space-between'}
          alignItems={'center'}
          mb={'19px'}>
          <Box>
            <Button colorScheme="pink" variant={'outlineSelected'}>
              {`<`}
            </Button>
          </Box>
        </Flex>

        <Box
          border="1px solid #273977"
          borderRadius="10px"
          background="rgba(31, 46, 100, 0.50)"
          padding="22px 20px"
          gap={'10px'}>
          <Flex justifyContent={'space-between'}>
            <Box>
              <Input
                isInvalid={getBalanceInWei(usttDepositAmount).gt(
                  userBaconBalInWei
                )}
                type="number"
                variant={'flushed'}
                placeholder="0.00"
                textAlign="left"
                borderBottomWidth="0px"
                fontSize="25px"
                letterSpacing="3.25px"
                min={0}
                value={usttDepositAmount}
                onChange={onChangeUsttDepositAmount}
              />
            </Box>
            <Flex alignItems={'flex-end'}>
              <Text fontSize="10px" letterSpacing="1.3px">
                {`USTT Balance: ${getBalanceInEther(userUsttBalInWei)}`}
              </Text>
            </Flex>
          </Flex>
          <Flex justifyContent={'space-between'}>
            <Box>
              <Input
                isInvalid={getBalanceInWei(baconDepositAmount).gt(
                  userBaconBalInWei
                )}
                type="number"
                variant={'flushed'}
                placeholder="0.00"
                textAlign="left"
                borderBottomWidth="0px"
                fontSize="25px"
                letterSpacing="3.25px"
                min={0}
                value={baconDepositAmount}
                onChange={onChangeBaconDepositAmount}
              />
            </Box>
            <Flex alignItems={'flex-end'}>
              <Text
                fontSize="10px"
                letterSpacing="1.3px"
                alignItems={'flex-end'}>
                {`Bacon Balance: ${getBalanceInEther(userBaconBalInWei)}`}
              </Text>
            </Flex>
          </Flex>
          <Box marginTop={5}>
            <Button
              colorScheme="yellow"
              w={'100%'}
              fontSize={25}
              fontWeight={400}
              py={'12px'}
              h={58}
              onClick={onDepositUsttAndBacon}
              isLoading={isLoading}
              loadingText="Processing"
              // isDisabled={!!amountError}
            >
              Deposit
            </Button>
          </Box>
        </Box>

        <Box
          marginTop={'20px'}
          border="1px solid #273977"
          borderRadius="10px"
          background="rgba(31, 46, 100, 0.50)"
          padding="22px 20px"
          gap={'10px'}>
          <Flex justifyContent={'space-between'}>
            <Box>
              <Input
                isInvalid={getBalanceInWei(usttWithdrawAmount).gt(
                  depositedSrcBal
                )}
                type="number"
                variant={'flushed'}
                placeholder="0.00"
                textAlign="left"
                borderBottomWidth="0px"
                fontSize="25px"
                letterSpacing="3.25px"
                min={0}
                value={usttWithdrawAmount}
                onChange={onChangeUsttWithdrawAmount}
              />
            </Box>
            <Flex alignItems={'flex-end'}>
              <Text fontSize="10px" letterSpacing="1.3px">
                {`Deposited USTT: ${getBalanceInEther(depositedSrcBal)}`}
              </Text>
            </Flex>
          </Flex>
          <Flex justifyContent={'space-between'}>
            <Box>
              <Input
                isInvalid={getBalanceInWei(baconWithdrawAmount).gt(
                  depositedTargetBal
                )}
                type="number"
                variant={'flushed'}
                placeholder="0.00"
                textAlign="left"
                borderBottomWidth="0px"
                fontSize="25px"
                letterSpacing="3.25px"
                min={0}
                value={baconWithdrawAmount}
                onChange={onChangeBaconWithdrawAmount}
              />
            </Box>
            <Flex alignItems={'flex-end'}>
              <Text fontSize="10px" letterSpacing="1.3px">
                {`Deposited BACON: ${getBalanceInEther(depositedTargetBal)}`}
              </Text>
            </Flex>
          </Flex>
          <Box marginTop={5}>
            <Button
              colorScheme="yellow"
              w={'100%'}
              fontSize={25}
              fontWeight={400}
              py={'12px'}
              h={58}
              onClick={onWithdrawUsttAndBacon}
              isLoading={isLoading}
              loadingText={'processing'}
              // isDisabled={!!amountError}
            >
              Withdraw
            </Button>
          </Box>
        </Box>

        {ownerAddress != address ? (
          <></>
        ) : (
          <Box
            marginTop={'20px'}
            border="1px solid #273977"
            borderRadius="10px"
            background="rgba(31, 46, 100, 0.50)"
            padding="22px 20px"
            gap={'10px'}>
            <Flex justifyContent={'space-between'}>
              <Box>
                <Input
                  isInvalid={getBalanceInWei(swapAmount).gt(vaultSwapUsttBal)}
                  type="number"
                  variant={'flushed'}
                  placeholder="0.00"
                  textAlign="left"
                  borderBottomWidth="0px"
                  fontSize="25px"
                  letterSpacing="3.25px"
                  min={0}
                  value={swapAmount}
                  onChange={onChangeSwapAmount}
                />
              </Box>
              <Flex alignItems={'flex-end'}>
                <Text fontSize="10px" letterSpacing="1.3px">
                  {`VaultSwap USTT Balance: ${getBalanceInEther(
                    vaultSwapUsttBal
                  )}`}
                </Text>
              </Flex>
            </Flex>
            <Box marginTop={5}>
              <Button
                colorScheme="yellow"
                w={'100%'}
                fontSize={25}
                fontWeight={400}
                py={'12px'}
                h={58}
                onClick={onSwap}
                isLoading={isLoading}
                loadingText={'processing'}
                // isDisabled={!!amountError}
              >
                Swap
              </Button>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Dashboard;
