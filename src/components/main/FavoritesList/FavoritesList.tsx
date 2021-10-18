import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Coin } from '../../../core/models/CoinModel';
import { selectCoins } from '../../../core/store/store';
import CardCoin from '../../shared/CardCoin/CardCoin';

const FavoritesList = () => {
    const coins = useSelector(selectCoins);

    return (
        <Container className="mt-3">
            <h1>Lista de favoritos</h1>
            <hr />

            <Row>
                {
                    coins.favorites && coins.favorites.length !== 0 ?
                    (
                        coins.favorites.map((ticker: Coin) => {
                            return (
                                <Col key={ticker.id} xs="1" sm="2" md="4" lg="4">
                                    <CardCoin coin={ticker} />
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