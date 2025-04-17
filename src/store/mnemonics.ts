import { atom, selector } from 'recoil'

interface keyPair {
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
const keyPairSelector = selector({
    key: 'keyPairSelector',
    get: ({ get }) => {
        const keyPair = localStorage.getItem('keyPair');
        if(!keyPair) return [];
        const loopRun = parseInt(keyPair);
        
        
    }
})
export const keyPairState = atom<keyPair[]>({
    key: 'keyPairState',
    default: []
})