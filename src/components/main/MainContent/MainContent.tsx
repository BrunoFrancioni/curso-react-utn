import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Col, Container, Row, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Character } from '../../../core/models/CharacterModel';
import CharactersServices from '../../../core/services/CharactersServices';
import { changeActualPageAction, changeTotalResultsAction, setCharactersAction } from '../../../core/store/characters/characters.slice';
import { selectCharacters } from '../../../core/store/store';
import CharacterCoin from '../../shared/CharacterCard/CharacterCard';
import Paginator from '../../shared/Paginator/Paginator';

const MainContent = () => {
    const charactersServices: CharactersServices = useMemo(() => new CharactersServices(), []);
    const dispatch = useDispatch();
    
    const characters = useSelector(selectCharacters);

    const [searchWithErrors, setSearchWithErrors] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const getCharacters = useCallback(
        async () => {
            setLoading(true);

            try {
                const result: any = await charactersServices.getCharacters(characters.actualPage, 10);
                console.log(result);
                dispatch(changeTotalResultsAction({ totalResults: result.data.data.total }));
                dispatch(setCharactersAction({ characters: result.data.data.results }));
                setSearchWithErrors(false);
                setLoading(false);
            } catch(e) {
                console.log('Error', e);
                setLoading(false);
                dispatch(setCharactersAction({ characters: [] }));
                setSearchWithErrors(true);
            }
        }, 
        [charactersServices, characters.actualPage, dispatch]
    );

    useEffect(() => {
        (async () => {
            await getCharacters();
        })();
    }, [getCharacters]);

    const changePage = (page: number) => {
        setLoading(true);
        setSearchWithErrors(false);
        dispatch(setCharactersAction({ characters: [] }));
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
                !loading && !searchWithErrors && characters.characters.length !== 0 &&
                <>
                    <Row>
                        {
                            characters.characters.length !== 0 &&
                            characters.characters.map((character: Character) => {
                                return (
                                    <Col key={character.id} xs="1" sm="2" md="4" lg="4">
                                        <CharacterCoin character={character} />
                                    </Col>
                                )
                            })
                        }
                    </Row>

                    <Row>
                        <Paginator
                            active={characters.actualPage}
                            totalResults={characters.totalResults}
                            sizePage={10}
                            changePage={(changePage.bind(this))}
                        />
                    </Row>
                </>
            }

            {
                !loading && !searchWithErrors && characters.characters.length === 0 &&
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