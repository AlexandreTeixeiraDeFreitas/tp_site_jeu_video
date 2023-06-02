import React, { useEffect, useState } from 'react';
import axios from 'axios';
import GameCard from '../components/GameCard.jsx';
import '../styles/Search.css';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [games, setGames] = useState([]);
  const [page, setPage] = useState(1);
  const apiKey = import.meta.env.VITE_APP_API_KEY;

  useEffect(() => {
    const fetchGames = async () => {
      const response = await axios.get(
        `https://api.rawg.io/api/games?key=${apiKey}&search=${searchTerm}&ordering=-rating&page=${page}&page_size=20`
      );
      setGames(prevGames => [...prevGames, ...response.data.results]);
    };

    fetchGames();
  }, [searchTerm, page]);

  const handleSearch = (e) => {
    e.preventDefault();
    setGames([]);
    setPage(1);
    fetchGames();
  };

  const fetchGames = () => {
    if (searchTerm.trim() !== '') {
      axios
        .get(
          `https://api.rawg.io/api/games?key=${apiKey}&search=${searchTerm}&ordering=-rating&page=${page}&page_size=20`
        )
        .then((response) => {
          setGames(prevGames => [...prevGames, ...response.data.results]);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const loadMoreGames = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <div className="search-container">
      <form className="search-form" onSubmit={handleSearch}>
        <input
          className="search-input"
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for games"
        />
        <button className="search-button" type="submit">
          Search
        </button>
      </form>
      <div className="search-results">
        <h2>Search Results</h2>
        <div className="game-card-list">
          {games.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      </div>
      <div className="load-more-container">
        <button className="load-more-button" onClick={loadMoreGames}>
          Load More
        </button>
      </div>
    </div>
  );
};

export default Search;
