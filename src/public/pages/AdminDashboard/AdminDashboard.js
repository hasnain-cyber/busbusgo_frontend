import React from 'react'
import NavbarComponent from '../../../components/NavbarComponent/NavbarComponent'
import { Button, Form, Card, Container } from 'react-bootstrap'
import { addNode, addEdge, addBus } from '../../../handlers/adminHandler'
import { weekDays } from '../../../utils'

export default function AdminDashboard() {
    const [busCapacity, setBusCapacity] = React.useState(0);
    const [selectedDays, setSelectedDays] = React.useState(0);
    const [nodeIds, setNodeIds] = React.useState([]);

    const handleClickAddNode = async () => {
        try {
            const response = await addNode();
            console.log("🚀 ~ file: AdminDashboard.js:10 ~ handleClickAddNode ~ response:", response)
        } catch (err) {
            console.log(err);
        }
    }

    const handleClickAddEdge = async () => {
        // open prompt and take node_a_id, node_b_id, weight separated by weight
        const response = window.prompt("Enter node_a_id, node_b_id, weight separated by space");
        if (!response) return;

        const [node_a_id, node_b_id, weight] = response.split(" ");

        if (!node_a_id || !node_b_id || !weight) return alert("Invalid input");

        try {
            const response = await addEdge(node_a_id, node_b_id, weight);
            console.log("🚀 ~ file: AdminDashboard.js:10 ~ handleClickAddEdge ~ response:", response)
        } catch (err) {
            console.log(err);
        }
    }

    const handleDayChange = (e) => {
        const dayValue = parseInt(e.target.value, 2); // Convert the binary value to integer
        const updatedDays = selectedDays ^ dayValue; // Toggle the bit using XOR (^) operation

        setSelectedDays(updatedDays);
    };
    
    const handleTextareaChange = (e) => {
        setNodeIds(e.target.value);
    };

    const handleClickSubmitButton = async () => {
        if (busCapacity === 0 || selectedDays === 0 || nodeIds.length === 0) return alert("Invalid input");

        try {
            const response = await addBus(busCapacity, selectedDays, nodeIds);
            alert("Bus added successfully");
            console.log("🚀 ~ file: AdminDashboard.js:10 ~ handleClickSubmitButton ~ response:", response)
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            <NavbarComponent />
            <div className='d-flex justify-content-end gap-2 p-5'>
                <Button variant='dark' onClick={handleClickAddNode}>Add Node</Button>
                <Button variant='dark' onClick={handleClickAddEdge}>Add Edge</Button>
            </div>
            
            <Container className='mt-2'>

                <h1 className='fs-3 mb-3 text-uppercase'>Add new bus</h1>
                <Card className='p-4 shadow-lg gap-4'>
                    <Form.Group controlId="busCapacity">
                        <Form.Label>Bus Capacity</Form.Label>
                        <input
                            type="number"
                            className='form-control'
                            placeholder="Enter Bus Capacity"
                            onChange={(e) => setBusCapacity(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId="selectedDays">
                        <Form.Label>Weekdays</Form.Label>
                        <div className="d-flex gap-4">
                            {weekDays.map((day) => (
                                <div key={day.name} className="mr-3">
                                    <Form.Check
                                        type="checkbox"
                                        id={day.name}
                                        label={day.name}
                                        value={day.value.toString(2)} // Represent the value in binary string format
                                        checked={(selectedDays & day.value) === day.value} // Check if the bit is set
                                        onChange={handleDayChange}
                                    />
                                </div>
                            ))}
                        </div>
                    </Form.Group>

                    <Form.Group controlId="nodeIds">
                        <Form.Label>Route (Node IDs)</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={5}
                            className='form-control'
                            placeholder="Enter node IDs separated by space"
                            value={nodeIds}
                            onChange={handleTextareaChange}
                        />
                    </Form.Group>

                    <div className='d-flex justify-content-center'>
                        <Button variant="dark" onClick={handleClickSubmitButton}>
                            Add Bus
                        </Button>
                    </div>
                </Card>

            </Container>
        </>
    )
}
