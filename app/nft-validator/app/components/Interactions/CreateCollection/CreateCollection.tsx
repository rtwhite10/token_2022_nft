'use client'

import useAnchorProgram from '@/app/hooks/useAnchorProgram';
import { program } from '@coral-xyz/anchor/dist/cjs/native/system';
import { MPL_TOKEN_METADATA_PROGRAM_ID } from '@metaplex-foundation/mpl-token-metadata';
import { ASSOCIATED_TOKEN_PROGRAM_ID, TOKEN_2022_PROGRAM_ID } from '@solana/spl-token';
import { useWallet } from '@solana/wallet-adapter-react';
import { Keypair, PublicKey, SystemProgram } from '@solana/web3.js';
import { useEffect, useState } from 'react';

export default function CreateCollection() {
    const { programs, provider } = useAnchorProgram();
    const wallet = useWallet();
    const [txSignature, setTxSignature] = useState<string | null>(null);

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

        // Create necessary accounts
        const collectionKeypair = Keypair.generate();
        const mintAuthority = wallet.publicKey;
        const metadata = Keypair.generate().publicKey;
        const masterEdition = Keypair.generate().publicKey;
        const destination = Keypair.generate().publicKey;
        const collectionMint = collectionKeypair.publicKey;

        try {
          if(!programs?.mintNft) {
            throw new Error("Program is undefined")
          }
            const tx = await programs.mintNft.methods
                .createCollection()
                .accountsPartial({
                    user: wallet.publicKey,
                    mint: collectionMint,
                    mintAuthority,
                    metadata,
                    masterEdition,
                    destination,
                    systemProgram: SystemProgram.programId,
                    tokenProgram: TOKEN_2022_PROGRAM_ID,
                    associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
                    tokenMetadataProgram: MPL_TOKEN_METADATA_PROGRAM_ID,
                })
                .signers([collectionKeypair])
                .rpc();

            console.log("Transaction signature:", tx);
            setTxSignature(tx);
        } catch (error) {
            console.error("Transaction failed:", error);
        }
    };

    return (
        <div>
            <h1>Create NFT Collection</h1>
            {wallet.connected ? (
                <>
                    <button onClick={handleCreateCollection}>Create Collection</button>
                    {txSignature && <p>Transaction Signature: {txSignature}</p>}
                </>
            ) : (
                <p>Please connect your wallet to create a collection.</p>
            )}
        </div>
    );
}
