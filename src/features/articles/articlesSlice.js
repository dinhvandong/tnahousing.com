import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentSelected: {

    }

};

export const articlesSlice = createSlice({
    name: "articles",
    initialState,
    reducers: {
        addCurrentSelected: (state, action) => {
            state.currentSelected = action.payload;
        }
    },
});

export const { addCurrentSelected } =
    articlesSlice.actions;
export default articlesSlice.reducer;
