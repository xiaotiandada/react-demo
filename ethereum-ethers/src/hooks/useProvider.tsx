import { useState, useEffect } from "react"
import ethers from "ethers";

export function useProvider() {
    const [ provider, setProvider ] = useState()

    useEffect(() => {
        // let provider: any = new ethers.providers.Web3Provider((window as any).ethereum)
        let provider: any = new ethers.providers.Web3Provider((window as any).web3.currentProvider);
        console.log('provider', provider)
        setProvider(provider);
        (window as any).provider = provider
    }, [])

    return provider
}