import React, { useEffect, useCallback, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import { formatEther } from "ethers/lib/utils";
import ethers from "ethers";

export const EthBalance = () => {
    const { account, library } = useWeb3React()
    const [balance, setBalance] = useState('0')

    useEffect(() => {

        // listen for changes on an Ethereum address
        const getBalance = async () => {
            // let provider = new ethers.providers.Web3Provider(window.ethereum)
            let balance = await window.provider.getBalance(account)
            setBalance(parseFloat(formatEther(balance)).toPrecision(4))
        }
        getBalance()

        console.log(`listening for blocks...`);
        try {
            library.on('block', () => {
                console.log('update balance...')
                getBalance()
            })
        } catch (e) {
            console.log('e', e)
        }

        // remove listener when the component is unmounted
        return () => {
            library.removeAllListeners('block')
        }
        // trigger the effect only on component mount
    }, [])



    if (!balance) {
        return <div>...</div>
    }
    return <div>ETH: {balance}</div>
}