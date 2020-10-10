import ERC20ABI from '../abi/ERC20.abi.json'
import { isAddress } from '@ethersproject/address'
import { Contract } from '@ethersproject/contracts'


export const Networks = {
    MainNet: 1,
    Ropsten: 3,
    Rinkeby: 4,
    Goerli: 5,
    Kovan: 42,
}

export interface IERC20 {
    symbol: string
    address: string
    decimals: number
    name: string
    abi: any
}

export const TOKENS_BY_NETWORK: {
    [key: number]: IERC20[]
} = {
    [Networks.MainNet]: [
        {
            address: '0xcd4292701995f4707ae63fb1a48d80db2c5f04d4',
            name: 'Bee2Token',
            symbol: 'BEE',
            decimals: 18,
            abi: ERC20ABI,
        },
    ],
    [Networks.Rinkeby]: [
        {
            address: '0xc7ad46e0b8a400bb3c915120d284aafba8fc4735',
            symbol: 'DAI',
            name: 'DAI',
            decimals: 18,
            abi: ERC20ABI,
        },
        {
            address: '0x0527e400502d0cb4f214dd0d2f2a323fc88ff924',
            symbol: 'DAI',
            name: 'DAI 2',
            decimals: 18,
            abi: ERC20ABI,
        },
    ],
}

export const shorter = (str: string) => str?.length > 8 ? str.slice(0, 6) + '...' + str.slice(-4) : str


export const fetcher = (library: any, abi?: any) => (...args: any) => {
    const [arg1, arg2, ...params] = args
    // it's a contract
    if (isAddress(arg1)) {
        const address = arg1
        const method = arg2
        const contract = new Contract(address, abi, library.getSigner())
        return contract[method](...params)
    }
    // it's a eth call
    const method = arg1
    return library[method](arg2, ...params)
}
