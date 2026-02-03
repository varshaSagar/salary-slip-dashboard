import { configureStore } from "@reduxjs/toolkit";
import recordsReducer from "./recordsSlice";

export const store = configureStore({
    reducer: {
        records: recordsReducer,
    },
})