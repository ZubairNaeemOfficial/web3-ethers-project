import { ethers } from "ethers";
import React from "react";

const polygonNetwork = {
  chainId: `0x${Number(137).toString(16)}`,
  chainName: "Polygon Mainnet",
  nativeCurrency: {
    name: "MATIC",
    symbol: "MATIC", // 2-6 characters long
    decimals: 18,
  },
  rpcUrls: ["https://polygon-rpc.com/"],
  blockExplorerUrls: ["https://polygonscan.com/"],
};

const NetworkAddEthers = () => {
  let switchToCustomNetwork = async () => {
    const networkId = await window.ethereum.request({ method: "eth_chainId" });
    console.log("networkId",networkId)
    if (networkId !== polygonNetwork.chainId) {
      const chainExists = await window.ethereum
        .request({
          method: "wallet_addEthereumChain",
          params: [polygonNetwork],
        })
        .then(() => true)
        .catch(() => false);
      if (chainExists) {
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: polygonNetwork.chainId }],
        });
      }
    }
  };


  const connect=async ()=> {

    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        await switchToCustomNetwork();
        const provider = new ethers.providers.JsonRpcProvider( 
           polygonNetwork.rpcUrls[0]);
        
        const network = await provider.getNetwork();
  
        console.log(`Connected to ${network.name} (${network.chainId})`);
  
      } catch (error) {
        console.error(error);
      }
    } else {
      console.error('Metamask not detected!');
    }
    
  }

  connect()

  return <div>networkAddEthers</div>;
};

export default NetworkAddEthers;
