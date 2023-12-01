import React, { useEffect } from 'react'
import NavbarComponent from '../../../components/NavbarComponent/NavbarComponent'
import { getAvailableBuses, bookSeat, cancelSeat } from '../../../handlers/busHandler'
import { Button, Dropdown, DropdownButton, Container, Card, Col, Row } from 'react-bootstrap'
import { weekDays } from '../../../utils'
import { getCustomerBookings } from '../../../handlers/customerHandler'
import './CustomerDashboard.css'

const BusComponent = ({ capacity, occupied_seats }) => {
    // Determine the number of rows based on the capacity and decide the number of seats per row
    const seatsPerRow = 4;
    const totalRows = Math.ceil(capacity / seatsPerRow);

    console.log(occupied_seats)

    // Function to render seats with seat numbers and availability
    const renderSeats = () => {
        const seats = [];

        for (let row = 0; row < totalRows; row++) {
            const seatRow = [];

            for (let seatIndex = 0; seatIndex < seatsPerRow; seatIndex++) {
                if (row * seatsPerRow + seatIndex >= capacity) break;
                const seatNumber = row * seatsPerRow + seatIndex;
                const isSeatAvailable = !occupied_seats[seatNumber]; // Adjust index

                seatRow.push(
                    <Col key={seatNumber} className="text-center">
                        <div
                            className={`seat ${isSeatAvailable ? 'available' : 'occupied'}`}
                        >
                            {seatNumber}
                        </div>
                    </Col>
                );
            }

            seats.push(
                <Row key={row} className="mb-3">
                    {seatRow}
                </Row>
            );
        }

        return seats;
    };

    return (
        <Container>
            <div className="bus w-100">
                {renderSeats()}
            </div>
        </Container>
    );
};

const AvailableBus = (bus, start_node_id, end_node_id, customer_id) => {
    const { occupied_seats, capacity, _id } = bus;
    const n_occupied_seats = occupied_seats.filter(seat => seat).length;

    const occupied_percentage = Math.floor((n_occupied_seats / capacity) * 100);
    let bus_color = 'success';
    if (occupied_percentage > 60) bus_color = 'warning';
    if (occupied_percentage > 90) bus_color = 'danger';

    const handleClickBookButton = async (e) => {
        // open prompt and take seat number
        const response = window.prompt("Enter seat number");
        if (!response) return;

        const seat_number = parseInt(response);
        if (!seat_number || occupied_seats[seat_number]) return alert("Invalid input");

        try {
            const response = await bookSeat(customer_id, _id, seat_number, start_node_id, end_node_id);
            alert("Seat booked successfully");
            console.log("🚀 ~ file: AdminDashboard.js:10 ~ handleClickBookButton ~ response:", response)
        } catch (err) {
            console.log(err);
            alert("Something went wrong");
        }
    }

    return (
        <tr key={bus._id}>
            <td>{_id}</td>
            <td>
                {/* make a badge of variant given by bus_color of large size*/}
                <span className={`badge bg-${bus_color} p-2 fs-6`}>{occupied_percentage}%</span>
            </td>
            <td>
                <BusComponent capacity={capacity} occupied_seats={occupied_seats} />
            </td>
            <td>
                <Button variant='dark' onClick={handleClickBookButton}>Book</Button>
            </td>
        </tr>
    )
}

const MyBooking = (booking, customer_token) => {
    const { bus_id, seat_id, start_node_id, end_node_id, status, _id } = booking;

    const handleClickCancelBooking = async (e) => {
        if (!window.confirm("Are you sure you want to cancel this booking ?")) return;

        try {
            const response = await cancelSeat(customer_token, _id);
            alert("Seat cancelled successfully");
            console.log("🚀 ~ file: AdminDashboard.js:10 ~ handleClickBookButton ~ response:", response)
        } catch (err) {
            console.log(err);
            alert("Something went wrong");
        }
    }

    return (
        <tr key={booking._id}>
            <td>{_id}</td>
            <td>{bus_id}</td>
            <td>{start_node_id}</td>
            <td>{end_node_id}</td>
            <td>{seat_id}</td>

            <td>{status === 1 ? 'Paid and Booked' : 'Cancelled'}</td>
            <td>{status === 1 ? <Button variant="danger" onClick={handleClickCancelBooking}>Cancel</Button> : ' '}</td>
        </tr>
    )
}

export default function CustomerDashboard() {
    const [source, setSource] = React.useState('')
    const [destination, setDestination] = React.useState('')
    const [selectedDay, setSelectedDay] = React.useState(null);

    const [availableBuses, setAvailableBuses] = React.useState([])
    const [myBookings, setMyBookings] = React.useState([])

    const customer_token = JSON.parse(localStorage.getItem('customer')).token;

    useEffect(() => {
        const fetchMyBookings = async () => {
            try {
                const response = await getCustomerBookings(customer_token);
                if (response.status === 200) {
                    console.log("🚀 ~ file: CustomerDashboard.js:35 ~ handleClickFindBus ~ response:", response.data)
                    setMyBookings(response.data.bookings);
                }
            } catch (err) {
                console.log(err);
            }
        }

        fetchMyBookings();
    }, [customer_token]);

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
            <Container className='py-5'>
                <h1 className='fs-3 mb-3 text-uppercase'>Find available buses</h1>
                <Card className='px-4 py-4 shadow-lg'>
                    <div className="row align-items-center d-flex justify-content-between">
                        <div className="col-md-4">
                            <input
                                type='text'
                                className='form-control'
                                placeholder='Source'
                                value={source}
                                onChange={(e) => setSource(e.target.value)}
                            />
                        </div>
                        <div className="col-md-4">
                            <input
                                type='text'
                                className='form-control'
                                placeholder='Destination'
                                value={destination}
                                onChange={(e) => setDestination(e.target.value)}
                            />
                        </div>
                        <div className="col-md-4 d-flex justify-content-end">
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
                    </div>
                    <div className="row mt-4">
                        <div className="col-md-12 d-flex justify-content-center">
                            <Button variant='dark' onClick={handleClickFindBus}>Find Buses</Button>
                        </div>
                    </div>

                </Card>

                <br /><br />

                <h1 className='fs-3 mb-3 text-uppercase'>available buses</h1>
                <Card className='px-4 py-4 shadow-lg'>
                    {availableBuses.length > 0 ? (
                        <table className="table text-center">
                            <thead>
                                <tr>
                                    <th>Bus Number</th>
                                    <th>Seats Occupied</th>
                                    <th>Seat Chart</th>
                                    <th>Booking</th>
                                </tr>
                            </thead>
                            <tbody>
                                {availableBuses.map(bus => AvailableBus(bus, source, destination, JSON.parse(localStorage.getItem('customer'))._id))}
                            </tbody>
                        </table>
                    ) : (
                        <span>No buses</span>
                    )}

                </Card>
                {/* Write similarly in for my booking */}
                <br /><br />

                <h1 className='fs-3 mb-3 text-uppercase'>My bookings</h1>
                <Card className='px-4 py-4 shadow-lg'>
                    {myBookings.length > 0 ? (
                        <table className="table text-center">
                            <thead>
                                <tr>
                                    <th>Booking ID</th>
                                    <th>Bus Number</th>
                                    <th>Source</th>
                                    <th>Destination</th>
                                    <th>Seat Number</th>
                                    <th>Status</th>
                                    <th>Cancel</th>
                                </tr>
                            </thead>
                            <tbody>
                                {myBookings.map(booking => MyBooking(booking, customer_token))}
                            </tbody>
                        </table>
                    ) : (
                        <span>No buses</span>
                    )}
                </Card>
            </Container>

        </>
    )
}
