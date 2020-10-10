import React, { useState } from 'react'
import styles from './Counter.module.css';
import { useSelector, useDispatch } from "react-redux";
import { selectCount, increment, decrement, incrementByAmount, incrementAsync } from './CounterSlice';

export function Counter() {

    const count = useSelector(selectCount)
    const dispatch = useDispatch()
    const [ incrementAmount, setIncrementAmount ] = useState('2')

    return (
        <div>
            <div className={styles.row}>
                <button
                    className={styles.button}
                    aria-label="Increment value"
                    onClick={ () => dispatch(increment()) }
                >+</button>
                <span className={styles.value}>{ count }</span>
                <button
                    className={styles.button}
                    aria-label="Decrement value"
                    onClick={ () => dispatch(decrement()) }
                >-</button>
            </div>
            <div className={styles.row}>
                <input
                    className={styles.textbox}
                    value={ incrementAmount }
                    aria-label="Set increment amount"
                    onChange={ e => setIncrementAmount(e.target.value) }
                />
                <button
                    className={styles.button}
                    onClick={ () => dispatch(incrementByAmount(Number(incrementAmount) || 0)) }
                >Add Amount</button>
                <button
                    className={styles.asyncButton}
                    onClick={ () => dispatch(incrementAsync(Number(incrementAmount) || 0)) }
                >Add Async</button>
            </div>
        </div>
    )
}