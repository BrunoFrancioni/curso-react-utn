import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Col, Container, Row, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Coin } from '../../../core/models/CoinModel';
import CoinloreServices from '../../../core/services/CoinloreServices';
import { changeActualPageAction, changeTotalResultsAction } from '../../../core/store/coins/coins.slice';
import { selectCoins } from '../../../core/store/store';
import CardCoin from '../../shared/CardCoin/CardCoin';
import Paginator from '../../shared/Paginator/Paginator';

const MainContent = () => {
    const coinloreServices: CoinloreServices = useMemo(() => new CoinloreServices(), []);
    const dispatch = useDispatch();
    
    const coins = useSelector(selectCoins);

    const [tickers, setTickers] = useState<Coin[]>([]);
    const [searchWithErrors, setSearchWithErrors] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const getTickers = useCallback(
        async () => {
            setLoading(true);

            try {
                const result: any = await coinloreServices.getTickers(coins.actualPage, 10);
                console.log(result);
                dispatch(changeTotalResultsAction({ totalResults: result.data.info.coins_num }));
                setTickers(result.data.data);
                setSearchWithErrors(false);
                setLoading(false);
            } catch(e) {
                console.log('Error', e);
                setLoading(false);
                setTickers([]);
                setSearchWithErrors(true);
            }
        }, 
        [coins.actualPage, coinloreServices, dispatch]
    );

    useEffect(() => {
        (async () => {
            await getTickers();
        })();
    }, [getTickers]);

    const changePage = (page: number) => {
        setLoading(true);
        setTickers([]);
        dispatch(changeActualPageAction({ actualPage: page }));
    }

    return (
        <Container className="mt-3">
            <h1>Inicio</h1>
            <hr />
            
            {
                loading &&
                <Row>
                    <Spinner animation="border" role="status" className="m-auto"></Spinner>
                </Row>
            }

            {
                !loading && !searchWithErrors && tickers.length !== 0 &&
                <>
                    <Row>
                        {
                            tickers && tickers.length !== 0 &&
                            tickers.map((ticker: Coin) => {
                                return (
                                    <Col key={ticker.id} xs="1" sm="2" md="4" lg="4">
                                        <CardCoin coin={ticker} />
                                    </Col>
                                )
                            })
                        }
                    </Row>

                    <Row>
                        <Paginator
                            active={coins.actualPage}
                            totalResults={coins.totalResults}
                            sizePage={10}
                            changePage={(changePage.bind(this))}
                        />
                    </Row>
                </>
            }

            {
                !loading && !searchWithErrors && tickers.length === 0 &&
                <p>No se han encontrado resultados.</p>
            }

            {
                !loading && searchWithErrors &&
                <p>Se ha producido un error en la busqueda. Refresque la pagina para intentar de nuevo.</p>
            }
        </Container>
    )
}

export default MainContent;