import React from 'react'
import NavbarComponent from '../../../components/NavbarComponent/NavbarComponent'
import { Button } from 'react-bootstrap'
import { registerCustomer } from '../../../handlers/customerHandler'

export default function CustomerRegister() {
    const [name, setName] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')

    const handleSubmitButton = async (e) => {
        if (name.length === 0 || email.length === 0 || password.length === 0) {
            alert('All fields are required !')
            return;
        }

        try {
            const response = await registerCustomer(name, email, password);
            console.log("🚀 ~ file: CustomerRegister.js:19 ~ handleSubmitButton ~ response:", response)
        } catch (error) {
            console.log(error);
            alert('Something went wrong !');
        }
    }

    return (
        <>
            <NavbarComponent />
            <div className='d-flex flex-column gap-2'>
                <input type='text' placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} />
                <input type='text' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                <Button onClick={handleSubmitButton}>Register</Button>
            </div>
        </>
    )
}
