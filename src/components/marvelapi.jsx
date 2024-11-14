const ts = 1;
const BASE_URL = 'https://gateway.marvel.com/v1/public';
const PUBLIC_KEY = '383c7dc4c589b656cd9896e112bb2315';
const PRE_GENERATED_HASH = 'c61250fa0116673c5c6827a4be0850dd';

export const fetchMarvelData = () => {
    return fetch(
      `${BASE_URL}/comics?orderBy=-modified&limit=20&ts=${ts}&apikey=${PUBLIC_KEY}&hash=${PRE_GENERATED_HASH}`,
      { method: 'GET', headers: { 'Content-Type': 'application/json' } }
    )
      .then(response => {
        if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`);
        return response.json();
      })
      .then(data => data.data.results)
      .catch(error => {
        console.error('Error fetching data:', error);
        return [];
      });
  };
  
  export const fetchComicData = (comicId) => {
    return fetch(
      `${BASE_URL}/comics/${comicId}?ts=${ts}&apikey=${PUBLIC_KEY}&hash=${PRE_GENERATED_HASH}`,
      { method: 'GET', headers: { 'Content-Type': 'application/json' } }
    )
      .then(response => {
        if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`);
        return response.json();
      })
      .then(data => data.data.results)
      .catch(error => {
        console.error('Error fetching data:', error);
        return [];
      });
  };
  
  export const fetchComicCharactersData = (comicId) => {
    return fetch(
      `${BASE_URL}/comics/${comicId}/characters?ts=${ts}&apikey=${PUBLIC_KEY}&hash=${PRE_GENERATED_HASH}`,
      { method: 'GET', headers: { 'Content-Type': 'application/json' } }
    )
      .then(response => {
        if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`);
        return response.json();
      })
      .then(data => data.data.results)
      .catch(error => {
        console.error('Error fetching data:', error);
        return [];
      });
  };


  export const fetchRelatedComics = (characterIds) => {
  
    const characterParams = characterIds.join(',');
    
    return fetch(
      `${BASE_URL}/comics?characters=${characterParams}&orderBy=modified&limit=4&ts=${ts}&apikey=${PUBLIC_KEY}&hash=${PRE_GENERATED_HASH}`,
      { method: 'GET', headers: { 'Content-Type': 'application/json' } }
    )
      .then(response => {
        if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`);
        return response.json();
      })
      .then(data => data.data.results)
      .catch(error => {
        console.error('Error fetching related comics:', error);
        return [];
      });
  };