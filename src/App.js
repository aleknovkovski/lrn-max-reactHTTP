import React, {useState} from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    function fetchMoviesHandler() {
        setIsLoading(true);
        fetch('https://swapi.dev/api/films/')
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                console.log(data)
                const transformedMovies = data.results.map((movieData) => {
                    return {
                        id: movieData.episode_id,
                        title: movieData.title,
                        openingText: movieData.opening_crawl,
                        releaseDate: movieData.release_date,
                    };
                });
                console.log(transformedMovies)
                setMovies(transformedMovies);
                setIsLoading(false);
            });
    }

    return (
        <React.Fragment>
            <section>
                <button onClick={fetchMoviesHandler}>Fetch Movies</button>
            </section>
            <section>
                {isLoading && <p>Loading...</p>}
                {!isLoading && movies.length > 0 && <MoviesList movies={movies} />}
                {!isLoading && movies.length === 0 && <p>Found no movies.</p>}
            </section>
        </React.Fragment>
    );
}

export default App;
