import axios from "axios";

export const registerCustomer = async (name, email, password) => {
    console.log("🚀 ~ file: customerHandler.js:4 ~ registerUser ~ name, email, password:", name, email, password)
    return axios.post(`${process.env.REACT_APP_BACKEND_URL}/auth/register`, {
        name, email, password
    });
}

export const loginCustomer = async (email, password) => {
    return axios.post(`${process.env.REACT_APP_BACKEND_URL}/auth/login`, {}, {
        headers: {
            "Authorization": `Basic ${email}:${password}`
        }
    });
}