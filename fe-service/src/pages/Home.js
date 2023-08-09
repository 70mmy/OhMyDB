import React, {useContext} from 'react'
import {Col, Container, Row, Alert} from 'react-bootstrap'
import {MovieCard} from '../components/MovieCard'
import Header from '../components/Header'
import {AppContext} from '../context/AppContext'

export default function Home() {
    const {movies, genericSuccesses, setGenericSuccesses} = useContext(AppContext)

    setTimeout(() => {
        setGenericSuccesses([]);
    }, 10000);


    return (
        <>
            <Header/>
            <Container className='mt-4'>
                {genericSuccesses?.map((item, key) =>
                    <Alert key={`success-${key}`} variant={'success'}>
                        {item}
                    </Alert>
                )}
                <Row md={3} xs={1} lg={4} className="g-4">
                    {movies?.map((item) =>
                        <Col key={item.id}>
                            <MovieCard movie={item}/>
                        </Col>
                    )}
                </Row>
            </Container>
        </>
    )
}
