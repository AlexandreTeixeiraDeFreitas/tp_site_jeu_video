import React, { useEffect, useState } from "react";
import axios from "axios";
import GameCard from '../components/GameCard';
import FilterBar from '../components/FilterBar';
import '../styles/GameList.css';

const GameList = () => {
  const [games, setGames] = useState([]);
  const [filter, setFilter] = useState('name');
  const apiKey = import.meta.env.VITE_APP_API_KEY;
  
  useEffect(() => {
    const fetchGames = async () => {
      const response = await axios.get(`https://api.rawg.io/api/games?key=${apiKey}&ordering=${filter}`);
      setGames(response.data.results);
      console.log(response.data.results);
    };

    fetchGames();
  }, [filter]);

  return (
    <div className="game-list-container">
      <h1 className="game-list-title">GamerList</h1>
      <FilterBar setFilter={setFilter} />
      <div className="game-cards-container">
        {games.map((game) => <GameCard key={game.id} game={game} />)}
      </div>
    </div>
  );
};

export default GameList;
