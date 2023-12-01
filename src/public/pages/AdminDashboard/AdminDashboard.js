import React from 'react'
import NavbarComponent from '../../../components/NavbarComponent/NavbarComponent'
import { Button } from 'react-bootstrap'
import { addNode } from '../../../handlers/adminHandler'

export default function AdminDashboard() {
    const handleClickAddNode = async () => {
        try {
            const response = await addNode();
            console.log("🚀 ~ file: AdminDashboard.js:10 ~ handleClickAddNode ~ response:", response)
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            <NavbarComponent />
            <div className='d-flex justify-content-end gap-2'>
                <Button onClick={handleClickAddNode}>Add Node</Button>
            </div>
        </>
  )
}
