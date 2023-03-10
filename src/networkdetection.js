import React, { useState } from "react";
import Web3 from "web3";


const goerliChainId = 5;
const polygonChainId = 137;

const Initialize=()=>{
let web3;
  let connect=async()=>{
const {ethereum}=window;

if(ethereum){
  await ethereum.request({method:'eth_requestAccounts'})
  web3=new Web3(ethereum)
  await switchNetwork(polygonChainId)
 
}
  }
  const getCurentChainId=async()=>{
const currentChainId=web3.eth.getChainId()
 return currentChainId
  }
const switchNetwork=async(chainId)=>{
  const currentChainId=web3.eth.getChainId()
  console.log(currentChainId)
  
  if(currentChainId!== chainId){
    try {
      await web3.currentProvider.request({
  
        method:"wallet_switchEthereumChain",
        params:[{chainId:Web3.utils.toHex(chainId)}]
      })
      
      console.log(`switched to chainid : ${chainId} succesfully`);
    } catch (error) {
      console.log(`Error occure while switching to chain id ${chainId}`, error.code)
      if(error.code===4902){
      addNetwork(polygonNetwork);
      }
    }
  }
  
}

const polygonNetwork = {
  chainId:Web3.utils.toHex(polygonChainId),
  chainName: "Polygon Mainnet",
  nativeCurrency: {
    name: "MATIC",
    symbol: "MATIC", // 2-6 characters long
    decimals: 18
  },
  rpcUrls: ["https://polygon-rpc.com/"],
  blockExplorerUrls:["https://polygonscan.com/"]
}

let addNetwork = async(networkDetails) => {
  try{
      await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [
              networkDetails
          ]
        });
  }catch(err){
      console.log(`error ocuured while adding new chain with chainId:${networkDetails.chainId}, err: ${err.message}`)
  }
}
connect()


}



export default Initialize

// const [networkName , setNetworkName]= useState("");


// const networkDetector=async()=>{
//     if(window.ethereum){
//         const web3=new Web3(window.ethereum)


//         try {
//             const networkId = await web3.eth.net.getId();
//             switch (networkId) {
//               case 1:
//                 setNetworkName("Mainnet");
//                 break;
//               case 137:
//                 setNetworkName("polygon");
//                 break;
//               case 4:
//                 setNetworkName("Rinkeby");
//                 break;
//               case 5:
//                 setNetworkName("Goerli");
//                 break;
//               default:
//                 setNetworkName("Unknown network");
//             }
//           } catch (error) {
//             console.log(error);
//           }
//         } else {
//           console.log("MetaMask is not installed.");
//         }
//       }
//       return (
//         <div>
//           <button onClick={networkDetector}>Detect Network</button>
//           <p>Current network: {networkName}</p>
//         </div>
//       );

