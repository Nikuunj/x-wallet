import { mnemonicToSeedSync } from 'bip39';
import { derivePath } from 'ed25519-hd-key';
import { hdkey } from 'ethereumjs-wallet';
import bs58 from 'bs58'
import { Keypair } from '@solana/web3.js'
import { atom, selector } from 'recoil'
import { bufferToHex, publicToAddress } from 'ethereumjs-util';
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

const seedSelector = selector<Buffer>({
    key: 'seedSelector',
    get: ({ get }) => {
        const mnemonics = get(mnemonicsState);
        if(mnemonics) return mnemonicToSeedSync(mnemonics)
        return Buffer.alloc(0);
    }
})
export const solanaKeyPairSelector = selector<keyPair[]>({
    key: 'solanaKeyPairSelector',
    get: ({ get }) => {
        const numberOfAcc = get(account_idx);
        if(!numberOfAcc) return []
        const seed = get(seedSelector);
        
        const keyPairArr: keyPair[] = Array(numberOfAcc).fill(0).map(( _ , idx) => {
            const path = `m/44'/501'/${idx}'/0'`
            const derivedSeed = derivePath(path, seed.toString('hex')).key;
            const privateKeyUint8 = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
            const privateKey = bs58.encode(privateKeyUint8);
            const publicKey = Keypair.fromSecretKey(privateKeyUint8).publicKey.toBase58();

            return {
                privateKey: privateKey,
                publicKey: publicKey
            }
        })
        
        return keyPairArr
    }
})

export const EthKeyPairSelector = selector<keyPair[]>({
    key: 'EthKeyPairSelector',
    get: ({ get }) => {
        const numberOfAcc = get(account_idx);
        if(!numberOfAcc) return []
        const seed = get(seedSelector);
        
        const keyPairArr: keyPair[] = Array(numberOfAcc).fill(0).map(( _ , idx) => {
            const path = `m/44'/60'/${idx}'/0'`

            const keyWallet = hdkey.fromMasterSeed(seed);
            const wallet = keyWallet.derivePath(path).getWallet();
            const privateKey = bufferToHex(wallet.getPrivateKey());
            const publicKey = bufferToHex(publicToAddress(wallet.getPublicKey(), true));

            return {
                privateKey: privateKey,
                publicKey: publicKey
            }
        })
        
        return keyPairArr
    }
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