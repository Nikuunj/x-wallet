import { mnemonicToSeedSync } from 'bip39';
import { derivePath } from 'ed25519-hd-key';
import bs58 from 'bs58'
import { Keypair } from '@solana/web3.js'
import { atom, selector } from 'recoil'
import nacl from 'tweetnacl';

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

const seedSelector = selector<string>({
    key: 'seedSelector',
    get: ({ get }) => {
        const mnemonics = get(mnemonicsState);
        if(mnemonics) return mnemonicToSeedSync(mnemonics).toString('hex')
        return ''
    }
})
export const keyPairSelector = selector<keyPair[]>({
    key: 'keyPairSelector',
    get: ({ get }) => {
        const numberOfAcc = get(account_idx);
        if(!numberOfAcc) return []
        const seed = get(seedSelector);
        
        console.log(numberOfAcc);
        
        const keyPairArr: keyPair[] = Array(numberOfAcc).fill(0).map(( _ , idx) => {
            const path = `m/44'/501'/${idx}'/0'`
            const derivedSeed = derivePath(path, seed).key;
            const privateKeyUint8 = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
            const privateKey = bs58.encode(privateKeyUint8);
            const publicKey = Keypair.fromSecretKey(privateKeyUint8).publicKey.toBase58();

            return {
                privateKey: privateKey,
                publicKey: publicKey
            }
        })

        console.log(keyPairArr);
        
        return keyPairArr
    }
})

const selectAccountIdx = selector<number>({
    key: 'selctorAccountIdx',
    get: () => {
        const numberOfAccount = localStorage.getItem('numberOfAcc');
        if(numberOfAccount) return  parseInt(numberOfAccount)
        return 0;
    }
})
export const account_idx = atom<number>({
    key: 'account_idx',
    default: selectAccountIdx
})