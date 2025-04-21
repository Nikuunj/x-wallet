import { Wallet } from 'ethers';
import bs58 from 'bs58'
import nacl from 'tweetnacl';
import { Keypair } from '@solana/web3.js'
import { HDKey } from '@scure/bip32';
import { bytesToHex } from '@noble/hashes/utils';
import { keyPair } from '../store/mnemonics';
 
export function ethKeyGenerator(id: number, seed: Buffer): keyPair{

    try {
        const path = `m/44'/60'/0'/${id}'`;
        const hdKey = HDKey.fromMasterSeed(seed);
        const child = hdKey.derive(path);
        const privateKey = bytesToHex(child.privateKey!); // or just use as-is with ethers
        const wallet = new Wallet(`0x${privateKey}`);
        
        return {
          privateKey: wallet.privateKey,
          publicKey: wallet.address,
        };
    } catch (error) {
        return {
            privateKey: "privateKeyEncoded",
            publicKey: "publicKeyEncoded"
        }
    }
    
}


export function solKeyGenerator(id: number, seed: Buffer): keyPair{


    try {
        const path = `m/44'/501'/0'/${id}'`        
        const hdkey = HDKey.fromMasterSeed(seed); // creates master HDKey
        const derived = hdkey.derive(path); 
        
        if (!derived.privateKey) {
            throw new Error('Private key not found at path');
        }
  

        const naclKeyPair = nacl.sign.keyPair.fromSeed(derived.privateKey);
        const keypair = Keypair.fromSecretKey(naclKeyPair.secretKey);

    
        const privateKeyEncoded = bs58.encode(keypair.secretKey);
        const publicKeyEncoded = keypair.publicKey.toBase58();
    
        return {
            privateKey: privateKeyEncoded,
            publicKey: publicKeyEncoded
        }
    } catch (error) {
        console.error('solKeyGenerator error:', error);
        return {
            privateKey: "privateKeyEncoded",
            publicKey: "publicKeyEncoded"
        }
    }
}