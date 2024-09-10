import { createSlice } from "@reduxjs/toolkit";



const initialState = {
    currenUser: null,
    loading: false,
    error: false
}


const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        startSignin: (state) => {
            state.loading = true
        },

        succesSignin: (state, action) => {
            state.currenUser = action.payload,
            state.loading = false,
            state.error = false
        },

        failureSignin: (state, action) => {
            state.loading = false,
            state.error = action.payload
        }
    }
})


export const { startSignin, succesSignin, failureSignin } = userSlice.actions

export default userSlice.reducer