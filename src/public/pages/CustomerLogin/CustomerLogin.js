import React from 'react'
import NavbarComponent from '../../../components/NavbarComponent/NavbarComponent'
import { Button, Container, Card } from 'react-bootstrap'
import { loginCustomer } from '../../../handlers/customerHandler'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginCustomer as loginCustomerAction } from '../../../redux/slices/customerSlice';

export default function CustomerLogin() {
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
            const response = await loginCustomer(email, password);
            if (response.status === 200) {
                dispatch(loginCustomerAction(response.data));
                router('/customerDashboard');
            }
        } catch (error) {
            console.log(error);
            alert('Something went wrong !');
        }
    }

    return (
        <>
            <NavbarComponent />
            <Container className='d-flex justify-content-center align-items-center' style={{ height: '100vh' }}>
                <Card className='px-4 h-50 w-30 d-flex justify-content-center gap-4 shadow-lg'>
                    <h1 className='text-center text-primary mb-5'>Customer Login</h1>
                    <input type='text' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                    <input type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                    <Button onClick={handleSubmitButton}>Login</Button>
                </Card>
            </Container>
        </>
    )
}
