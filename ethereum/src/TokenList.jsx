import React from 'react'
import { TOKENS_BY_NETWORK } from "./utils/index"
import { TokenBalance } from "./TokenBalance";

export const TokenList = ({ chainId }) => {
    return (
        <>
            { TOKENS_BY_NETWORK[chainId].map(token => (
                <div key={ token.address } >
                    { token.name }:
                    <TokenBalance {...token}></TokenBalance>
                </div>
            )) }
        </>
    )
}