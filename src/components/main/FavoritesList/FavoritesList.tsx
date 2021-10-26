import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Character } from '../../../core/models/CharacterModel';
import { selectCharacters } from '../../../core/store/store';
import CardCoin from '../../shared/CharacterCard/CharacterCard';

const FavoritesList = () => {
    const coins = useSelector(selectCharacters);

    return (
        <Container className="mt-3">
            <h1>Lista de favoritos</h1>
            <hr />

            <Row>
                {
                    coins.favorites && coins.favorites.length !== 0 ?
                    (
                        coins.favorites.map((character: Character) => {
                            return (
                                <Col key={character.id} xs="1" sm="2" md="4" lg="4">
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