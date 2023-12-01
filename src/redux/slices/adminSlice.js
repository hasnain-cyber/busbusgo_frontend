import { createSlice } from "@reduxjs/toolkit";

export const adminSlice = createSlice({
    name: "adminSlice",
    initialState: {
        value: localStorage.getItem('admin') ? JSON.parse(localStorage.getItem('admin')) : null,
    },
    reducers: {
        loginAdmin: (state, action) => {
            console.log("🚀 ~ file: adminSlice.js:10 ~ action:", action)
            state.value = action.payload;
            localStorage.setItem(
                "admin",
                JSON.stringify(action.payload)
            );
        },

        logoutAdmin: (state) => {
            state.value = null;
            localStorage.setItem(
                "admin",
                JSON.stringify(null)
            );
        },
    },
});

// Action creators are generated for each case reducer function
export const { loginAdmin, logoutAdmin } = adminSlice.actions;
export default adminSlice.reducer;