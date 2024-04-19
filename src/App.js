import { Alchemy, Network, Utils } from 'alchemy-sdk';
import { useEffect, useState } from 'react';

import './App.css';

// Refer to the README doc for more information about using API
// keys in client-side code. You should never do this in production
// level code.
const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};


// In this week's lessons we used ethers.js. Here we are using the
// Alchemy SDK is an umbrella library with several different packages.
//
// You can read more about the packages here:
//   https://docs.alchemy.com/reference/alchemy-sdk-api-surface-overview#api-surface
const alchemy = new Alchemy(settings);

function App() {
  const [blockNumber, setBlockNumber] = useState();
  const [html, setHtml] = useState();

  useEffect(() => {
    async function getBlockNumber() {
      let block = await alchemy.core.getBlockNumber();
      setBlockNumber(block);

      block = await alchemy.core.getBlockWithTransactions(blockNumber);
      let blockTransactions = block.transactions;

      let div = [];
      let i = 1;
      blockTransactions.forEach(transaction => {
        div.push(<div>{i}From:{transaction.from} / to:{transaction.to} Amount:{Utils.formatEther(transaction.value)}</div>);
        i++; 
    });

    console.log("length",blockTransactions.length,"div", div);
    setHtml(div);
  }

  getBlockNumber();
});

  return (<div className="App"><div>Block Number: {blockNumber}</div><br/>
          <div><br/></div>
          <div>{html}</div>
          </div>);

}
export default App;
