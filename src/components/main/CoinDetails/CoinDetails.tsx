import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Col, Container, Row, Spinner } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { Coin } from '../../../core/models/CoinModel';
import CoinloreServices from '../../../core/services/CoinloreServices';

const CoinDetails = () => {
    const { id }: { id: string | undefined } = useParams();
    const coinloreServices: CoinloreServices = useMemo(() => new CoinloreServices(), []);
    
    const [ticker, setTicker] = useState<Coin | null>(null);
    const [searchWithErrors, setSearchWithErrors] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const getInfoCoin = useCallback(
        async () => {
            setLoading(true);

            try {
                if(id) {
                    const result: any = await coinloreServices.getTicker(id);

                    setTicker(result.data[0]);
                    setSearchWithErrors(false);
                    setLoading(false);
                }
            } catch(e) {
                console.log('Error', e);
                setLoading(false);
                setTicker(null);
                setSearchWithErrors(true);
            }
        },
        [coinloreServices, id],
    )

    useEffect(() => {
        getInfoCoin();
    }, [getInfoCoin]);

    return (
        <Container className="mt-3">
            <h1>Detalles de la moneda</h1>
            <hr />

            {
                loading &&
                <Row>
                    <Spinner animation="border" role="status" className="m-auto"></Spinner>
                </Row>
            }

            {
                !loading && ticker &&
                <Row>
                    <Col>
                        <p><b>Nombre: </b></p>
                        <p>{ticker.name}</p>
                    </Col>

                    <Col>
                        <p><b>Simbolo: </b></p>
                        <p>{ticker.symbol}</p>
                    </Col>

                    <Col>
                        <p><b>Ranking: </b></p>
                        <p>{ticker.rank}</p>
                    </Col>

                    <Col>
                        <p><b>Precio: </b></p>
                        <p>{ticker.price_usd}</p>
                    </Col>
                </Row>
            }
        </Container>
    );
}

export default CoinDetails;