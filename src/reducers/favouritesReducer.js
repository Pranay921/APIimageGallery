const STORAGE_KEY = 'photo_gallery_favourites';

// Load favourites from localStorage
function loadFavourites() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

// Save favourites to localStorage
function saveFavourites(favourites) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favourites));
  } catch {
    // silently fail if storage is unavailable
  }
}

// Action types
export const TOGGLE_FAVOURITE = 'TOGGLE_FAVOURITE';
export const LOAD_FAVOURITES = 'LOAD_FAVOURITES';

// Reducer function
function favouritesReducer(state, action) {
  let nextState;

  switch (action.type) {
    case TOGGLE_FAVOURITE: {
      const photoId = action.payload;
      const exists = state.includes(photoId);

      if (exists) {
        nextState = state.filter((id) => id !== photoId);
      } else {
        nextState = [...state, photoId];
      }

      saveFavourites(nextState);
      return nextState;
    }

    case LOAD_FAVOURITES: {
      return loadFavourites();
    }

    default:
      return state;
  }
}

export { loadFavourites };
export default favouritesReducer;
