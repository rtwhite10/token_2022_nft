import { Connection, PublicKey, clusterApiUrl } from '@solana/web3.js';

// Connect to Devnet
export const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');

// Example: Program ID (replace with your actual Program ID)
export const programId = new PublicKey("8S54tvnkJ9HTZ9h5D2NtXJn1yzDEo4pD9Rxs5qe898G6");

// Get the wallet (this could be integrated with Phantom or Solflare)
export const getWalletPublicKey = async (): Promise<PublicKey | null> => {
    if (window.solana && window.solana.isPhantom) {
        await window.solana.connect();
        return window.solana.publicKey;
    }
    return null;
};
