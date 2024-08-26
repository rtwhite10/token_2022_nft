import CreateMplCollection from "../components/Interactions/CreateMplCollection";
import Web3WalletProvider from "../components/Web3WalletProvider";

export default function Home() {
  return (
    <main>
      <Web3WalletProvider>
        <CreateMplCollection />
      </Web3WalletProvider>
    </main>
  );
}
