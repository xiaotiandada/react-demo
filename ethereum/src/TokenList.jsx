import React from 'react'
import { TOKENS_BY_NETWOR } from "./utils/index"
import { TokenBalance } from "./TokenBalance";

export const TokenList = ({ chainId }) => {
    return (
        <>
            { TOKENS_BY_NETWOR[chainId].map(token => (
                <div>
                    { token.name }:
                    <TokenBalance key={ token.address } {...token}></TokenBalance>
                </div>
            )) }
        </>
    )
}