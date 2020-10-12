import React, { Fragment, useEffect, useMemo } from 'react';
import logo from './logo.svg';
import './App.css';
import { useWeb3React } from '@web3-react/core'
import { InjectedConnector } from '@web3-react/injected-connector'
import { Web3Provider } from '@ethersproject/providers'
import { formatEther, formatUnits } from "@ethersproject/units";
import ERC20ABI from "./abi/ERC20.abi.json";
import { isAddress } from '@ethersproject/address'
import { Contract } from '@ethersproject/contracts'
import { Networks, shorter } from "./utils/index";
import { TokenList } from "./TokenList";
import { EthBalance } from "./EthBalance";
import { TOKENS_BY_NETWORK } from "./utils/index";
import { useEagerConnect } from "./hooks/useEagerConnect";
import { useInactiveListener } from "./hooks/useInactiveListener";
import ethers from "ethers";
import { useProvider } from "./hooks/useProvider"
import { Counter } from "./Counter";

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
  useProvider()

  const { chainId, account, activate, active, library, connector }: any = useWeb3React<Web3Provider>()

  const onClick = async () => {
    activate(injected)
    console.log('chainId, account, activate, active, connector', chainId, account, activate, active, connector)
  }

  // handle logic to recognize the connector currently being activated
  // const [activatingConnector, setActivatingConnector] = React.useState()
  // console.log('activatingConnector', activatingConnector)
  // React.useEffect(() => {
  //   console.log('Wallet running')
  //   if (activatingConnector && activatingConnector === connector) {
  //     setActivatingConnector(undefined)
  //   }
  // }, [activatingConnector, connector])

  // mount only once or face issues :P
  const triedEager = useEagerConnect()
  useInactiveListener(!triedEager)

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <ul style={{ textAlign: 'left' }}>
          <li>chainId: { chainId }</li>
          <li>account: { shorter(account) }</li>
          <li>active: { active.toString() } {( active ? '✅'  : '❌' )}</li>
          { active && (
            <Fragment>
              <EthBalance></EthBalance>
              <TokenList chainId={ chainId }></TokenList>
              <Counter></Counter>
            </Fragment>
          ) }
        </ul>
        <button onClick={onClick}>Connect</button>
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
