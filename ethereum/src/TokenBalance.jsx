import React, { useEffect, Fragment } from 'react'
import { useWeb3React } from '@web3-react/core'
import useSWR from 'swr'
import { fetcher } from "./utils/index";
import ERC20ABI from './abi/ERC20.abi.json'
import { Contract } from '@ethersproject/contracts'
import { formatUnits } from "@ethersproject/units";

export const TokenBalance = ({ symbol, address, decimals }) => {
    const { account, library } = useWeb3React()
    console.log('symbol, address, decimals', symbol, address, decimals)
    const { data: balance, mutate } = useSWR([address, 'balanceOf', account])
    console.log('TokenBalance balance', balance)

    useEffect(() => {
        // listen for changes on an Ethereum address
        console.log(`listening for Transfer...`)

        const contract = new Contract(address, ERC20ABI, library.getSigner())
        const fromMe = contract.filters.Transfer(account, null)
        library.on(fromMe, (from, to, amount, event) => {
            console.log('Transfer|sent', { from, to, amount, event })
            mutate(undefined, true)
        })
        const toMe = contract.filters.Transfer(null, account)
        library.on(toMe, (from, to, amount, event) => {
            console.log('Transfer|received', { from, to, amount, event })
            mutate(undefined, true)
        })

        // remove listener when the component is unmounted
        return () => {
            library.removeAllListeners(toMe)
            library.removeAllListeners(fromMe)
        }
        // trigger the effect only on component mount
    }, [])

    if (!balance) {
        return <Fragment>...</Fragment>
    }
    return <Fragment>{parseFloat(formatUnits(balance, decimals)).toPrecision(4)}</Fragment>
}