import React, { useState, useEffect } from 'react'
import { useWeb3React } from '@web3-react/core'
import { formatUnits } from "ethers/lib/utils";
import ethers from "ethers";
import COUNTER from "./abi/COUNTER.json";
import ERC20ABI from './abi/ERC20.abi.json'

export const Counter = () => {

    const { account } = useWeb3React()
    const [counter, setCounter] = useState(0)

    const getCounter = async () => {
        let provider = ethers.getDefaultProvider('rinkeby');
        // const provider = new ethers.providers.JsonRpcProvider('https://eth-rinkeby.alchemyapi.io/v2/SLFdIfubZlDvaKjRv-rP3Ie0msesJydB');
        const COUNTERABI: any = COUNTER
        const contract = new ethers.Contract('0x90b7eae6c6c189e1466c35ee8dc9930be2dcddf1', COUNTERABI, provider)
        let response = await contract.get()
        console.log('balanceOf', response.toNumber())
        setCounter(response.toNumber())
    }

    const increment = async () => {
        console.log('COUNTERABI', COUNTER)
        const COUNTERABI: any = COUNTER
        let provider = ethers.getDefaultProvider('rinkeby');
        // const provider = new ethers.providers.JsonRpcProvider('https://eth-rinkeby.alchemyapi.io/v2/SLFdIfubZlDvaKjRv-rP3Ie0msesJydB')
        const contract = new ethers.Contract('0x90b7eae6c6c189e1466c35ee8dc9930be2dcddf1', COUNTERABI, provider)
        const signer = (window as any).provider.getSigner()
        const contractWithSigner = contract.connect(signer)
        const tx = await contractWithSigner.increase()
        await tx.wait()
        console.log('tx', tx)
    }

    useEffect(() => {
        getCounter ()
    }, [ account ]);

    return (
        <div>
            Counter
            <br/>
            <button onClick={() => getCounter() }>Get Counter { counter }</button>
            <button onClick={() => increment()}>Increase</button>
        </div>
    )
}