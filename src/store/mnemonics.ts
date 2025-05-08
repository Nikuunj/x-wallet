import { mnemonicToSeedSync } from 'bip39';
import { atom, selector } from 'recoil'
import { ethKeyGenerator, solKeyGenerator } from '../utils/keyGenerator';

export interface keyPair {
    privateKey: string;
    publicKey: string;
    balance: number;
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
    key: 'solanaKeyPairSelector/default',
    get: async ({ get }) => {
        const numberOfAccLocalStore = localStorage.getItem('numberOfAcc');
        if (!numberOfAccLocalStore) return [];

        const seed = get(seedSelector);
        const numberOfAcc = parseInt(numberOfAccLocalStore);

        const keyPairPromises = Array(numberOfAcc).fill(0).map(async (_, idx) => {
            try {
                const keyPair = await solKeyGenerator(idx, seed);
                return keyPair;
            } catch (error) {
                console.error('Error generating keyPair:', error);
                return {
                    privateKey: "privateKeyEncoded",
                    publicKey: "publicKeyEncoded",
                    balance: 0
                };
            }
        });

        const keyPairArr = await Promise.all(keyPairPromises);
        console.log('keyPairArr', keyPairArr);
        return keyPairArr;
    }
});


export const solKeyPairState = atom<keyPair[]>({
    key: 'solKeyPairState',
    default: solanaKeyPairSelector
})
export const ethKeyPairSelector = selector<keyPair[]>({
    key: 'EthKeyPairSelector/default',
    get: async ({ get }) => {
        const numberOfAccLocalStore = localStorage.getItem('numberOfAcc');
        if (!numberOfAccLocalStore) return [];

        const seed = get(seedSelector);
        const numberOfAcc = parseInt(numberOfAccLocalStore);

        // Generate all keyPairs concurrently and wait for them to resolve
        const keyPairPromises = Array.from({ length: numberOfAcc }, (_, idx) =>
            ethKeyGenerator(idx, seed).catch((error) => {
                console.error(`Error generating keyPair ${idx}:`, error);
                return {
                    privateKey: "privateKeyEncoded",
                    publicKey: "publicKeyEncoded",
                    balance: 0
                };
            })
        );

        const keyPairArr = await Promise.all(keyPairPromises);
        return keyPairArr;
    }
});


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