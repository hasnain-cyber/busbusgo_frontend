import React from 'react'
import NavbarComponent from '../../../components/NavbarComponent/NavbarComponent'
import { Button, Container, Card } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginAdmin } from '../../../handlers/adminHandler';
import { loginAdmin as loginAdminAction } from '../../../redux/slices/adminSlice';

export default function AdminLogin() {
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')

    const router = useNavigate();
    const dispatch = useDispatch();

    const handleSubmitButton = async (e) => {
        console.log(process.env.REACT_APP_BACKEND_URL)
        if (email.length === 0 || password.length === 0) {
            alert('All fields are required !')
            return;
        }

        try {
            const response = await loginAdmin(email, password);
            console.log("🚀 ~ file: AdminLogin.js:24 ~ handleSubmitButton ~ response:", response.status)
            if (response.status === 200) {
                dispatch(loginAdminAction({
                    token: response.data.token
                }));
                router('/adminDashboard');
            }
            console.log("🚀 ~ file: AdminLogin.js:19 ~ handleSubmitButton ~ response:", response)

        } catch (error) {
            console.log(error);
            alert('Something went wrong !');
        }
    }

    return (
        <>
            <NavbarComponent />
            {/* Write the following div in a container of 100vh with a react-bootstrap card between to login */}
            {/* <div className='d-flex flex-column gap-2'>
                <input type='text' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                <Button onClick={handleSubmitButton}>Login</Button>
            </div> */}
            <Container className='d-flex justify-content-center align-items-center' style={{ height: '100vh' }}>
                <Card className='px-4 h-50 w-25 d-flex justify-content-center gap-4 shadow-lg'>
                    <h1 className='text-center text-primary mb-5'>Admin Login</h1>
                    <input type='text' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                    <input type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                    <Button onClick={handleSubmitButton}>Login</Button>
                </Card>
            </Container>
        </>
    )
}
