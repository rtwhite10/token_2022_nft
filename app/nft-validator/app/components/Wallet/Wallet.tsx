'use client'

import { useCallback, useMemo } from "react";
import { ConnectionProvider, WalletProvider, useWallet } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { PhantomWalletAdapter, SolflareWalletAdapter, UnsafeBurnerWalletAdapter } from '@solana/wallet-adapter-wallets';
import {
    WalletModalProvider,
    WalletDisconnectButton,
    WalletMultiButton
} from '@solana/wallet-adapter-react-ui';
import { Connection, PublicKey, SystemProgram, Transaction, clusterApiUrl } from '@solana/web3.js';
import CreateCollection from "../Interactions/CreateCollection";
import TestProgram from "../Interactions/TestProgram/TestProgram";
import MintNftStandard from "../Interactions/MintNftStandard/MintNftStandard";
 
// Default styles that can be overridden by your app
require('@solana/wallet-adapter-react-ui/styles.css');
 
export const Wallet = () => {
    // The network can be set to 'devnet', 'testnet', or 'mainnet-beta'.
    const network = WalletAdapterNetwork.Devnet;
 
    // You can also provide a custom RPC endpoint.
    const endpoint = useMemo(() => clusterApiUrl(network), [network]);
 
    const wallets = useMemo(
        () => [
            /**
             * Wallets that implement either of these standards will be available automatically.
             *
             *   - Solana Mobile Stack Mobile Wallet Adapter Protocol
             *     (https://github.com/solana-mobile/mobile-wallet-adapter)
             *   - Solana Wallet Standard
             *     (https://github.com/anza-xyz/wallet-standard)
             *
             * If you wish to support a wallet that supports neither of those standards,
             * instantiate its legacy wallet adapter here. Common legacy adapters can be found
             * in the npm package `@solana/wallet-adapter-wallets`.
             */
            new PhantomWalletAdapter(),
            new SolflareWalletAdapter()
            // new UnsafeBurnerWalletAdapter(),
        ],
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [network]
    );

    console.log(wallets)
 
    return (
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets} autoConnect>
                <WalletModalProvider>
                    <div className="flex flex-col gap-20">
                    <WalletMultiButton />
                    <WalletDisconnectButton />
                    <CreateCollection />
                    <TestProgram />
                    <MintNftStandard />
                    </div>
                </WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    );
};


