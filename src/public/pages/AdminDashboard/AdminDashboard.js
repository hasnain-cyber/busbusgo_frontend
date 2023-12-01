import React from 'react'
import NavbarComponent from '../../../components/NavbarComponent/NavbarComponent'
import { Button, Form } from 'react-bootstrap'
import { addNode, addEdge, addBus } from '../../../handlers/adminHandler'

export default function AdminDashboard() {
    const weekDays = [
        { name: 'Sunday', value: 0b1000000 },
        { name: 'Monday', value: 0b0100000 },
        { name: 'Tuesday', value: 0b0010000 },
        { name: 'Wednesday', value: 0b0001000 },
        { name: 'Thursday', value: 0b0000100 },
        { name: 'Friday', value: 0b0000010 },
        { name: 'Saturday', value: 0b0000001 },
    ];

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
            console.log("🚀 ~ file: AdminDashboard.js:10 ~ handleClickSubmitButton ~ response:", response)
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            <NavbarComponent />
            <div className='d-flex justify-content-end gap-2'>
                <Button onClick={handleClickAddNode}>Add Node</Button>
                <Button onClick={handleClickAddEdge}>Add Edge</Button>
            </div>
            
            {/* add bus section */}
            <div className='d-flex flex-column gap-1'>
                <input type="number" placeholder="Bus Capacity" onChange={(e) => setBusCapacity(e.target.value)} />
                <Form>
                    {weekDays.map((day) => (
                        <Form.Check
                            key={day.name}
                            type="checkbox"
                            id={day.name}
                            label={day.name}
                            value={day.value.toString(2)} // Represent the value in binary string format
                            checked={(selectedDays & day.value) === day.value} // Check if the bit is set
                            onChange={handleDayChange}
                        />
                    ))}
                </Form>
            </div>
            
            <Form.Group controlId="nodeIds">
                <Form.Label>Route</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={5}
                    placeholder="Enter node IDs separated by space"
                    value={nodeIds}
                    onChange={handleTextareaChange}
                />
            </Form.Group>

            <Button variant="primary" onClick={handleClickSubmitButton}>
                Add Bus
            </Button>
        </>
    )
}
