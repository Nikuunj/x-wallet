import { bufferToHex, publicToAddress } from 'ethereumjs-util';
import { hdkey } from 'ethereumjs-wallet';
import bs58 from 'bs58'
import nacl from 'tweetnacl';
import { derivePath } from 'ed25519-hd-key';
import { Keypair } from '@solana/web3.js'
import { keyPair } from '../store/mnemonics';
import { Buffer } from 'buffer/';
 
export function ethKeyGenerator(id: number, seed: Uint8Array): keyPair {

    const path = `m/44'/60'/${id}'/0'`
    const bufferSeed = Buffer.from(seed);
    // @ts-ignore
    const keyWallet = hdkey.fromMasterSeed(bufferSeed);
    const wallet = keyWallet.derivePath(path).getWallet();
    const privateKey = bufferToHex(wallet.getPrivateKey());
    const publicKey = bufferToHex(publicToAddress(wallet.getPublicKey(), true));

    return {
        privateKey: privateKey,
        publicKey: publicKey
    }
    
}

export function solKeyGenerator(id: number, seed: Uint8Array): keyPair{

    const path = `m/44'/501'/${id}'/0'`
    const derivedSeed = derivePath(path, Buffer.from(seed).toString('hex')).key;
    const privateKeyUint8 = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
    const privateKey = bs58.encode(privateKeyUint8);
    const publicKey = Keypair.fromSecretKey(privateKeyUint8).publicKey.toBase58();

    return {
        privateKey: privateKey,
        publicKey: publicKey
    }
}