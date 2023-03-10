import React from "react";
import { ethers } from "ethers";
import CoinbaseWalletSDK from "@coinbase/wallet-sdk";
import WalletConnect from "@walletconnect/web3-provider";
import { Web3Modal } from "@web3modal/react";
 const providerOptions = {
 coinbasewallet: {
   package: CoinbaseWalletSDK, 
   options: {
     appName: "Web 3 Modal Demo",
     infuraId: {3:"https://mainnet.infura.io/v3/"}
   }
 },
//  walletconnect: {
//    package: WalletConnect, 
//    options: {
//      infuraId: {3:"https://mainnet.infura.io/v3"}
//    }
//  }
};
const Web3modal2 = () => {
  const connect = async () => {
   
    try {
      let web3modal = new Web3Modal(
        {
        cacheProvider: false,
        providerOptions,
      });

      const web3modalInstance = await web3modal.connect();
      const web3providerModal = await ethers.providers.Web3Provider(
        web3modalInstance
      );
      console.log("=>",web3modalInstance);
    } catch (error) {
      console.log(error.message);
    }
  };

  return <>
  <div>web3modal2 connect</div>
  <h1>metamask wallet connection </h1>
  <button onClick={connect}>connect wallet</button>
  </>;
};

export default Web3modal2;
