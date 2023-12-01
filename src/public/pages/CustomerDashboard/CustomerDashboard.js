import React, { useEffect } from 'react'
import NavbarComponent from '../../../components/NavbarComponent/NavbarComponent'
import { getAvailableBuses, bookSeat } from '../../../handlers/busHandler'
import { Button, Dropdown, DropdownButton } from 'react-bootstrap'
import { weekDays } from '../../../utils'

const AvailableBus = (bus, start_node_id, end_node_id, customer_id) => {
    const { occupied_seats, capacity, _id } = bus;
    const n_occupied_seats = occupied_seats.filter(seat => seat).length;
    
    const occupied_percentage = (n_occupied_seats / capacity) * 100;
    let bus_color = 'green';
    if (occupied_percentage > 60) bus_color = 'yellow';
    if (occupied_percentage > 90) bus_color = 'red';

    const handleClickBookButton = async (e) => {
        // open prompt and take seat number
        const response = window.prompt("Enter seat number");
        if (!response) return;

        const seat_number = parseInt(response);
        if (!seat_number || occupied_seats[seat_number]) return alert("Invalid input");

        try {
            const response = await bookSeat(customer_id, _id, seat_number, start_node_id, end_node_id);
            console.log("🚀 ~ file: AdminDashboard.js:10 ~ handleClickBookButton ~ response:", response)
        } catch (err) {
            console.log(err);
            alert("Something went wrong");
        }
    }

    return (
        <div key={bus._id}>
            <span className='d-block'>Bus Id: {_id}</span>
            <span>Bus Color: {bus_color}</span>

            <Button onClick={handleClickBookButton}>Book</Button>
        </div>
    )
}

export default function CustomerDashboard() {
    const [source, setSource] = React.useState('')
    const [destination, setDestination] = React.useState('')
    const [selectedDay, setSelectedDay] = React.useState(null);

    const [availableBuses, setAvailableBuses] = React.useState([])
    const [myBookings, setMyBookings] = React.useState([])

    const customer_id = JSON.parse(localStorage.getItem('customer'))._id;

    // useEffect(async () => {
    //     try {

    //     } catch (err) {
    //         console.log(err);
    //     }
    // })

    const handleSelectDay = (eventKey, event) => {
        const dayValue = weekDays[eventKey].value; // Get the bitmask value of the selected day
        setSelectedDay(dayValue); // Set the selected day's bitmask
    };

    const handleClickFindBus = async () => {
        if (source.length === 0 || destination.length === 0 || selectedDay === null) return alert("Invalid input");

        try {
            const response = await getAvailableBuses(source, destination, selectedDay);
            if (response.status === 200) {
                console.log("🚀 ~ file: CustomerDashboard.js:35 ~ handleClickFindBus ~ response:", response.data)
                setAvailableBuses(response.data.buses);
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            <NavbarComponent />

            <h1>Find available buses</h1>
            <input type='text' placeholder='Source' value={source} onChange={(e) => setSource(e.target.value)} />
            <input type='text' placeholder='Destination' value={destination} onChange={(e) => setDestination(e.target.value)} />
            <div>
                <DropdownButton
                    id="dropdown-day"
                    title={selectedDay ? `Selected Day: ${weekDays.find(day => day.value === selectedDay).name}` : 'Select Day of Travel'}
                    variant="info"
                    onSelect={handleSelectDay}
                >
                    {weekDays.map((day, index) => (
                        <Dropdown.Item key={index} eventKey={index}>
                            {day.name}
                        </Dropdown.Item>
                    ))}
                </DropdownButton>
            </div>

            <Button onClick={handleClickFindBus}>Find Buses</Button>

            <h1>Available Buses</h1>
            {availableBuses.length > 0 ? availableBuses.map(bus => AvailableBus(bus, source, destination, customer_id)) : <span>No buses available</span>}

            <h1>My bookings</h1>
            <span>Coming soon</span>
        </>
    )
}
