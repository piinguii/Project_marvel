import React, { useState, useEffect } from 'react';

const Favorites = () => {
  const [favorites, setFavorites] = useState(()=>{
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    return storedFavorites;
  });
  

  const removeFavorite = (id) => {
    const updatedFavorites = favorites.filter(comic => comic.id !== id);
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  return (
    <div className="favorites">
      <h2>Favoritos</h2>
      {favorites.map(comic => (
        <div key={comic.id} className="comic">
          <img src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`} alt={comic.title} />
          <h3>{comic.title}</h3>
          <button onClick={() => removeFavorite(comic.id)}>Quitar de Favoritos</button>
        </div>
      ))}
    </div>
  );
};

export default Favorites;
