import { Wallet, JsonRpcProvider ,formatEther  } from 'ethers';
import bs58 from 'bs58'
import nacl from 'tweetnacl';
import { Keypair, Connection } from '@solana/web3.js'
import { HDKey } from '@scure/bip32';
import { bytesToHex } from '@noble/hashes/utils';
import { keyPair } from '../store/mnemonics';

const solRpc = import.meta.env.VITE_SOL_RPC;
const ethRpc = import.meta.env.VITE_ETH_RPC;

 
export async function ethKeyGenerator(id: number, seed: Buffer): Promise<keyPair> {    

    const connection = new JsonRpcProvider(ethRpc);
    try {
        const path = `m/44'/60'/0'/${id}'`;
        const hdKey = HDKey.fromMasterSeed(seed);
        const child = hdKey.derive(path);
        const privateKey = bytesToHex(child.privateKey!);
        const wallet = new Wallet(`0x${privateKey}`);

        const publicKey = wallet.address;
        
        const balanceEthWei = await connection.getBalance(publicKey)
        const balanceEthString = formatEther(balanceEthWei);
        const balanceEth = parseFloat(balanceEthString); 
        return {
            privateKey: wallet.privateKey,
            publicKey: publicKey,
            balance: balanceEth
        };
    } catch (error) {
        return {
            privateKey: "privateKeyEncoded",
            publicKey: "publicKeyEncoded",
            balance: 0
        }
    }
    
}


export async  function solKeyGenerator(id: number, seed: Buffer): Promise<keyPair> {    

    const connection = new Connection(solRpc, 'confirmed');
    

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
        const balanceSol = await connection.getBalance(keypair.publicKey)
    
        return {
            privateKey: privateKeyEncoded,
            publicKey: publicKeyEncoded,
            balance: balanceSol / 1000000000
        }
    } catch (error) {
        console.error('solKeyGenerator error:', error);
        return {
            privateKey: "privateKeyEncoded",
            publicKey: "publicKeyEncoded",
            balance: 0
        }
    }
}