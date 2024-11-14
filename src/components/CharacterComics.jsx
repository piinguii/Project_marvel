

import React from 'react';

import './style.css';

const CharacterComics = ({ characters }) => {

  return (
    <div  className="character-gallery">
      {characters.map((character) => (
        <div key={character.id} className="character">
          <img 
            src={`${character.thumbnail.path}.${character.thumbnail.extension}`} 
            alt={character.name} 
            className="character-thumbnail"
          />
           <p className="character-name">{character.name}</p>
        </div>
      ))}
    </div>
     
  );
};
export default CharacterComics;