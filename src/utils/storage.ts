import { StorageSchema } from '~types/storage';

export const getStorageItem = <T extends keyof StorageSchema>(key: T): StorageSchema[T] | null => {
  return window.localStorage.getItem(key) as StorageSchema[T];
};

export const setStorageItem = <T extends keyof StorageSchema>(
  key: T,
  value: StorageSchema[T],
): void => {
  window.localStorage.setItem(key, JSON.stringify(value));
};
