import React, { useState } from 'react';
import GameCard from '../components/GameCard';
import '../styles/Profile.css';

const Profile = () => {
  const favorites = localStorage.getItem('favorites') || '[]';
  const parsedFavorites = JSON.parse(favorites);
  const [favoriteGames, setFavoriteGames] = useState(parsedFavorites);
  const finishedGames = localStorage.getItem('finishedGames') || '[]';
  const parsedFinishedGames = JSON.parse(finishedGames);
  const badge = parsedFinishedGames.length >= 10 ? 'You have a badge for finishing 10 games!' : '';

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
        {parsedFinishedGames.map((game, index) => (
          <GameCard key={index} game={game} />
        ))}
      </div>

      {badge && <h2 className="badge">{badge}</h2>}
    </div>
  );
};

export default Profile;
