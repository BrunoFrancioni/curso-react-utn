import React, { useContext } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../../../core/context/UserContext';
import { Character } from '../../../core/models/CharacterModel';
import { selectCharacters } from '../../../core/store/store';
import CardCoin from '../../shared/CharacterCard/CharacterCard';

const FavoritesList = () => {
    const characters = useSelector(selectCharacters);
    const { user } = useContext(UserContext);

    const history = useHistory();

    if(!user || !user.uid) {
        history.push("/");
    }

    return (
        <Container className="mt-3 mb-3">
            <h1>Lista de favoritos</h1>
            <hr />

            <Row className="justify-content-center">
                {
                    characters.favorites && characters.favorites.length !== 0 ?
                    (
                        characters.favorites.map((character: Character) => {
                            return (
                                <Col key={character.id} xs="12" sm="7" md="5" lg="3">
                                    <CardCoin character={character} />
                                </Col>
                            )
                        })
                    ) : (
                        <p>No se han encontrado favoritos</p>
                    )
                }
            </Row>
        </Container>
    );
}

export default FavoritesList;