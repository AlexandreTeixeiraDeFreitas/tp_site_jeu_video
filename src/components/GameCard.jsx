import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import flagBannerFill from '@iconify/icons-ph/flag-banner-fill';
import flagBannerBold from '@iconify/icons-ph/flag-banner-bold';
import favoriteStar from '@iconify/icons-fluent-mdl2/favorite-star';
import favoriteStarFill from '@iconify/icons-fluent-mdl2/favorite-star-fill';
import '../styles/GameCard.css';

const GameCard = ({ game }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    const favorites = localStorage.getItem('favorites') || '[]';
    const finishedGames = localStorage.getItem('finishedGames') || '[]';
    const parsedFavorites = JSON.parse(favorites);
    const parsedFinishedGames = JSON.parse(finishedGames);
    setIsFavorite(parsedFavorites.some(favorite => favorite.id === game.id));
    setIsFinished(parsedFinishedGames.some(finishedGame => finishedGame.id === game.id));
  }, [game]);

  const handleAddToFavorites = (e) => {
    e.stopPropagation();
    e.preventDefault();
    let favorites = localStorage.getItem('favorites') || '[]';
    let parsedFavorites = JSON.parse(favorites);
    if (!parsedFavorites.some(favorite => favorite.id === game.id)) {
      parsedFavorites.push(game);
      localStorage.setItem('favorites', JSON.stringify(parsedFavorites));
      setIsFavorite(true);
    }
  };

  const handleDeleteFromFavorites = (e) => {
    e.stopPropagation();
    e.preventDefault();
    let favorites = localStorage.getItem('favorites') || '[]';
    let parsedFavorites = JSON.parse(favorites);
    parsedFavorites = parsedFavorites.filter(favorite => favorite.id !== game.id);
    localStorage.setItem('favorites', JSON.stringify(parsedFavorites));
    setIsFavorite(false);
  };

  const handleAddToFinishedGames = (e) => {
    e.stopPropagation();
    e.preventDefault();
    let finishedGames = localStorage.getItem('finishedGames') || '[]';
    let parsedFinishedGames = JSON.parse(finishedGames);
    if (!parsedFinishedGames.some(finishedGame => finishedGame.id === game.id)) {
      parsedFinishedGames.push(game);
      localStorage.setItem('finishedGames', JSON.stringify(parsedFinishedGames));
      setIsFinished(true);
    }
  };

  const handleDeleteFromFinishedGames = (e) => {
    e.stopPropagation();
    e.preventDefault();
    let finishedGames = localStorage.getItem('finishedGames') || '[]';
    let parsedFinishedGames = JSON.parse(finishedGames);
    parsedFinishedGames = parsedFinishedGames.filter(finishedGame => finishedGame.id !== game.id);
    localStorage.setItem('finishedGames', JSON.stringify(parsedFinishedGames));
    setIsFinished(false);
  };

  return (
    <Link to={`/game/${game.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <div className="game-card" key={game.id}>
        <div>
          <img src={game.background_image} alt={game.name} />
          <h2>{game.name}</h2>
          <p>{game.platforms.map(platform => platform.platform.name).join(", ")}</p>
        </div>
        <div>
          {!isFavorite ? (
            <Icon
              className="favorite-button"
              onClick={handleAddToFavorites}
              icon={favoriteStar}
            />
          ) : (
            <Icon
              className="favorite-button filled"
              onClick={handleDeleteFromFavorites}
              icon={favoriteStarFill}
            />
          )}
          {!isFinished && (
            <Icon
              className="finished-button transparent-banner"
              onClick={handleAddToFinishedGames}
              icon={flagBannerBold}
            />
          )}
          {isFinished && (
            <Icon
              className="finished-button filled-banner"
              onClick={handleDeleteFromFinishedGames}
              icon={flagBannerFill}
            />
          )}
        </div>
      </div>
    </Link>
  );
};

export default GameCard;
