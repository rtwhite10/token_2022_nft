import CreateCollection from "./components/Interactions/CreateCollection";
import CreateMintAccount from "./components/Interactions/CreateMintAccount";
import MintNftStandard from "./components/Interactions/MintNftStandard/MintNftStandard";
import TestProgram from "./components/Interactions/TestProgram/TestProgram";
import Web3WalletProvider from "./components/Web3WalletProvider";
import {walletKeypair, payer, mintAuthority, collectionKeypair, masterEditionKeypair, mintKeypair, metadataKeypair} from "./utils/getWalletData";

export default function Home() {  
  const walletData = {walletKeypair, payer, mintAuthority, collectionKeypair, masterEditionKeypair, mintKeypair, metadataKeypair}

  return (
    <main>
      <Web3WalletProvider>
        <CreateCollection mintSecreteKey={mintKeypair.secretKey} payerSecreteKey={payer.secretKey} metadataSecreteKey={metadataKeypair.secretKey} masterEditionSecreteKey={masterEditionKeypair.secretKey} collectionSecreteKey={collectionKeypair.secretKey} />
        <TestProgram />
        <MintNftStandard mintSecreteKey={mintKeypair.secretKey} payerSecreteKey={payer.secretKey} metadataSecreteKey={metadataKeypair.secretKey} masterEditionSecreteKey={masterEditionKeypair.secretKey} collectionSecreteKey={collectionKeypair.secretKey}/>
      </Web3WalletProvider>
    </main>
  );
}
