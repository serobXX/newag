import { Countries } from './constants';

export const checkIfEmptyPhoneNumber = (number: string) => {
  let isEmpty = false;
  for (let i = 0; i < Countries.length; i++) {
    if (`${Countries[i].code}` === number) {
      isEmpty = true;
      break;
    }
  }

  return isEmpty;
};

export const formatNumber = (number: string) => {
  return `+${number.replace(/\D/g, '')}`;
};
