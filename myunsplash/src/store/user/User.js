import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseURL = "http://localhost:3008/users"

export const getUser = createAsyncThunk('user/getUser', 
    async (_,thunkAPI) => {
        try {
            const response = await axios.get(baseURL)
            return response.data
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message)
        }
    })

export const checkUserLogin = createAsyncThunk('user/checkUserLogin',
async (Data,thunkAPI) => {
    try {
        const response = await axios.post(baseURL + '/checkUserLogin', Data)
        return response.data
    } catch (error) {
        thunkAPI.rejectWithValue(error.message)
    }
})

export const updatePhotoProfile = createAsyncThunk('user/updatePhotoProfile',
    async (Data,{rejectWithValue}) => {
        try {
            const response = await axios.post(baseURL + '/uploadPhotoProfile', Data)
            return response.data
        } catch (error) {
            return rejectWithValue(error.message)
        }
    })

export const checkUsernameSignUp = createAsyncThunk('user/checkUsernameSignUp', 
    async (_id,thunkAPI) => {
        try {
            const response = await axios.post(baseURL + '/checkUsernameSignUp', _id)
            return response.data.username ? response.data.message : response.data.username
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message)
        }
    })

export const addUser = createAsyncThunk('user/addUser', 
    async (addUser,thunkAPI) => {
        try {
            const response = await axios.post(baseURL, addUser)
            return response.data.Found ? (true) : (response.data)
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message)
        }
    })

export const addPost = createAsyncThunk('user/addPost', 
    async (Data,{rejectWithValue}) => {
        try {
            const response = await axios.put(baseURL + '/post', Data)
            return response.data
        } catch (error) {
            return rejectWithValue(error.message)
        }
    })

export const deletePost = createAsyncThunk('user/deletePost', 
    async (Data,{rejectWithValue}) => {
        try {
            const response = await axios.put(baseURL + '/DeletePost', Data)
            return response.data
        } catch (error) {
            return rejectWithValue(error.message)
        }
    })

export const getAllDataUser = createAsyncThunk('user/getAllDataUser', 
    async (_,{rejectWithValue}) => {
        try {
            const response = await axios.get(baseURL)
            return response.data
        } catch (error) {
            return rejectWithValue(error.message)
        }
    })

const initialState = {
    users: [], 
    isLoading: false,
    isError: null,
    isLogin: {},
    checkUsernameSignUp: null,
    filter: []
}
const UserSlice = createSlice({
    name: 'user',
    initialState: initialState,
    extraReducers: {
        [getUser.pending]: (state,action) => {
            state.isLoading = true
            state.isError = null
        },
        [getUser.fulfilled]: (state,action) => {
            state.isLoading = false
            state.isError = null
            state.users = action.payload
        },
        [getUser.rejected]: (state,action) => {
            state.isLoading = false
            state.isError = action.payload
        },

        [checkUserLogin.pending]: (state,action) => {
            state.isLoading = true
            state.isError = null
        },
        [checkUserLogin.fulfilled]: (state,action) => {
            state.isLoading = false
            state.isError = null
            state.isLogin = action.payload
        },
        [checkUserLogin.rejected]: (state,action) => {
            state.isLoading = false
            state.isError = action.payload
        },

        [checkUsernameSignUp.pending]: (state,action) => {
            state.isLoading = true
            state.isError = null
        },
        [checkUsernameSignUp.fulfilled]: (state,action) => {
            state.isLoading = false
            state.isError = null
            state.checkUsernameSignUp = action.payload
        },
        [checkUsernameSignUp.rejected]: (state,action) => {
            state.isLoading = false
            state.isError = action.payload
        },

        [addUser.pending]: (state,action) => {
            state.isLoading = true
            state.isError = null
        },
        [addUser.fulfilled]: (state,action) => {
            state.isLoading = false
            state.isError = null
            state.users.push(action.payload)
        },
        [addUser.rejected]: (state,action) => {
            state.isLoading = false
            state.isError = action.payload
        },

        [getAllDataUser.pending]: (state,action) => {
            state.isLoading = true
            state.isError = null
        },
        [getAllDataUser.fulfilled]: (state,action) => {
            state.isLoading = false
            state.isError = null
            state.users = action.payload
        },
        [getAllDataUser.rejected]: (state,action) => {
            state.isLoading = false
            state.isError = action.payload
        }
    },
    reducers: {
        Search: (state,action) => {
            state.filter = state.users.filter(item => item.fullName.includes(action.payload))
        }
    }
})

export default UserSlice.reducer
export const {Search} = UserSlice.actions