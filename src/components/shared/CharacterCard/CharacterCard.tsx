import React, { useContext } from 'react';
import { Card, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Character } from '../../../core/models/CharacterModel';
import { setFavoritesAction } from '../../../core/store/characters/characters.slice';
import { selectCharacters } from '../../../core/store/store';
import Swal from 'sweetalert2';
import { UserContext } from '../../../core/context/UserContext';
import useFirebaseDatabase from '../../../core/utils/firebase/useFirebaseDatabase';
import { FavoriteModel } from '../../../core/models/FavoriteModal';

interface Props {
    character: Character;
}

const CharacterCoin = ({ character }: Props) => {
    const dispatch = useDispatch();

    const { saveFavorites } = useFirebaseDatabase();

    const { user } = useContext(UserContext);
    const characters = useSelector(selectCharacters);

    const history = useHistory();

    const addToFavorites = async () => {
        const newFavorites: FavoriteModel = {
            characters: [...characters.favorites, character]
        }

        try {
            await saveFavorites(user?.uid ? user.uid : "", newFavorites);
            console.log("New Favorites", newFavorites.characters);
            dispatch(setFavoritesAction({ favorites: newFavorites.characters }));

            Swal.fire({
                position: 'bottom-start',
                icon: 'success',
                title: 'Heroe agregado correctamente a favoritos',
                showConfirmButton: false,
                timer: 1500,
                width: '25rem' 
            });
        } catch(e) {
            console.log(e);

            Swal.fire({
                position: 'bottom-start',
                icon: 'error',
                title: 'Ha ocurrido un error.',
                text: 'Intente nuevamente',
                showConfirmButton: false,
                timer: 1500,
                width: '25rem' 
            });
        }
    }

    const removeFromFavorites = async () => {
        const newFavorites: FavoriteModel = {
            characters: characters.favorites.filter((c: Character) => c.id !== character.id)
        }

        try {
            await saveFavorites(user?.uid ? user.uid : "", newFavorites);
            console.log("New Favorites", newFavorites.characters);
            dispatch(setFavoritesAction({ favorites: newFavorites.characters }));

            Swal.fire({
                position: 'bottom-start',
                icon: 'success',
                title: 'Heroe eliminado correctamente de favoritos',
                showConfirmButton: false,
                timer: 1500,
                width: '25rem' 
            });
        } catch(e) {
            console.log(e);

            Swal.fire({
                position: 'bottom-start',
                icon: 'error',
                title: 'Ha ocurrido un error.',
                text: 'Intente nuevamente',
                showConfirmButton: false,
                timer: 1500,
                width: '25rem' 
            });
        }
    }

    const getInfo = (id: string) => {
        history.push(`/character/${id}`);
    }

    const findInFavorites = () => {
        const result = characters.favorites.filter((f: Character) => f.id === character.id);
        
        return (result.length !== 0) ? true : false;
    }
    
    return (
        <Card style={{ width: '18rem' }} className="mb-3">
            <Card.Body>
                <Card.Img variant="top" src={`${character.thumbnail.path}.${character.thumbnail.extension}`} />

                <Card.Title>
                    <span style={{ fontWeight: 'bold', color: 'blue' }}>{character.name}</span>
                </Card.Title>

                <hr />

                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    {
                        user?.uid &&
                        <>
                            {
                                !findInFavorites() ?
                                <Button onClick={addToFavorites}>
                                    <i title="Agregar a favoritos" className="fas fa-star"></i>
                                </Button>
                                :
                                <Button onClick={removeFromFavorites}>
                                    <i title="Eliminar de favoritos" className="far fa-star"></i>
                                </Button>
                            }
                        </>
                    }
                    
                    <Button
                        variant="success"
                        onClick={() => getInfo(String(character.id))}
                    >
                        Ver
                    </Button>
                </div>
            </Card.Body>
        </Card>
    )
}

export default CharacterCoin;