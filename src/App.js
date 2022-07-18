import { useState, useEffect } from "react";
import './App.css';
import SerachIcon from './search.svg';
import MovieCard from "./MovieCard";

const API_URL = 'http://www.omdbapi.com?apikey=4b90a069';

// const movie1 = {
//     "Title": "Amazing Spiderman Syndrome",
//     "Year": "2012",
//     "imdbID": "tt2586634",
//     "Type": "movie",
//     "Poster": "N/A"
// }

const App = () => {

    const [movies, setMovies] = useState([]);
    const [searchTerm,setSerachTerm] = useState('');

    const searchMovies = async (title) => {
        const respone = await fetch(`${API_URL}&s=${title}`);
        const data = await respone.json();

        setMovies(data.Search)
    }

    useEffect(() => {
        searchMovies('spiderman');
    }, [])

    return (
        <div className="app">
            <h1>Movie Land</h1>

            <div className="search">
                <input
                    placeholder="Search for movies"
                    value={searchTerm}
                    onChange={(e) => setSerachTerm(e.target.value)}
                />

                <img
                    src={SerachIcon}
                    alt="serach"
                    onClick={() =>searchMovies(searchTerm)}
                />
            </div>

            {movies?.length > 0
                ? (
                    <div className="container">
                        {movies.map((movie) => (
                            <MovieCard movie={movie} />
                        ))}
                    </div>
                ) : (
                    <div className="empty">
                        <h2>No movies found</h2>
                    </div>
                )}

        </div>
    );
}

export default App;