import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Coin } from '../../../core/models/CoinModel';
import { addFavoriteAction, removerFavoriteAction } from '../../../core/store/coins/coins.slice';
import { selectCoins } from '../../../core/store/store';
import Swal from 'sweetalert2';

interface Props {
    coin: Coin;
}

const CardCoin = ({ coin }: Props) => {
    const dispatch = useDispatch();
    const coins = useSelector(selectCoins);

    const history = useHistory();

    const addToFavorites = () => {
        dispatch(addFavoriteAction({ coin: coin }));

        Swal.fire({
            position: 'bottom-start',
            icon: 'success',
            title: 'Moneda agregada correctamente a favoritos',
            showConfirmButton: false,
            timer: 1500,
            width: '25rem' 
        });
    }

    const removeFromFavorites = () => {
        dispatch(removerFavoriteAction({ coin: coin }));

        Swal.fire({
            position: 'bottom-start',
            icon: 'success',
            title: 'Moneda eliminada correctamente de favoritos',
            showConfirmButton: false,
            timer: 1500,
            width: '25rem' 
        });
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