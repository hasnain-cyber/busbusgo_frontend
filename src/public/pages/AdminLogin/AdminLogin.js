import React from 'react'
import NavbarComponent from '../../../components/NavbarComponent/NavbarComponent'
import { Button } from 'react-bootstrap'
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
            <div className='d-flex flex-column gap-2'>
                <input type='text' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                <Button onClick={handleSubmitButton}>Login</Button>
            </div>
        </>
    )
}
