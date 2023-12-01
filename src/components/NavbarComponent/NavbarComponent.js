import React from 'react'
import { Link } from 'react-router-dom'

export default function NavbarComponent() {
    return (
        <div className='d-flex justify-content-between'>
            <span>BUSBUSGO</span>
            <div className='d-flex gap-3'>
                <Link to={'/customerLogin'}>Customer Login</Link>
                <Link to={'/adminLogin'}>Admin Login</Link>
            </div>
        </div>
    )
}
