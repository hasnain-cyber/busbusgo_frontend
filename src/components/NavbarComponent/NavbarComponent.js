import React from 'react'
import { Link } from 'react-router-dom'
import { Nav, Navbar, Container, Button } from 'react-bootstrap'

export default function NavbarComponent() {
    return (
        <Navbar className="bg-dark px-4 py-2">
            <Container>
                <Navbar.Brand as={Link} to={'/'}>
                    <img
                        src="/logo.png"
                        height="30"
                        className="d-inline-block align-top"
                        alt="React Bootstrap logo"
                    />
                </Navbar.Brand>
            </Container>
            <Container className="justify-content-end">
                <Button variant='info' className='ms-2'>
                    <Nav.Link as={Link} to={'/customerLogin'} className="text-light">Customer Login</Nav.Link>
                </Button>
                <Button variant='info' className='ms-2'>
                    <Nav.Link as={Link} to={'/adminLogin'} className="text-light">Admin Login</Nav.Link>
                </Button>
            </Container>
        </Navbar>
    )
}
