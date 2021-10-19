import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
const Header = () => {
    return (
        <Navbar collapseOnSelect expand="sm" bg="dark" variant="dark">
            <Container>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav>
                        <Nav.Link href="/">
                            <img src="btc.png" width="70" height="70" alt="Logo" />
                        </Nav.Link>
                        <Nav.Link href="/favorites" className="mt-4">Favoritos</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;