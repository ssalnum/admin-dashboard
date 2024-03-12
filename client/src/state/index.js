import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    modo: "dark",
    userId: "63701cc1f03239b7f700000e",
};

export const globalSLice = createSlice({
    name: "global",
    initialState,
    reducers: {
        setModo: (state) => {
            state.modo = state.modo === 'light' ? 'dark' : 'light';
        }
    }
})

export const { setModo } = globalSLice.actions;

export default globalSLice.reducer;