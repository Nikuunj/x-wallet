import { mnemonicToSeedSync } from 'bip39';
import { atom, selector } from 'recoil'
import { ethKeyGenerator, solKeyGenerator } from '../utils/keyGenerator';

export interface keyPair {
    privateKey: string;
    publicKey: string;
}
const seletDefault = selector<string>({
    key: 'seletDefault',
    get: () => {
        const mnemonics = localStorage.getItem('mnemonics');
        if(mnemonics) return mnemonics;
        return '';
    }
})

export const mnemonicsState = atom<string>({
    key: 'mnemonicsState',
    default: seletDefault
})

export const seedSelector = selector<Buffer>({
    key: 'seedSelector',
    get: ({ get }) => {
        const mnemonics = get(mnemonicsState);
        if(mnemonics) return mnemonicToSeedSync(mnemonics)
        return Buffer.alloc(0);
    }
})
export const solanaKeyPairSelector = selector<keyPair[]>({
    key: 'solanaKeyPairSelector/defalut',
    get: ({ get }) => {
        const numberOfAccLocalStore = localStorage.getItem('numberOfAcc');
        if(!numberOfAccLocalStore) return []
        const seed = get(seedSelector);
        const numberOfAcc = parseInt(numberOfAccLocalStore);
        const keyPairArr: keyPair[] = Array(numberOfAcc).fill(0).map(( _ , idx) => {
            return solKeyGenerator(idx , seed);
        })
        
        return keyPairArr
    }
})

export const solKeyPairState = atom<keyPair[]>({
    key: 'solKeyPairState',
    default: solanaKeyPairSelector
})
export const ethKeyPairSelector = selector<keyPair[]>({
    key: 'EthKeyPairSelector/defalut',
    get: ({ get }) => {
        const numberOfAccLocalStore = localStorage.getItem('numberOfAcc');
        if(!numberOfAccLocalStore) return []
        const seed = get(seedSelector);
        const numberOfAcc = parseInt(numberOfAccLocalStore);
        const keyPairArr: keyPair[] = Array(numberOfAcc).fill(0).map(( _ , idx) => {
            return ethKeyGenerator(idx, seed);
        })
        
        return keyPairArr
    }
})

export const ethKeyPairState = atom<keyPair[]>({
    key: 'ethKeyPairState',
    default: ethKeyPairSelector
})

const selectAccountIdx = selector<number>({
    key: 'selctorAccountIdx',
    get: () => {
        const numberOfAccount = localStorage.getItem('numberOfAcc');
        if(numberOfAccount) return parseInt(numberOfAccount)
        return 0;
    }
})
export const account_idx = atom<number>({
    key: 'account_idx',
    default: selectAccountIdx
})

const selectSolYEth = selector<boolean>({
    key: 'selectSolYEth',
    get: () => {
        return localStorage.getItem('solEth') === 'false' ? false : true;
    }
})
export const solYaEth = atom<boolean>({
    key: 'solYaEth',
    default: selectSolYEth
})