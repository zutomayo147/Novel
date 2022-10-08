import { atom } from 'recoil';

export const userState = atom({
    key: 'userDataState',
    default: [],
});

export const isLogIn = atom({
    key: 'isLogIn',
    default: false,
})