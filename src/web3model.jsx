import React, { useState } from "react";
import Web3Modal from "web3modal";
import web3 from "web3";
import { ethers } from "ethers";
import { CoinbaseWalletSDK } from "@coinbase/wallet-sdk";
import WalletConnect from "@walletconnect/web3-provider";

export const Web3modaldata = () => {
  const [provider, setProvider] = useState();
  const [library, setLibrary] = useState();
  const [account, setAccount] = useState();
  const [network, setNetwork] = useState();

  const providerOptions = {
    coinbasewallet: {
      package: CoinbaseWalletSDK,
      options: {
        appName: "coinbase connect",
        infuraId: "process.env.INFURA_KEY",
      },
    },

    walletconnect: {
      display: {
        name: "wallet connect",
      },
      package: WalletConnect,
      options: {
        infuraId: "INFURA_ID",
      },
    },
  };
 const web3Modal = new Web3Modal({
        cacheProvider: false,
        providerOptions,
      });
  const connectWallet = async () => {
    try {
     
      console.log("wallet", web3Modal);
      const provider = await web3Modal.connect();
      const library = new ethers.providers.Web3Provider(provider);
      const accounts = await library.listAccounts();
      const network = await library.getNetwork();
      setProvider(provider);
      setLibrary(library);
      
      console.log("wallet 2", library);
      if (accounts) setAccount(accounts[0]);
      setNetwork(network);
    } catch (error) {
      console.error(error);
    }
  };
  const switchNetwork = async () => {
    try {
      await library.provider.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId:  `0x${Number(137).toString(16)}` }],
      });
    } catch (switchError) {
      if (switchError.code === 4902) {
        try {
          await library.provider.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId:  `0x${Number(137).toString(16)}`,
                chainName: "Polygon",
                rpcUrls: ["https://polygon-rpc.com/"],
                blockExplorerUrls: ["https://polygonscan.com/"],
              },
            ],
          });
        } catch (addError) {
          throw addError;
        }
      }
    }
  };
  return (
    <div>
      <h1>Get Balance with Web3Modal</h1>
      <button onClick={connectWallet}>Connect Wallet</button>
      <div>Wallet Address: ${account} </div>
      <button onClick={switchNetwork}>switch network</button>
    </div>
  );
};
