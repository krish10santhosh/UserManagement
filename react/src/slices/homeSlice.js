import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import HomeService from "../shared/services/homeService";

const initialState = {
    userManagementData: {
        getUsersList: {},
        addUser: {},
        updateUser: {},
        getUserData: {},
        deleteUser: {}
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
    async (data) => {
        const res = await HomeService.addUser(data);
        return res.data;
    }
)

export const updateUsersData = createAsyncThunk(
    'user/updateUsersData',
    async (data) => {
        const res = await HomeService.updateUser(data);
        return res.data;
    }
)

export const deleteUsersData = createAsyncThunk(
    'user/deleteUsersData',
    async (data) => {
        const res = await HomeService.deleteUser(data);
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
        getUserAddEditData(state, action) {
            state.userManagementData.getUserData = action.payload;
        }
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
            state.userManagementData.getUsersList = {
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
            state.userManagementData.addUser = {
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
        [updateUsersData.pending]: (state, action) => {
            state.userManagementData.updateUser = {
                isloading: true,
                data: null,
                iserror: false
            }
        },
        [updateUsersData.fulfilled]: (state, action) => {
            state.userManagementData.updateUser = {
                isloading: false,
                data: action.payload,
                iserror: false
            }
        },
        [updateUsersData.error]: (state, action) => {
            state.userManagementData.updateUser = {
                isloading: false,
                data: null,
                iserror: true
            }
        },
        [deleteUsersData.pending]: (state, action) => {
            state.userManagementData.deleteUser = {
                isloading: true,
                data: null,
                iserror: false
            }
        },
        [deleteUsersData.fulfilled]: (state, action) => {
            state.userManagementData.deleteUser = {
                isloading: false,
                data: action.payload,
                iserror: false
            }
        },
        [deleteUsersData.error]: (state, action) => {
            state.userManagementData.deleteUser = {
                isloading: false,
                data: null,
                iserror: true
            }
        },
    }
})

const { reducer } = HomeSlice;
export const { clearStore, getUserAddEditData } = HomeSlice.actions;
export default reducer;