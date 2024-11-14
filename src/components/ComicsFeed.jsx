import React, {  useState } from 'react';

import './style.css';

const ComicsFeed = ({setSelectedComic, comics, setFavorites, favorites}) => {
 
  const [showFavorites, setShowFavorites] = useState(false);
  const cleanTitle = (title) => {
    return title.trim();
  };

  const addFavorite = (comic) => {
    const updatedFavorites = [...favorites, comic];
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  const removeFavorite = (comic) => {
    const updatedFavorites = favorites.filter(fav => fav.id !== comic.id);
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  const toggleFavorites = () => {
    setShowFavorites(prev => !prev);
  };

  const isFavorite = (comicId) => {
    return favorites.some(fav => fav.id === comicId);
  };

  return (
    <div className="main-content">
      <div className="app-container">
        <button onClick={toggleFavorites} className="show-favorites-btn">
          {showFavorites ? 'Show All Comics' : 'Show Favorites'}
        </button>

        <div className="comic-container">
          {comics
            .filter(comic => !showFavorites || isFavorite(comic.id)) 
            .map(comic => (
              <div key={comic.id} className="comic-panel">
                <img 
                  src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`} 
                  alt={comic.title} 
                  onClick={()=>setSelectedComic(comic.id)}
                  className="comic-thumbnail" 
                />
                <h3 className="comic-title"  >{cleanTitle(comic.title)}</h3>
                <button 
                  onClick={() => isFavorite(comic.id) ? removeFavorite(comic) : addFavorite(comic)} 
                  className={`favorite-button ${isFavorite(comic.id) ? 'favorite' : ''}`}
                >
                  
                  <span className="star-icon">★</span>
                </button>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ComicsFeed;
