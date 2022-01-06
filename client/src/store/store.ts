import { atom } from 'recoil';

export const selectedCategory = atom({
  key: 'selectedCategory',
  default: [],
});

export const itemsPerPage = atom({
  key: 'itemsPerPage',
  default: 5,
});
