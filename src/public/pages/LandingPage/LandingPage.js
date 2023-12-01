import React from 'react'
import NavbarComponent from '../../../components/NavbarComponent/NavbarComponent'
import { Container } from 'react-bootstrap'
import bgImage from './background.jpg'

export default function LandingPage() {
    return (
        <>
            <NavbarComponent />
            {/* set background.jpg in background */}
            <div style={{ backgroundImage: `url(${bgImage})`, backgroundSize: 'cover' }}>
            <Container className='d-flex justify-content-center align-items-center flex-column' style={{ height: '100vh' }}>
                {/* color burn to make image black */}
                <img src='/header.png' alt='busbusgo logo' style={{ filter: 'brightness(0) invert(1)'}} className='shadow-sm'/>
                <p className='text-center text-light lead' style={{ fontSize: '2rem' }}>MoveInSync</p>
                
                </Container>
            </div>
            

        </>
    )
}
