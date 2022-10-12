import { atom } from 'recoil';

export const todoListState = atom({
  key: 'todoListState',
  default: [
    {
      id: 0,
      title: 'メール送信',
      isComplete: false,
    },
  ],
});