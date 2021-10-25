import React, { useContext } from 'react';
import { getAuth, signInWithPopup } from '@firebase/auth';
import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import { provider } from '../../../core/utils/firebase/firebase';
import { User, UserContext } from '../../../core/context/UserContext';
import Swal from 'sweetalert2';

const Header = () => {
    const auth = getAuth();
    const { user, setUser } = useContext(UserContext);

    const login = () => {
        signInWithPopup(auth, provider)
            .then(result => {
                const user = result.user;

                const userData: User = {
                    uid: user?.uid,
                    email: (user?.email) ? user.email : undefined,
                    name_lastname: (user?.displayName) ? user?.displayName : undefined
                }

                setUser(userData);
                
                Swal.fire({
                    title: 'Sesion iniciada correctamente !',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1500,
                });
            })
            .catch(error => {
                console.log(error);

                Swal.fire({
                    title: 'Ha ocurrido un error !',
                    text: 'Intente nuevamente',
                    icon: 'error',
                    showConfirmButton: false,
                    timer: 1500,
                });
            });
    }

    const logout = () => {
        Swal.fire({
            icon: 'warning',
            title: '¿Seguro desea cerrar la sesión?',
            showCancelButton: true,
            confirmButtonText: `Cerrar`,
        }).then(result => {
            if (result.isConfirmed) {
                setUser({});

                Swal.fire({
                    title: 'Sesion cerrada correctamente !',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1500,
                });
            }
        });
    }

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
                        
                        {
                            !user?.uid ?
                            (
                                <Button 
                                    variant="success"
                                    onClick={() => login()}
                                >Login</Button>
                            ) :
                            (
                                <Button 
                                    variant="light"
                                    onClick={() => logout()}
                                >Cerrar sesion</Button>
                            )
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;