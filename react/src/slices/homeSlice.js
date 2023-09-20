import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import HomeService from "../shared/services/homeService";

const initialState = {
    userManagementData: {
        getUsersList: {},
        addUser: {}
    }
};

export const getUsersData = createAsyncThunk(
    'user/getUsersData',
    async (data) => {
        const res = await HomeService.getUsers(data);
        return res.data;
    }
)

export const addUsersData = createAsyncThunk(
    'user/addUsersData',
    async ( data ) => {
        const res = await HomeService.addUser(data);
        return res.data;
    }
)

const HomeSlice = createSlice({
    name: "Home",
    initialState,
    reducers: {
        clearStore() {
            return initialState;
        },
    },
    extraReducers: {
        [getUsersData.pending]: (state, action) => {
            state.userManagementData.getUsersList = {
                isloading: true,
                data: null,
                iserror: false
            }
        },
        [getUsersData.fulfilled]: (state, action) => {
            console.log(state, action)
            state.userManagementData.getUsersList= {
                isloading: false,
                data: action.payload,
                iserror: false
            }
        },
        [getUsersData.error]: (state, action) => {
            state.userManagementData.getUsersList = {
                isloading: false,
                data: null,
                iserror: true
            }
        },
        [addUsersData.pending]: (state, action) => {
            state.userManagementData.addUser = {
                isloading: true,
                data: null,
                iserror: false
            }
        },
        [addUsersData.fulfilled]: (state, action) => {
            state.userManagementData.addUser= {
                isloading: false,
                data: action.payload,
                iserror: false
            }
        },
        [addUsersData.error]: (state, action) => {
            state.userManagementData.addUser = {
                isloading: false,
                data: null,
                iserror: true
            }
        },
    }
})

const { reducer } = HomeSlice;
export const { clearStore } = HomeSlice.actions;
export default reducer;