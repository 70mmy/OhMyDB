import {createContext, useEffect, useState} from "react";
import {MOVIE, MOVIES} from "../constants";
import {fetchData} from "../helpers/request";

export const AppContext = createContext({});

export const MovieContextProvider = ({children}) => {
    const [movie, setMovie] = useState({});
    const [movies, setMovies] = useState([]);
    const [title, setTitle] = useState('');
    const [imdbId, setImdbId] = useState('');
    const [errors, setErrors] = useState({});
    const [genericSuccesses, setGenericSuccesses] = useState([]);

    const fetchMovies = async () => {
        const {data: movies} = await fetchData(MOVIES());

        setMovies(movies.data);
    };

    const fetchMovie = async (movieId) => {
        const {data: movie} = await fetchData(MOVIE(movieId));

        console.log(movie.data)
        setMovie(movie.data);
    };

    const resetMovie = async (movieId) => {
        setMovie({});
        setTitle('');
        setImdbId('');
    };

    useEffect(() => {
        fetchMovies();
    }, []);

    return (
        <AppContext.Provider
            value={{
                movies,
                setMovies,
                fetchMovies,
                movie,
                setMovie,
                fetchMovie,
                resetMovie,
                title,
                setTitle,
                imdbId,
                setImdbId,
                errors,
                setErrors,
                genericSuccesses,
                setGenericSuccesses
            }}
        >
            {children}
        </AppContext.Provider>
    );
};
