import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import counterReducer from "../counter/CounterSlice";


export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>

export const store = configureStore({
    reducer: {
        counter: counterReducer
    }
})