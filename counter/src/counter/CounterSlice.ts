import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../app/store";

interface CounterState {
    value: number
}

const initialState: CounterState = {
    value: 0
}

export const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        increment: state => {
            state.value += 1
        },
        decrement: state => {
            state.value -= 1
        },
        incrementByAmount: (state, action: PayloadAction<number>) => {
            console.log('action', action)
            state.value += action.payload
        }
    }
})

export const { increment, decrement, incrementByAmount } = counterSlice.actions

export const incrementAsync = (amount: number): AppThunk => dispatch => {
    setTimeout(() => {
        dispatch(incrementByAmount(amount))
    }, 1000)
}

export const selectCount = (state: RootState) => state.counter.value

export default counterSlice.reducer