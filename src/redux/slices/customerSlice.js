import { createSlice } from "@reduxjs/toolkit";

export const customerSlice = createSlice({
    name: "customerSlice",
    initialState: {
        value: localStorage.getItem('customer') ? JSON.parse(localStorage.getItem('customer')) : null,
    },
    reducers: {
        loginCustomer: (state, action) => {
            state.value = action.payload;
            localStorage.setItem(
                "customer",
                JSON.stringify(action.payload)
            );
        },

        logoutCustomer: (state) => {
            state.value = null;
            localStorage.setItem(
                "customer",
                JSON.stringify(null)
            );
        },
    },
});

// Action creators are generated for each case reducer function
export const { loginCustomer, logoutCustomer } = customerSlice.actions;
export default customerSlice.reducer;