import React from 'react'
import styles from './Counter.module.css';

export function Counter() {
    return (
        <div>
            <div className={styles.row}>
                <button
                    className={styles.button}
                    aria-label="Increment value"
                >
                    +
          </button>
                <span className={styles.value}></span>
                <button
                    className={styles.button}
                    aria-label="Decrement value"
                >
                    -
          </button>
            </div>
            <div className={styles.row}>
                <input
                    className={styles.textbox}
                    aria-label="Set increment amount"
                />
                <button
                    className={styles.button}
                >
                    Add Amount
          </button>
                <button
                    className={styles.asyncButton}
                >
                    Add Async
          </button>
            </div>
        </div>
    )
}