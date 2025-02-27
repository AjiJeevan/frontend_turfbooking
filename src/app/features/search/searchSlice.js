import { createSlice } from "@reduxjs/toolkit";

export const searchSlice = createSlice({
    name : 'searchValue',
    initialState : {
        value : ""
    },
    reducers : {
        setSearchValue : (state, action) => {
            state.value = action.payload
        }
    }
})

export const { setSearchValue } = searchSlice.actions

export default searchSlice.reducer