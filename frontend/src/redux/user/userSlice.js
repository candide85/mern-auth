import { createSlice } from "@reduxjs/toolkit";



const initialState = {
    currentUser: null,
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
            state.currentUser = action.payload,
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