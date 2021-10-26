import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Character } from '../../../core/models/CharacterModel';
import { addFavoriteAction, removerFavoriteAction } from '../../../core/store/characters/characters.slice';
import { selectCharacters } from '../../../core/store/store';
import Swal from 'sweetalert2';

interface Props {
    character: Character;
}

const CharacterCoin = ({ character }: Props) => {
    const dispatch = useDispatch();
    const characters = useSelector(selectCharacters);

    const history = useHistory();

    const addToFavorites = () => {
        dispatch(addFavoriteAction({ character: character }));

        Swal.fire({
            position: 'bottom-start',
            icon: 'success',
            title: 'Heroe agregado correctamente a favoritos',
            showConfirmButton: false,
            timer: 1500,
            width: '25rem' 
        });
    }

    const removeFromFavorites = () => {
        dispatch(removerFavoriteAction({ character: character }));

        Swal.fire({
            position: 'bottom-start',
            icon: 'success',
            title: 'Heroe eliminado correctamente de favoritos',
            showConfirmButton: false,
            timer: 1500,
            width: '25rem' 
        });
    }

    const getInfo = (id: string) => {
        history.push(`/character/${id}`);
    }
    
    return (
        <Card style={{ width: '18rem' }} className="mb-3">
            <Card.Body>
                <Card.Img variant="top" src={`${character.thumbnail.path}.${character.thumbnail.extension}`} />

                <Card.Title>
                    <span style={{fontWeight: 'bold', color: 'blue'}}>{character.name}</span>
                </Card.Title>

                <hr />

                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    {
                        characters.favorites && characters.favorites.indexOf(character) === -1 ?
                        <Button onClick={addToFavorites}>
                            <i title="Agregar a favoritos" className="fas fa-star"></i>
                        </Button>
                        :
                        <Button onClick={removeFromFavorites}>
                            <i title="Eliminar de favoritos" className="far fa-star"></i>
                        </Button>
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