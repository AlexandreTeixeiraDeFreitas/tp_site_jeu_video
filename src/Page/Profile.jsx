import React, { useState, useEffect } from 'react';
import GameCard from '../components/GameCard.jsx';
import '../styles/Profile.css';

const Profile = () => {
  const [favoriteGames, setFavoriteGames] = useState([]);
  const [finishedGames, setFinishedGames] = useState([]);
  const badge = finishedGames.length >= 10 ? 'You have a badge for finishing 10 games!' : '';

  useEffect(() => {
    const favorites = localStorage.getItem('favorites');
    const parsedFavorites = favorites ? JSON.parse(favorites) : [];
    setFavoriteGames(parsedFavorites);

    const finished = localStorage.getItem('finishedGames');
    const parsedFinished = finished ? JSON.parse(finished) : [];
    setFinishedGames(parsedFinished);
  }, []);

  const removeFromFavorites = (gameId) => {
    const updatedFavorites = favoriteGames.filter((game) => game.id !== gameId);
    setFavoriteGames(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  return (
    <div className="profile-container">
      <h2>Favorites</h2>
      <div className="game-card-list">
        {favoriteGames.map((game) => (
          <GameCard key={game.id} game={game} onRemove={removeFromFavorites} />
        ))}
      </div>

      <h2>Finished Games</h2>
      <div className="game-card-list">
        {finishedGames.map((game, index) => (
          <GameCard key={index} game={game} />
        ))}
      </div>

      {badge && <h2 className="badge">{badge}</h2>}
    </div>
  );
};

export default Profile;
