import axios from "axios";

export const getAvailableBuses = async (source_node_id, destination_node_id, day_of_travel) => {
    return axios.post(`${process.env.REACT_APP_BACKEND_URL}/bus/getAvailableBuses`, {
        source_node_id,
        destination_node_id,
        day_of_travel
    });
}

export const bookSeat = async (customer_id, bus_id, seat_id, start_node_id, end_node_id) => {
    console.log("🚀 ~ file: busHandler.js:12 ~ bookSeat ~ customer_id, bus_id, seat_id, start_node_id, end_node_id:", customer_id, bus_id, seat_id, start_node_id, end_node_id)
    return axios.post(`${process.env.REACT_APP_BACKEND_URL}/bus/bookSeat`, {
        customer_id,
        bus_id,
        seat_id,
        start_node_id,
        end_node_id
    });
}

export const cancelSeat = async (customer_token, booking_id) => {
    return axios.post(`${process.env.REACT_APP_BACKEND_URL}/bus/cancelSeat`, {
        booking_id,
    }, {
        headers: {
            "Authorization": `Bearer ${customer_token}`
        },
    });
}