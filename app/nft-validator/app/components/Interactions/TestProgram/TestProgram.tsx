'use client'

import useAnchorProgram from '@/app/hooks/useAnchorProgram';
import { MPL_TOKEN_METADATA_PROGRAM_ID } from '@metaplex-foundation/mpl-token-metadata';
import { ASSOCIATED_TOKEN_PROGRAM_ID, TOKEN_2022_PROGRAM_ID } from '@solana/spl-token';
import { useWallet } from '@solana/wallet-adapter-react';
import { Keypair, SystemProgram } from '@solana/web3.js';
import { useEffect, useState } from 'react';

export default function TestProgram() {
    const { programs, provider } = useAnchorProgram();
    const wallet = useWallet();
    const [txSignature, setTxSignature] = useState<string | null>(null);
    console.log(programs?.testProgram.programId.toBase58(), " test programId")
    useEffect(() => {
        if (wallet && wallet.publicKey) {
            console.log("Wallet Public Key:", wallet.publicKey.toBase58());
            console.log("Wallet connected to:", wallet.wallet?.adapter.name);
            console.log("Wallet connected to Devnet:", wallet.wallet?.adapter.url);
            console.log(provider)
        }
    }, [wallet,provider]);

    const handleCreateCollection = async () => {
        if (!wallet.publicKey) {
            console.error("Wallet not connected");
            return;
        }

      
        try {
          if(!programs?.testProgram) {
            throw new Error("Program is undefined")
          }
            const tx = await programs.testProgram.methods
                .initialize()
                .rpc();

            console.log("Transaction signature:", tx);
            setTxSignature(tx);
        } catch (error) {
            console.error("Transaction failed:", error);
        }
    };

    return (
        <div>
            <h1>Test program</h1>
            {wallet.connected ? (
                <>
                    <button onClick={handleCreateCollection}>Test Program init</button>
                    {txSignature && <p>Transaction Signature: {txSignature}</p>}
                </>
            ) : (
                <p>Please connect your wallet to create a collection.</p>
            )}
        </div>
    );
}
