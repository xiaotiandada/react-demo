import React, { useEffect, useCallback } from 'react'
import { useWeb3React } from '@web3-react/core'
import { formatEther } from "@ethersproject/units";
import ethers from "ethers";

export const EthBalance = () => {
    const { account, library } = useWeb3React()
    useEffect(() => {
        // listen for changes on an Ethereum address
        console.log(`listening for blocks...`);
        try {
            library.on('block', () => {
                console.log('update balance...')
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
    return <div>ETH: {parseFloat(formatEther(balance)).toPrecision(4)}</div>
}