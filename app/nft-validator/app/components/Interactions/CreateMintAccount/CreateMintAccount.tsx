'use client'

import { Connection, Keypair, SystemProgram, Transaction, PublicKey } from '@solana/web3.js';
import { TOKEN_PROGRAM_ID, MintLayout, createInitializeMintInstruction } from '@solana/spl-token';
import { web3 } from '@coral-xyz/anchor';

// Load your existing wallet keypair (e.g., Solana CLI wallet or Phantom wallet)
// Replace the path with the location of your keypair file


// Generate a new keypair for the mint

const CreateMintAccount = ({payer, mintSecreteKey}: {payer: Uint8Array;  mintSecreteKey: Uint8Array}) => {

  const handleCreateMint = async () => {
    try {
      const connection = new Connection('https://api.devnet.solana.com', 'confirmed');
      const lamports = await connection.getMinimumBalanceForRentExemption(MintLayout.span);

      // Convert the payer secret key and mint authority into Keypair and PublicKey
      const walletDataPayer = Keypair.fromSecretKey(Uint8Array.from(payer));
      const mintKeypairFromSecrete = Keypair.fromSecretKey(Uint8Array.from(mintSecreteKey));


      // Create the mint account transaction
      const transaction = new Transaction().add(
        SystemProgram.createAccount({
          fromPubkey: walletDataPayer.publicKey,
          newAccountPubkey: mintKeypairFromSecrete.publicKey,
          space: MintLayout.span,
          lamports,
          programId: TOKEN_PROGRAM_ID,
        }),
        createInitializeMintInstruction(
          mintKeypairFromSecrete.publicKey,          // The mint account's public key
          0,                        // Number of decimal places (0 for NFTs)
          mintKeypairFromSecrete.publicKey,      // The minting authority (ensure this is a PublicKey)
          mintKeypairFromSecrete.publicKey,      // (Optional) The freezing authority
          TOKEN_PROGRAM_ID
        )
      );
       const tx = await web3.sendAndConfirmTransaction(connection, transaction, [walletDataPayer, mintKeypairFromSecrete], {
        skipPreflight: false,
        preflightCommitment: 'confirmed',
      });
      console.log(tx, "TX")
    } catch(err) {
      console.error(err, "ERRR")
    }
  }

  

  return (
    <div>
      <button onClick={handleCreateMint}>create mint account</button>
    </div>
  )
}

export default CreateMintAccount
