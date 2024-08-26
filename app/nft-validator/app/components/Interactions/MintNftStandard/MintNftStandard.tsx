'use client'

import useAnchorProgram from '@/app/hooks/useAnchorProgram';
import { mplCore } from '@metaplex-foundation/mpl-core';
import { findMasterEditionPda, findMetadataPda, MPL_TOKEN_METADATA_PROGRAM_ID } from '@metaplex-foundation/mpl-token-metadata';
import { createUmi, publicKey } from '@metaplex-foundation/umi';
import { ASSOCIATED_TOKEN_PROGRAM_ID, getAssociatedTokenAddressSync, TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { useWallet } from '@solana/wallet-adapter-react';
import { Keypair, PublicKey, SystemProgram } from '@solana/web3.js';
import { useEffect, useState } from 'react';
import * as anchor from '@coral-xyz/anchor';

export default function MintNftStandard({mintSecreteKey, collectionSecreteKey, masterEditionSecreteKey, metadataSecreteKey, payerSecreteKey}: {mintSecreteKey: Uint8Array; payerSecreteKey: Uint8Array; metadataSecreteKey: Uint8Array; masterEditionSecreteKey: Uint8Array; collectionSecreteKey: Uint8Array;}) {
    const { programs, provider } = useAnchorProgram();
    const wallet = useWallet();
    const [txSignature, setTxSignature] = useState<string | null>(null);
    const payerKeypairFromSecrete= Keypair.fromSecretKey(Uint8Array.from(payerSecreteKey));
    const masterEditionKeypairFromSecrete = Keypair.fromSecretKey(Uint8Array.from(masterEditionSecreteKey));
    const metadataKeypairFromSecrete = Keypair.fromSecretKey(Uint8Array.from(metadataSecreteKey));
    const collectionKeypairFromSecrete = Keypair.fromSecretKey(Uint8Array.from(collectionSecreteKey));
    const mintKeypairFromSecrete = Keypair.fromSecretKey(Uint8Array.from(mintSecreteKey));

    const context = {
        eddsa: collectionKeypairFromSecrete, // Assuming the wallet contains eddsa signing capabilities
        programs: {
            metadata: MPL_TOKEN_METADATA_PROGRAM_ID,
        }
    };

    useEffect(() => {
        if (wallet && wallet.publicKey) {
            console.log("Wallet Public Key:", wallet.publicKey.toBase58());
            console.log("Wallet connected to:", wallet.wallet?.adapter.name);
            console.log("Wallet connected to Devnet:", wallet.wallet?.adapter.url);
            console.log(provider)
        }
    }, [wallet,provider]);

    const handleCreateCollection = async () => {
        if (!payerKeypairFromSecrete) {
            console.error("Wallet not connected");
            return;
        }

        try {
          if(!programs?.mintNftStandard) {
            throw new Error("Program is undefined")
          }
            const TOKEN_METADATA_PROGRAM_ID = new anchor.web3.PublicKey(MPL_TOKEN_METADATA_PROGRAM_ID);
        
            const getMetadata = async (mint: anchor.web3.PublicKey): Promise<anchor.web3.PublicKey> => {
                return anchor.web3.PublicKey.findProgramAddressSync(
                [Buffer.from('metadata'), TOKEN_METADATA_PROGRAM_ID.toBuffer(), mint.toBuffer()],
                TOKEN_METADATA_PROGRAM_ID,
                )[0];
            };

            const getMasterEdition = async (mint: anchor.web3.PublicKey): Promise<anchor.web3.PublicKey> => {
                return anchor.web3.PublicKey.findProgramAddressSync(
                [Buffer.from('metadata'), TOKEN_METADATA_PROGRAM_ID.toBuffer(), mint.toBuffer(), Buffer.from('edition')],
                TOKEN_METADATA_PROGRAM_ID,
                )[0];
            };

            const metadata = await getMetadata(collectionKeypairFromSecrete.publicKey);
            const masterEdition = await getMasterEdition(collectionKeypairFromSecrete.publicKey);
            const destination = getAssociatedTokenAddressSync(collectionKeypairFromSecrete.publicKey, payerKeypairFromSecrete.publicKey);
            const mintAuthority = anchor.web3.PublicKey.findProgramAddressSync([Buffer.from('authority')], programs.mintNftStandard.programId)[0];
            const tx = await programs.mintNftStandard.methods
                .createCollection()
                .accountsPartial({
                    user: payerKeypairFromSecrete.publicKey,
                    mint: collectionKeypairFromSecrete.publicKey,
                    mintAuthority,
                    metadata,
                    masterEdition,
                    destination,
                    systemProgram: SystemProgram.programId,
                    tokenProgram: TOKEN_PROGRAM_ID,
                    associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
                    tokenMetadataProgram: MPL_TOKEN_METADATA_PROGRAM_ID,
                })
                .signers([collectionKeypairFromSecrete, payerKeypairFromSecrete])
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
                    <button onClick={handleCreateCollection}>Create Collection Standard</button>
                    {txSignature && <p>Transaction Signature: {txSignature}</p>}
                </>
            ) : (
                <p>Please connect your wallet to create a collection.</p>
            )}
        </div>
    );
}
