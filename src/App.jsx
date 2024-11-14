import './App.css';
import React, {useEffect} from 'react';
import ComicsFeed from './components/ComicsFeed';
import ComicViewer from './components/ComicViewer';

import { fetchMarvelData } from './components/marvelapi';
import marvelLogo from './assets/marvelLogo.png'; 
import { useState } from 'react';

const App = () => {
  
  const [selectedComic, setSelectedComic] = useState(null);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [comics, setComics] = useState([]);
  const [favorites, setFavorites] = useState([]);


  useEffect(() => {
    const fetchComics = async () => {
      const comicsData = await fetchMarvelData();
      setComics(comicsData.filter(el => el.thumbnail.path !== 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available'));
      
    };
    fetchComics();

   
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites);
  }, []);

  

  
  return (
    <div className="app-container">
      <div className="marvel-logo">
        <img src={marvelLogo} alt="Marvel Logo" />
      </div>
      { selectedComic ? (
        <ComicViewer 
          comicId={selectedComic} 
          setSelectedComic={setSelectedComic}
          setSelectedCharacter={setSelectedCharacter} 
        />
      ) : (
        <ComicsFeed 
          setSelectedComic={setSelectedComic} 
          comics={comics} 
          setComics={setComics} 
          setFavorites={setFavorites} 
          favorites={favorites} 
        />
      )}
    </div>
  );
}

export default App;
