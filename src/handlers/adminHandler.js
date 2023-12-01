import axios from "axios";

export const loginAdmin = async (email, password) => {
    return axios.post(`${process.env.REACT_APP_BACKEND_URL}/adminAuth/login`, {}, {
        headers: {
            "Authorization": `Basic ${email}:${password}`
        }
    });
}

export const addNode = async () => {
    return axios.post(`${process.env.REACT_APP_BACKEND_URL}/node`);
}