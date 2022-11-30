import { useState } from "react";
const { ethers } = require("ethers");
const INFURA_ID = "5b37779062e04102a6e9efda4c5f5cb9";
const provider = new ethers.providers.JsonRpcProvider(
  `https://mainnet.infura.io/v3/${INFURA_ID}`
);
const ERC20_ABI = [
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "function totalSupply() view returns (uint256)",
];

export default function ConnectSmartContract() {
  let [address, setAddress] = useState("");
  let [name, setName] = useState("");
  let [symbol, setSymbol] = useState("");
  let [totalSupply, setTotalSupply] = useState(0);
  var contract = new ethers.Contract(address, ERC20_ABI, provider);

  async function requestDetails(event) {
    event.preventDefault();
    setName(await contract.name());
    setSymbol(await contract.symbol());
    setTotalSupply(await contract.totalSupply());
  }

  function defineContractAddress(event) {
    setAddress(event.target.value);
    if (address === "") {
      setName(" ");
      setSymbol(" ");
      setTotalSupply(0);
    }
  }

  return (
    <main>
      <span>
        <h1>Retrieve data from Smart Contracts</h1>
        <form>
          <input type="text" onChange={defineContractAddress} />
          <button onClick={requestDetails}>SEARCH</button>
        </form>
        <br />
        <h3>Contract name: {name}</h3>
        <h3>Symbol: {symbol}</h3>
        <h3>Total supply: {ethers.utils.formatEther(totalSupply)}</h3>
      </span>
    </main>
  );
}

// 0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48
