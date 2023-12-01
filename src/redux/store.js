import { configureStore } from "@reduxjs/toolkit";
import adminReducer from "./slices/adminSlice";
import customerReducer from "./slices/customerSlice";

export default configureStore({
    reducer: {
        admin: adminReducer,
        customer: customerReducer,
    },
});