import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Icon } from '@iconify/react';
import flagBannerFill from '@iconify/icons-ph/flag-banner-fill';
import flagBannerBold from '@iconify/icons-ph/flag-banner-bold';
import favoriteStar from '@iconify/icons-fluent-mdl2/favorite-star';
import favoriteStarFill from '@iconify/icons-fluent-mdl2/favorite-star-fill';
import '../styles/GameDetail.css';

const GameDetail = () => {
  const { id } = useParams();
  const [game, setGame] = useState({});
  const apiKey = import.meta.env.VITE_APP_API_KEY;
  const [isFavorite, setIsFavorite] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    const fetchGameDetails = async () => {
      const response = await axios.get(`https://api.rawg.io/api/games/${id}?key=${apiKey}`);
      setGame(response.data);
      console.log(response.data);
    };

    fetchGameDetails();
  }, [id]);

  useEffect(() => {
    const favorites = localStorage.getItem('favorites') || '[]';
    const finishedGames = localStorage.getItem('finishedGames') || '[]';
    const parsedFavorites = JSON.parse(favorites);
    const parsedFinishedGames = JSON.parse(finishedGames);
    setIsFavorite(parsedFavorites.some((favorite) => favorite.id === game.id));
    setIsFinished(parsedFinishedGames.some((finishedGame) => finishedGame.id === game.id));
  }, [game]);

  const handleAddToFavorites = () => {
    let favorites = localStorage.getItem('favorites') || '[]';
    let parsedFavorites = JSON.parse(favorites);
    parsedFavorites.push(game);
    localStorage.setItem("favorites", JSON.stringify(parsedFavorites));
    setIsFavorite(true);
  };

  const handleDeleteFromFavorites = () => {
    let favorites = localStorage.getItem('favorites') || '[]';
    let parsedFavorites = JSON.parse(favorites);
    parsedFavorites = parsedFavorites.filter((favorite) => favorite.id !== game.id);
    localStorage.setItem("favorites", JSON.stringify(parsedFavorites));
    setIsFavorite(false);
  };

  const handleAddToFinishedGames = () => {
    let finishedGames = localStorage.getItem('finishedGames') || '[]';
    let parsedFinishedGames = JSON.parse(finishedGames);
    parsedFinishedGames.push(game);
    localStorage.setItem("finishedGames", JSON.stringify(parsedFinishedGames));
    setIsFinished(true);
  };

  const handleDeleteFromFinishedGames = () => {
    let finishedGames = localStorage.getItem('finishedGames') || '[]';
    let parsedFinishedGames = JSON.parse(finishedGames);
    parsedFinishedGames = parsedFinishedGames.filter((finishedGame) => finishedGame.id !== game.id);
    localStorage.setItem("finishedGames", JSON.stringify(parsedFinishedGames));
    setIsFinished(false);
  };

  return (
    <div className="game-detail">
      <img src={game.background_image} alt={game.name} />
      <h2>{game.name}</h2>
      <p>Rating: {game.rating} ({game.ratings_count} votes)</p>
      <div className="description" dangerouslySetInnerHTML={{ __html: 'Synopsis: ' + game.description }} />
      <p>Release Date: {game.released}</p>
      <p>Developers: {game.developers && game.developers.map(developer => developer.name).join(", ")}</p>
      <p>Genres: {game.genres && game.genres.map(genre => genre.name).join(", ")}</p>
      <p>Platforms: {game.platforms && game.platforms.map(platform => platform.platform.name).join(", ")}</p>
      <div className="button-container">
        {!isFavorite ? (
          <Icon
            className="icon-button favorite"
            icon={favoriteStar}
            onClick={handleAddToFavorites}
          />
        ) : (
          <Icon
            className="icon-button favorite active"
            icon={favoriteStarFill}
            onClick={handleDeleteFromFavorites}
          />
        )}
        {!isFinished ? (
          <Icon
            className="icon-button finished"
            icon={flagBannerBold}
            onClick={handleAddToFinishedGames}
          />
        ) : (
          <Icon
            className="icon-button finished active"
            icon={flagBannerFill}
            onClick={handleDeleteFromFinishedGames}
          />
        )}
      </div>
    </div>
  );
};

export default GameDetail;
