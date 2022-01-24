import { atom } from 'recoil';

export const footerVisibleState = atom<boolean>({
  key: 'isFooterVisible',
  default: true,
});
