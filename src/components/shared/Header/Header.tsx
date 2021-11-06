import React, { useContext } from 'react';
import { getAuth, signInWithPopup } from '@firebase/auth';
import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import { provider } from '../../../core/utils/firebase/firebase';
import { User, UserContext } from '../../../core/context/UserContext';
import Swal from 'sweetalert2';
import useFirebaseDatabase from '../../../core/utils/firebase/useFirebaseDatabase';
import { useDispatch } from 'react-redux';
import { setFavoritesAction } from '../../../core/store/characters/characters.slice';

const Header = () => {
    const dispatch = useDispatch();
    const auth = getAuth();
    const { user, setUser } = useContext(UserContext);

    const { getFavorites } = useFirebaseDatabase();

    const getFavoritesOfUser = async (id: string | undefined) => {
        try {
            const result = await getFavorites(id ? id : "");
            console.log("result", result);
            if(result) {
                dispatch(setFavoritesAction({ favorites: result.favs }));
            }
        } catch(e) {
            console.log(e);
        }
    }

    const cleanFavoritesOfUser = async () => {
        dispatch(setFavoritesAction({ favorites: [] }));
    }

    const login = () => {
        signInWithPopup(auth, provider)
            .then(async result => {
                const user = result.user;

                const userData: User = {
                    uid: user?.uid,
                    email: (user?.email) ? user.email : undefined,
                    name_lastname: (user?.displayName) ? user?.displayName : undefined
                }

                setUser(userData);

                await getFavoritesOfUser(userData.uid);
                
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
        }).then(async result => {
            if (result.isConfirmed) {
                setUser({});

                await cleanFavoritesOfUser();

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
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="/">
                    <img
                        src="marvel-header.png"
                        alt="logo"
                        width="70"
                        height="70"
                        className="logo"
                    />
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        {
                            user?.uid &&
                            <Nav.Link href="/favorites">Favoritos</Nav.Link>
                        }
                    </Nav>

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
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;