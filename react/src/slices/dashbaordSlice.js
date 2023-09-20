import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    dashboarddata: {
        
    }
};

const DashboardSlice = createSlice({
    name: "Dashboard",
    initialState,
    reducers: {
        clearStore() {
            return initialState;
        },
    },
    extraReducers: {

    }
})

const { reducer } = DashboardSlice;
export const { clearStore } = DashboardSlice.actions;
export default reducer;