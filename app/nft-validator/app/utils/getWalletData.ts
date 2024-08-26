import { Keypair } from '@solana/web3.js';
import { atob } from 'buffer'
import bs58 from 'bs58';;
import * as fs from 'fs';

export const walletKeypair = Keypair.fromSecretKey(
  Uint8Array.from(JSON.parse(fs.readFileSync('/home/rt/Documents/code/program-examples/tokens/nft-operations/anchor/solflare-wallet-keypair.json', 'utf8')))
);

// Use the wallet's public key as the mint authority and payer
export const payer = walletKeypair;
export const mintAuthority = walletKeypair.publicKey; // The minting authority
export const freezeAuthority = walletKeypair.publicKey; // (Optional) The freezing authority
console.log(process.env.MINT_KEY)
export const mintKeypair = Keypair.fromSecretKey(bs58.decode(process.env.MINT_KEY as string))
export const collectionKeypair = Keypair.fromSecretKey(bs58.decode(process.env.COLLECTION_KEY as string))
export const masterEditionKeypair = Keypair.fromSecretKey(bs58.decode(process.env.MASTEREDITION_KEY as string))
export const metadataKeypair = Keypair.fromSecretKey(bs58.decode(process.env.METADATA_KEY as string))
