import React, { useEffect, Fragment } from 'react'
import { useWeb3React } from '@web3-react/core'
import useSWR from 'swr'
import { formatEther, formatUnits } from "@ethersproject/units";
import { fetcher } from "./utils/index";

export const EthBalance = () => {
    const { account, library } = useWeb3React()
    const { data: balance, mutate } = useSWR(['getBalance', account, 'latest'], {
        fetcher: fetcher(library),
    })

    useEffect(() => {
        // listen for changes on an Ethereum address
        console.log(`listening for blocks...`);
        try {
            library.on('block', () => {
                console.log('update balance...')
                mutate(undefined, true)
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