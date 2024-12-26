import React from "react";
import {useEffect, useState} from 'react';
import './App.css';
import SearchIcon from './search.svg';
import MovieCard from "./MovieCard";
//5de3fb60

const API_URL = 'http://www.omdbapi.com/?apikey=5de3fb60'

const App = () => {
  const [movies, setMovies] = useState([]);
  
  const[searchTerm, setSearchTerm] = useState('');

    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();

        setMovies(data.Search)
    }

  useEffect(() => {
    searchMovies('Superman');
  }, []);

  const handleKeyDown = (ev) => {
    if(ev.key === 'Enter') {
      searchMovies(searchTerm)
    }
  }

    return (
    <div className="app">
      <h1>Movie Monster</h1>

      <div className="search">
        <input
        placeholder="Search for the Movies"
        value = {searchTerm}
        onChange={(e) => setSearchTerm (e.target.value)}
        onKeyDown={handleKeyDown}
        />
        <img 
        src={SearchIcon}
        alt ="Search"
        onClick={() => searchMovies(searchTerm)}
        />
      </div>
      {
        movies?.length > 0
        ? (
          <div className="container">
            {movies.map((movie) => (
              <MovieCard key={movie.imdbID} movie={movie} />
            ))}
      </div>
    
        ) :
        (
          <div className="empty">
            <h2>No movies found</h2>
          </div>
        )
      }
      </div>
  );
};

export default App;