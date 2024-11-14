import React, { useEffect, useState } from 'react';
import { fetchComicData, fetchComicCharactersData, fetchRelatedComics } from './marvelapi';

import './style.css';
import CharacterComics from './CharacterComics';


const ComicViewer = ({comicId, setSelectedComic}) => {
  const [comic, setComic] = useState(null);

  const [relatedComics, setRelatedComics] = useState([]);

  useEffect(() => {
    const fetchComicDetails = async () => {
      const comicData = await fetchComicData(comicId);
      const charactersData = await fetchComicCharactersData(comicId);
      console.log(comicData);
      setComic({...comicData[0], characters: charactersData});
      console.log(charactersData);

      
       if (charactersData && charactersData.length > 0) {
        const characterIds = charactersData.map(char => char.id);
        const related = await fetchRelatedComics(characterIds);
        
        setRelatedComics(related.filter(relatedComic => relatedComic.id !== comicId));
      }
    };
    fetchComicDetails();
  }, [comicId]);

  if (!comic) return <p>Loading...</p>;

  return (
    <>
      <button className="comic-back-button" onClick={() => setSelectedComic(null)}>
        BACK TO COMICS
      </button>
      <div className="comic-viewer-panel">
     
        
        <img 
          src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`} 
          alt={comic.title} 
          className="comic-thumbnail" 
        />
        <h1 className="comic-viewer-title">{comic.title}</h1>
        <div className="comic-description">
          {comic.description || "No description available"}
        </div>
        <div className="characters-section">
        <h2 className="characters-header featured-characters">Featured Characters</h2>
          
          <CharacterComics characters={comic.characters}  />
           
          
        </div>
        {relatedComics.length > 0 && (
          <div className="related-comics-section">
            <h2 className="related-comics-header">Related Comics</h2>
            <div className="related-comics-grid">
              {relatedComics.map(relatedComic => (
                <div 
                  key={relatedComic.id} 
                  className="related-comic-panel"
                  onClick={() => setSelectedComic(relatedComic.id)}
                >
                  <img 
                    src={`${relatedComic.thumbnail.path}.${relatedComic.thumbnail.extension}`} 
                    alt={relatedComic.title} 
                    className="related-comic-thumbnail"
                  />
                  <h3 className="related-comic-title">{relatedComic.title}</h3>
                </div>
              ))}
            </div>
          </div>
        )}
        
      </div>
    </>
  );
};

export default ComicViewer;