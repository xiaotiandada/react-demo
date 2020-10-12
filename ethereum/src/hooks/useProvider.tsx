import { useState, useEffect } from "react"
import ethers from "ethers";

export function useProvider() {
    const [ provider, setProvider ] = useState()

    useEffect(() => {
        let provider: any = new ethers.providers.Web3Provider((window as any).ethereum)
        console.log('provider', provider)
        setProvider(provider);
        (window as any).provider = provider
    }, [])

    return provider
}