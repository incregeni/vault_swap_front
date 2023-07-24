import generateToast from '@/components/toast/generateToast';
import { TransactionText } from '@/interfaces';
import { writeContract, waitForTransaction } from '@wagmi/core';

const callContractWait = async (
  request: any,
  transactionText: TransactionText
) => {
  return await writeContract({
    ...request,
  })
    .then(
      ({ hash }) => {
        generateToast(
          'Transaction sent',
          'Your transaction has been submitted to the network',
          'loading'
        );
        return waitForTransaction({ hash }).then(
          ({ status }) => {
            if (status === 'success') {
              generateToast(
                transactionText.title,
                transactionText.description,
                'success',
                hash
              );
              return true;
            }
            if (status === 'reverted') {
              generateToast(
                'Transaction failed',
                'Your transaction has been reverted',
                'error',
                hash
              );
              return false;
            }
          },
          error => {
            generateToast(
              'Error meanwhile waiting for transaction',
              error.message,
              'error',
              hash
            );
            return false;
          }
        );
      },
      error => {
        generateToast(
          'Transaction canceled by the user',
          error.message,
          'error'
        );
        return false;
      }
    )
    .catch(error => {
      generateToast('Unknown error', error.message, 'error');
      return false;
    });
};

export default callContractWait;
