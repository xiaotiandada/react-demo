import React, { Fragment, useEffect, useMemo } from 'react';
import logo from './logo.svg';
import './App.css';
import { useWeb3React } from '@web3-react/core'
import { InjectedConnector } from '@web3-react/injected-connector'
import { Web3Provider } from '@ethersproject/providers'
import useSWR, { SWRConfig } from 'swr'
import ethFetcher from 'swr-eth'
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

  const { chainId, account, activate, active, library, connector }: any = useWeb3React<Web3Provider>()

  const onClick = () => {
    activate(injected)
    console.log('chainId, account, activate, active, connector', chainId, account, activate, active, connector)
  }

  console.log('web3React', web3React)

  const ABIs = useMemo(() => {
    return (TOKENS_BY_NETWORK[chainId] || []).map<[string, any]>(
      ({ address, abi }) => [address, abi]
    )
  }, [chainId])

  console.log({ABIs})

  // handle logic to recognize the connector currently being activated
  const [activatingConnector, setActivatingConnector] = React.useState()
  React.useEffect(() => {
    console.log('Wallet running')
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined)
    }
  }, [activatingConnector, connector])

  // mount only once or face issues :P
  const triedEager = useEagerConnect()
  console.log('triedEager', triedEager)
  useInactiveListener(!triedEager || !!activatingConnector)

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
              <SWRConfig value={{ fetcher: ethFetcher(library, new Map(ABIs)) }}>
                <EthBalance></EthBalance>
                <TokenList chainId={ chainId }></TokenList>
              </SWRConfig>
            </li>
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
