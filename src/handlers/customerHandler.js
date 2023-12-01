import axios from "axios";

export const registerCustomer = async (name, email, password) => {
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

export const getCustomerBookings = async (customer_id) => {
    return axios.post(`${process.env.REACT_APP_BACKEND_URL}/customer/getBookings`, {
        customer_id
    });
}

