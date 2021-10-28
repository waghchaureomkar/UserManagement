import React from 'react'
import { Navbar,Nav, Container } from 'react-bootstrap'

function Header() {
    return (
        <div>
            <Navbar className="header"  variant="dark">
            <Container>
                <Navbar.Brand  href="login">
                    <a href="https://www.linkedin.com/in/waghchaureomkar/" target="_blank"><h2>OMKAR W.</h2></a>
                </Navbar.Brand>
                <div>
                    <Nav className="me-auto">
                    <h4>User Management</h4>
                    </Nav>
                </div>
            </Container>
        </Navbar>
        </div>
    )
}

export default Header

// <Nav.Link href="/login">Login</Nav.Link>
// <Nav.Link href="/usermanagement">User Management</Nav.Link>
