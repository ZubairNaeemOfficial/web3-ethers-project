import React, { useEffect, useState } from "react";
import { ethers } from "ethers";

const networks = {
  polygon: {
    chainId: `0x${Number(137).toString(16)}`,
    chainName: "Polygon Mainnet",
    nativeCurrency: {
      name: "Polygon Mainnet",
      symbol: "MATIC",
      decimal: 18,
    },
    rpcUrls: ["https://polygon-rpc.com/"],
    blockExplorerUrls: ["https://polygonscan.com"],
  },

  bsc: {
    chainId: `0x${Number(97).toString(16)}`,
    chainName: "Binance Smart Chain Testnet",
    nativeCurrency: {
      name: "Binance Smart Chain Testnet",
      symbol: "tBNB",
      decimals: 18,
    },
    rpcUrls: [`https://endpoints.omniatech.io/v1/bsc/testnet/public`],
    blockExplorerUrls: ["https://testnet.bscscan.com"],
  },
};

const changeNetwork = async ({ networkName, setError }) => {
  try {
    if (!window.ethereum) throw new Error("No crypto wallet found");
    await window.ethereum.request({
      method: "wallet_addEthereumChain",
      params: [
        {
          ...networks[networkName],
        },
      ],
    });
  } catch (err) {
    setError(err.message);
  }
};

const Ethereum = () => {
  const [error, setError] = useState(null);
  const [defaultAccount, setDefaultAccount] = useState(null);
  const [userBalance, setUserBalance] = useState(null);

  const handleNetworkSwitch = async (networkName) => {
    setError();
    await changeNetwork({ networkName, setError });
    console.log(networkName);
  };

  const networkChanged = (chainId) => {
    console.log({ chainId });
  };

  useEffect(() => {
    window.ethereum.on("chainChanged", networkChanged);

    return () => {
      window.ethereum.removeListener("chainChanged", networkChanged);
    };
  }, []);

  const ConnectWallet = async () => {
    if (window.ethereum) {
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((result) => {
          accountChanged([result[0]]);
        });
    } else {
      setError("Error in installing meta mask installation");
    }
  };
  const accountChanged = (defAcc) => {
    setDefaultAccount(defAcc);
  };
  const getUserBalance = async (accountAddress) => {
    window.ethereum
      .request({
        method: "eth_getBalance",
        params: [String(accountAddress), "latest"],
      })
      .then((balance) => {
        setUserBalance(ethers.utils.formatEther(balance));
      });
  };
  const sendTransactions = async (e)=> {
    e.preventDefault()
    let params = [
      {
        from: "0x271d8b19CbD2A230a7c47591633e73d78840B900",
        to: "0x9f5867a49a5CbE8A474754115e1A82Ac5E86E76b",
        gas: Number(21000).toString(16),
        gasprice: Number(2500000).toString(16),
        value: Number(10000000000000000).toString(16),
      },
    ];
    let result = await window.ethereum.request({
      method: "eth_sendTransaction",
      params,
    }).catch((error)=>{
      console.log(error.message)
    })
  };
  getUserBalance(defaultAccount);
  ConnectWallet()
  return (
    <>
      <h1>Ethereum Connection</h1>
      {/* <button onClick={ConnectWallet}>connect wallet</button> */}
      <p>Address:{defaultAccount}</p>
      <p>Balance:{userBalance}</p>

      <div className="mt-4">
        <button
          onClick={() => handleNetworkSwitch("polygon")}
          className="mt-2 mb-2 btn btn-primary submit-button focus:ring focus:outline-none w-full"
        >
          Switch to polygon
        </button>
        <button
          onClick={() => handleNetworkSwitch("bsc")}
          className="mt-2 mb-2 bg-warning border-warning btn submit-button focus:ring focus:outline-none w-full"
        >
          Switch to BSC
        </button>
        <form onSubmit={sendTransactions}>
          <input type="submit" value="submit"/>
        </form>
      </div>
    </>
  );
};

export default Ethereum;
