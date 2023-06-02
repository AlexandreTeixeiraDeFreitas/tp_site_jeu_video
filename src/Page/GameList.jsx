import React, { useEffect, useState } from "react";
import axios from "axios";
import GameCard from '../components/GameCard.jsx';
import FilterBar from '../components/FilterBar.jsx';
import '../styles/GameList.css';

const GameList = () => {
  const [games, setGames] = useState([]);
  const [filter, setFilter] = useState('name');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const apiKey = import.meta.env.VITE_APP_API_KEY;

  const fetchGames = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`https://api.rawg.io/api/games?key=${apiKey}&ordering=${filter}&page=${page}&page_size=20`);
      const newGames = response.data.results;
      setGames(prevGames => [...prevGames, ...newGames]);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadMoreGames = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    setGames([]);
    setPage(1);
  };

  useEffect(() => {
    fetchGames();
  }, [filter, page]);

  return (
    <div className="game-list-container">
      <h1 className="game-list-title">GamerList</h1>
      <FilterBar setFilter={handleFilterChange} />
      <div className="game-cards-container">
        {games.map((game) => <GameCard key={game.id} game={game} />)}
      </div>
      {!isLoading && (
        <div className="load-more-container">
          <button className="load-more-button" onClick={loadMoreGames}>
            Load More
          </button>
        </div>
      )}
      {isLoading && <p>Loading...</p>}
    </div>
  );
};

export default GameList;
