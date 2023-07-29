import { createSlice } from "@reduxjs/toolkit";

const initialValue = {
    selectedSuggetionCordinate: {},
}

const cordinateDataSlice = createSlice({
    name: 'suggestionCordinateData',
    initialState: {
        value: initialValue
    },
    reducers: {
        SelectedSuggetionCordinate: (state, action) => {
            state.value.selectedSuggetionCordinate = action.payload
        },
    }
})

export const {
    SelectedSuggetionCordinate
} = cordinateDataSlice.actions;
export default cordinateDataSlice.reducer;