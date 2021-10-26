import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import Swal from 'sweetalert2';
import { Button, Col, Container, Form, Row, Spinner } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { Character } from '../../../core/models/CharacterModel';
import { FormModel } from '../../../core/models/FormModel';
import useFirebaseDatabase from '../../../core/utils/firebase/useFirebaseDatabase';
import { UserContext } from '../../../core/context/UserContext';
import CharactersServices from '../../../core/services/CharactersServices';

interface IFormDTO {
    name: string;
    lastname: string;
}

const CharactersDetails = () => {
    const { id }: { id: string | undefined } = useParams();

    const charactersServices: CharactersServices = useMemo(() => new CharactersServices(), []);
    const { save } = useFirebaseDatabase();
    const { user } = useContext(UserContext);
    
    const [character, setCharacter] = useState<Character | null>(null);
    const [searchWithErrors, setSearchWithErrors] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    let initialValues: IFormDTO = {
        name: '',
        lastname: ''
    }

    const validationSchema = yup.object().shape({
        name: yup.string().required("Requerido"),
        lastname: yup.string().required("Requerido")
    });

    const getInfoCharacter = useCallback(
        async () => {
            setLoading(true);

            try {
                if(id) {
                    const result: any = await charactersServices.getCharacter(id);

                    setCharacter(result.data.data.results[0]);
                    setSearchWithErrors(false);
                    setLoading(false);
                }
            } catch(e) {
                console.log('Error', e);
                setLoading(false);
                setCharacter(null);
                setSearchWithErrors(true);
            }
        },
        [charactersServices, id],
    )

    useEffect(() => {
        getInfoCharacter();
    }, [getInfoCharacter]);

    const handleSubmit = async (data: IFormDTO) => {
        const form: FormModel = {
            name: data.name,
            lastname: data.lastname,
            email: (user?.email) ? user.email : "",
            character_id: Number(id)
        }

        try {
            await save(form);

            Swal.fire({
                position: 'bottom-start',
                icon: 'success',
                title: 'Solicitud creada correctamente',
                showConfirmButton: false,
                timer: 1500,
                width: '25rem'
            });
        } catch(e) {
            console.log('Error', e);

            Swal.fire({
                position: 'bottom-start',
                icon: 'error',
                title: 'Ha ocurrido un error. Intente nuevamente.',
                showConfirmButton: false,
                timer: 1500,
                width: '25rem'
            });
        }
    }

    const getWiki = (character: Character) => {
        return character.urls.findIndex((a:any) => a.type === 'wiki' || a.type === 'details');
    }

    return (
        <Container className="mt-3 mb-3">
            <h1>Detalles del personaje</h1>
            <hr />

            {
                loading &&
                <Row>
                    <Spinner animation="border" role="status" className="m-auto"></Spinner>
                </Row>
            }

            {   !loading && searchWithErrors &&
                <Row>
                    <p>Se ha producido un error en la busqueda. Refresque la pagina para intentar de nuevo.</p>
                </Row>
            }

            {
                !loading && character &&
                <>
                    <Row className="justify-content-center">
                        <Col>
                            <h2>{character.name}</h2>
                        </Col>
                    </Row>

                    <Row className="justify-content-center">
                        <Col>
                            <img 
                                src={`${character.thumbnail.path}.${character.thumbnail.extension}`} 
                                height="300"
                                width="300"
                                alt={character.name} 
                            />
                        </Col>
                    </Row>

                    {
                        character.description &&
                        <Row className="justify-content-center mt-2 mb-2">
                            <Col>
                                <p>{character.description}</p>
                            </Col>
                        </Row>
                    }

                    {
                        getWiki(character) !== -1 &&
                        <Row className="justify-content-center mt-2 mb-2">
                            <Col>
                                <a
                                    href={character.urls[getWiki(character)].url}
                                    target="_blank" 
                                    rel="noreferrer"
                                >
                                    <Button variant="info">Ver mas detalles</Button>
                                </a>
                            </Col>
                        </Row>
                    }

                    <hr />

                    {
                        user?.uid &&
                        <>
                            <Row>
                                <h3>Si desea recibir informacion llene el formulario.</h3>
                            </Row>

                            <Row>
                                <Col></Col>

                                <Col>
                                    <Formik
                                        initialValues={initialValues}
                                        validationSchema={validationSchema}
                                        onSubmit={async (data, { setSubmitting, resetForm }) => {
                                            setSubmitting(true);

                                            await handleSubmit(data);

                                            resetForm();

                                            setSubmitting(false);
                                        }}
                                    >
                                        {
                                            ({
                                                values,
                                                errors,
                                                isSubmitting,
                                                handleChange,
                                                handleBlur,
                                                handleSubmit,
                                                touched
                                            }) => (
                                                <Form
                                                    noValidate
                                                    onSubmit={handleSubmit}
                                                >
                                                    <Form.Group
                                                        controlId="name"
                                                        style={{ position: 'relative'}}
                                                    >
                                                        <Form.Label>Nombre</Form.Label>
                                                        <Form.Control
                                                            size="lg"
                                                            type="text"
                                                            placeholder="Ingrese su nombre"
                                                            defaultValue={values.name || ''}
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            isValid={touched.name && !errors.name}
                                                            isInvalid={!!errors.name}
                                                        />

                                                        <Form.Control.Feedback
                                                            type="invalid"
                                                            tooltip
                                                        >{errors.name}</Form.Control.Feedback>
                                                    </Form.Group>

                                                    <br />

                                                    <Form.Group
                                                        controlId="lastname"
                                                        style={{ position: 'relative'}}
                                                    >
                                                        <Form.Label>Apellido</Form.Label>
                                                        <Form.Control
                                                            size="lg"
                                                            type="text"
                                                            placeholder="Ingrese su apellido"
                                                            defaultValue={values.lastname}
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            isValid={touched.lastname && !errors.lastname}
                                                            isInvalid={!!errors.lastname}
                                                        />

                                                        <Form.Control.Feedback
                                                            type="invalid"
                                                            tooltip
                                                        >{errors.lastname}</Form.Control.Feedback>
                                                    </Form.Group>

                                                    <br />

                                                    <Button
                                                        variant="success"
                                                        disabled={isSubmitting}
                                                        type="submit"
                                                    >
                                                        Crear solicitud
                                                    </Button>
                                                </Form>
                                            )
                                        }
                                    </Formik>
                                </Col>

                                <Col></Col>
                            </Row>
                        </>
                    }
                </>
            }
        </Container>
    );
}

export default CharactersDetails;