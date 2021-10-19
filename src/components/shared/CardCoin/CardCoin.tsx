import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Coin } from '../../../core/models/CoinModel';
import { addFavoriteAction, removerFavoriteAction } from '../../../core/store/coins/coins.slice';
import { selectCoins } from '../../../core/store/store';

interface Props {
    coin: Coin;
}

const CardCoin = ({ coin }: Props) => {
    const dispatch = useDispatch();
    const coins = useSelector(selectCoins);

    const history = useHistory();

    const addToFavorites = () => {
        dispatch(addFavoriteAction({ coin: coin }));
    }

    const removeFromFavorites = () => {
        dispatch(removerFavoriteAction({ coin: coin }));
    }

    const getInfo = (id: string) => {
        history.push(`/coin/${id}`);
    }
    
    return (
        <Card style={{ width: '18rem' }} className="mb-3">
            <Card.Body>
                <Card.Title><span style={{fontWeight: 'bold', color: 'blue'}}>{coin.name}</span></Card.Title>
                <hr />
                <Card.Text>
                    <span><b>Ticker:</b> {coin.symbol}</span>
                    <br />
                    <span><b>Precio:</b> ${coin.price_usd}</span>
                </Card.Text>

                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    {
                        coins.favorites && coins.favorites.indexOf(coin) === -1 ?
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
                        onClick={() => getInfo(coin.id)}
                    >
                        Ver
                    </Button>
                </div>
            </Card.Body>
        </Card>
    )
}

export default CardCoin;