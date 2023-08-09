import React, {useContext, useEffect} from 'react'
import {useNavigate, useParams} from "react-router-dom";
import {Container, Row, Col, Button, Form, Card, Alert} from 'react-bootstrap';
import Header from '../components/Header'
import {postData, putData, deleteData} from "../helpers/request";
import {MOVIE, MOVIES} from "../constants";
import {AppContext} from "../context/AppContext";
import {useLazyQuery} from '@apollo/client';
import SEARCH_MOVIES from '../queries/searchMovies'

export default function Movie() {
    const {
        errors,
        setErrors,
        title,
        setTitle,
        imdbId,
        setImdbId,
        movie,
        resetMovie,
        fetchMovie,
        fetchMovies,
        setGenericSuccesses
    } = useContext(AppContext)
    const navigate = useNavigate();
    const params = useParams()
    const {id: movieId} = params

    const [searchMovies, {data}] = useLazyQuery(SEARCH_MOVIES);

    useEffect(() => {
        if (movieId !== undefined && movie?.id === undefined) {
            console.log(movie)
            fetchMovie(movieId)
        } else if (Object.keys(movie).length && movieId === undefined) {
            resetMovie()
        }
    }, [movie, movieId, fetchMovie, resetMovie]);

    useEffect(() => {
        if (movie !== {}) {
            setTitle(movie?.title ?? '')
            setImdbId(movie?.imdb_id ?? '')
        }
    }, [movie, setTitle, setImdbId]);

    const submit = () => {
        let body = {title: title, imdb_id: imdbId};

        return movieId ? putData(MOVIE(movieId), body) : postData(MOVIES(), body);
    }

    const onSubmit = (event) => {
        event.preventDefault();

        submit()
            .then((response) => {
                fetchMovies();

                setErrors({});

                setGenericSuccesses([
                    response.data.message,
                    'Refresh the page to view enriched data'
                ]);

                navigate('/');
            })
            .catch((response) => {
                setErrors(response?.response?.data?.messages);
            });
    }

    return (
        <>
            <Header/>
            <Container className='mt-3'>
                <Card>
                    <Card.Body>
                        <Row lg={12} className="g-12">
                            <Form onSubmit={onSubmit}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Title</Form.Label>
                                    <Row lg={12}>
                                        <Col lg={10}>
                                            <Form.Control value={title} type="text" placeholder="Enter title"
                                                          onChange={(event) => {
                                                              setTitle(event.target.value)
                                                          }}/>
                                        </Col>
                                        <Col lg={2}>
                                            <Button variant="secondary" type="button" onClick={() => {
                                                searchMovies({variables: {query: title}})
                                            }}>
                                                Search
                                            </Button>
                                        </Col>
                                    </Row>
                                    <Form.Text className="text-muted">
                                        This field is required
                                    </Form.Text>
                                </Form.Group>
                                {errors?.title &&
                                    <Alert key={'danger-title'} variant={'danger'}>
                                        {errors?.title}
                                    </Alert>
                                }
                                {data?.searchMovies.map((movie, key) => {
                                    return <div key={`movie-${movie.imdb_id}`}>
                                        <Form.Check
                                            name="movie"
                                            type={'radio'}
                                            id={`default-radio-${key}`}
                                            label={`[${movie.year}] ${movie.title}`}
                                            onChange={() => {
                                                setImdbId(movie.imdb_id);
                                            }}
                                        />
                                    </div>
                                })}
                                <Form.Group className="mb-3">
                                    <Form.Label>IMDB ID</Form.Label>
                                    <Form.Control value={imdbId} type="text" placeholder="Enter IMDB ID"
                                                  onChange={(event) => {
                                                      setImdbId(event.target.value)
                                                  }}/>
                                    <Form.Text className="text-muted">
                                        This field is unique but not required
                                    </Form.Text>
                                </Form.Group>
                                {errors?.imdb_id &&
                                    <Alert key={'danger-imdb-id'} variant={'danger'}>
                                        {errors?.imdb_id}
                                    </Alert>
                                }
                                <Button className={'me-1'} variant="primary" type="submit">
                                    Save
                                </Button>
                                {movieId !== undefined &&
                                    <Button variant="danger" type="button" onClick={() => {
                                        deleteData(MOVIE(movieId)).then(() => {
                                            fetchMovies();

                                            navigate('/')
                                        })
                                    }}>
                                        Delete
                                    </Button>
                                }
                            </Form>
                        </Row>
                    </Card.Body>
                </Card>
            </Container>
        </>
    )
}
