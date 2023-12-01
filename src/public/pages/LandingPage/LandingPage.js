import React from 'react'
import NavbarComponent from '../../../components/NavbarComponent/NavbarComponent'
import { Container } from 'react-bootstrap'

export default function LandingPage() {
    return (
        <>
            <NavbarComponent />
            {/* main body with only busbusgo header image in the center of the screen with size 100 vh */}
            <Container className='d-flex justify-content-center align-items-center' style={{ height: '100vh' }}>
                <img src='/header.png' alt='busbusgo logo' />
            </Container>

        </>
    )
}
