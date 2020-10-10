import React, { Fragment, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { useWeb3React } from '@web3-react/core'
import { InjectedConnector } from '@web3-react/injected-connector'
import { Web3Provider } from '@ethersproject/providers'
import useSWR from 'swr'
import { formatEther, formatUnits } from "@ethersproject/units";
import ERC20ABI from "./abi/ERC20.abi.json";
import { isAddress } from '@ethersproject/address'
import { Contract } from '@ethersproject/contracts'
import { Networks, shorter } from "./utils/index";
import { TokenList } from "./TokenList";
import { EthBalance } from "./EthBalance";

export const injected = new InjectedConnector({
  supportedChainIds: [
    Networks.MainNet, // Mainet
    Networks.Ropsten, // Ropsten
    Networks.Rinkeby, // Rinkeby
    Networks.Goerli, // Goerli
    Networks.Kovan, // Kovan
  ]
})

function App() {
  const web3React = useWeb3React()

  const { chainId, account, activate, active }: any = useWeb3React<Web3Provider>()

  const onClick = () => {
    activate(injected)
    console.log('chainId, account, activate, active', chainId, account, activate, active)
  }

  console.log('web3React', web3React)

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <ul style={{ textAlign: 'left' }}>
          <li>chainId: { chainId }</li>
          <li>account: { shorter(account) }</li>
          <li>active: { active.toString() } {( active ? '✅'  : '❌' )}</li>
          { active && (
            <li>
              <EthBalance></EthBalance>
              <TokenList chainId={ chainId }></TokenList>
            </li>
          ) }
        </ul>

        <button onClick={onClick}>Click</button>

        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
