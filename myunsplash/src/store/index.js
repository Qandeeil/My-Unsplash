import { configureStore } from "@reduxjs/toolkit";
import UserSlice from './user/User'

const store = configureStore({reducer: {
    user: UserSlice
}})

export default store