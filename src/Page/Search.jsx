import React, { useState, useEffect } from 'react';
import axios from 'axios';
import GameCard from '../components/GameCard';
import '../styles/Search.css';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [games, setGames] = useState([]);
  const [topRatedGames, setTopRatedGames] = useState([]);
  const apiKey = import.meta.env.VITE_APP_API_KEY;
  
  const handleSearch = async (e) => {
    e.preventDefault();
    const response = await axios.get(`https://api.rawg.io/api/games?key=${apiKey}&search=${searchTerm}`);
    setGames(response.data.results);
  };

  const fetchTopRatedGames = async () => {
    const response = await axios.get(`https://api.rawg.io/api/games?key=${apiKey}&ordering=-rating&pages=1&page_size=20`);
    setTopRatedGames(response.data.results);
  };

  useEffect(() => {
    fetchTopRatedGames();
  }, []); // Exécuté au premier rendu seulement

  return (
    <div className="search-container">
      <form className="search-form" onSubmit={handleSearch}>
        <input
          className="search-input"
          type="text"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          placeholder="Search for games"
        />
        <button className="search-button" type="submit">Search</button>
      </form>
      <div className="search-results">
        {games.length === 0 && (
          <>
            <h2>Top 20 Rated Games</h2>
            <div className="game-card-list">
              {topRatedGames.map(game => <GameCard game={game} key={game.id} />)}
            </div>
          </>
        )}
        {games.length > 0 && (
          <>
            <h2>Search Results</h2>
            <div className="game-card-list">
              {games.map(game => <GameCard game={game} key={game.id} />)}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Search;
