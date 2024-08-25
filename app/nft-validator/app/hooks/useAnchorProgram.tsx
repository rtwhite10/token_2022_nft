import { Connection, clusterApiUrl } from '@solana/web3.js';
import TestProgramIDL from "../../../../target/idl/test_program.json"
import {TestProgram} from "../../../../target/types/test_program"
import MintNftStandardIDL from "../../../../target/idl/mint_nft_standard.json"
import {MintNftStandard} from "../../../../target/types/mint_nft_standard"
import IDL from "../../../../target/idl/mint_nft.json"
import {MintNft} from "../../../../target/types/mint_nft"
import { useAnchorWallet, useWallet } from '@solana/wallet-adapter-react';
import { AccountClient, AnchorProvider, Idl, Program, web3 } from '@coral-xyz/anchor';

const { PublicKey, SystemProgram } = web3;

// // Constants (Replace these with actual program IDs and addresses)
// const TOKEN_2022_PROGRAM_ID = new PublicKey("YourToken2022ProgramID");
// const ASSOCIATED_TOKEN_PROGRAM_ID = new PublicKey("YourAssociatedTokenProgramID");
// const TOKEN_METADATA_PROGRAM_ID = new PublicKey("YourTokenMetadataProgramID");

// NOT USING EITHER OF THESE !!!
const programId = new PublicKey('8S54tvnkJ9HTZ9h5D2NtXJn1yzDEo4pD9Rxs5qe898G6');
// const programIdStandard = new PublicKey('BPDpSVHGv8FTyY6tJ7X6bm1LNjE4JsfNdngNomRJjjcN')

export const useAnchorProgram = () => {
    const wallet = useAnchorWallet()
    const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
    

    if (wallet) {
    
    const provider = new AnchorProvider(connection, wallet, AnchorProvider.defaultOptions());
    const mintNft = new Program<MintNft>(
      IDL as MintNft,
      provider
    );

    const testProgram = new Program<TestProgram>(
      TestProgramIDL as TestProgram,
      provider
    )

    const mintNftStandard = new Program<MintNftStandard>(
      MintNftStandardIDL as MintNftStandard,
      provider
    )


  

    return { programs: {mintNft, testProgram, mintNftStandard}, provider };
  }
  return {}
};

export default useAnchorProgram;
