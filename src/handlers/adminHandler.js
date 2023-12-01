import axios from "axios";

export const loginAdmin = async (email, password) => {
    return axios.post(`${process.env.REACT_APP_BACKEND_URL}/adminAuth/login`, {}, {
        headers: {
            "Authorization": `Basic ${email}:${password}`
        }
    });
}

export const addNode = async () => {
    return axios.post(`${process.env.REACT_APP_BACKEND_URL}/admin/addNode`, {}, {
        headers: {
            "Authorization": `Bearer ${JSON.parse(localStorage.getItem('admin')).token}`
        }
    });
}

export const addEdge = async (node_a_id, node_b_id, weight) => {
    return axios.post(`${process.env.REACT_APP_BACKEND_URL}/admin/addEdge`, {
        node_a_id,
        node_b_id,
        weight
    }, {
        headers: {
            "Authorization": `Bearer ${JSON.parse(localStorage.getItem('admin')).token}`
        }
    });
}

export const addBus = async (capacity, days_of_operation, route) => {
    return axios.post(`${process.env.REACT_APP_BACKEND_URL}/admin/addBus`, {
        capacity,
        days_of_operation,
        route
    }, {
        headers: {
            "Authorization": `Bearer ${JSON.parse(localStorage.getItem('admin')).token}`
        }
    });
}