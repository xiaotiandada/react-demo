import React, { useEffect, Fragment, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import ERC20ABI from './abi/ERC20.abi.json'
import { Contract } from '@ethersproject/contracts'
import { formatUnits } from "ethers/lib/utils";
import ethers from "ethers";

interface TokenBalanceInterface {
    symbol: string,
    address: string,
    decimals: number
}

export const TokenBalance = ({ symbol, address, decimals }: TokenBalanceInterface) => {
    const { account, library } = useWeb3React()
    const [balance, setBalance] = useState('0')

    useEffect(() => {
        // listen for changes on an Ethereum address
        console.log(`listening for Transfer...`)

        const balanceOf = async () => {
            // const provider = new ethers.providers.JsonRpcProvider('https://eth-rinkeby.alchemyapi.io/v2/SLFdIfubZlDvaKjRv-rP3Ie0msesJydB');
            let provider = ethers.getDefaultProvider('rinkeby');
            const contract = new ethers.Contract(address, ERC20ABI, provider)
            let response = await contract.balanceOf(account)
            console.log('balanceOf', response)
            setBalance(parseFloat(formatUnits(response, decimals)).toPrecision(4))
        }

        balanceOf ()

        const contract = new Contract(address, ERC20ABI, library.getSigner())
        const fromMe = contract.filters.Transfer(account, null)
        library.on(fromMe, (from: any, to: any, amount: any, event: any) => {
            console.log('Transfer|sent', { from, to, amount, event })
            balanceOf()
        })
        const toMe = contract.filters.Transfer(null, account)
        library.on(toMe, (from: any, to: any, amount: any, event: any) => {
            console.log('Transfer|received', { from, to, amount, event })
            balanceOf()
        })

        // remove listener when the component is unmounted
        return () => {
            library.removeAllListeners(toMe)
            library.removeAllListeners(fromMe)
        }
        // trigger the effect only on component mount
    }, [ account ])

    if (!balance) {
        return <Fragment>...</Fragment>
    }
    return <Fragment>{ balance }</Fragment>
}