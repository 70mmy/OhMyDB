import React, {lazy, Suspense, useEffect} from 'react'

import {Routes, Route} from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import {MovieContextProvider} from './context/AppContext';
import {Loading} from './components/Loading';

const Home = lazy(() => import('./pages/Home'))
const Movie = lazy(() => import('./pages/Movie'))

function App() {
    useEffect(() => {
        document.title = 'OhMyDB';
    }, []);

    return (
        <>
            <MovieContextProvider>
                <Suspense fallback={<Loading/>}>
                    <Routes>
                        <Route path='/' element={<Home/>}/>
                        <Route path='/add' element={<Movie/>}/>
                        <Route path='/edit/:id' element={<Movie/>}/>
                    </Routes>
                </Suspense>
            </MovieContextProvider>
        </>
    );
}

export default App;
