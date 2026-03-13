import { useReducer, useState, useCallback, useMemo } from 'react';

import useFetchPhotos from './hooks/useFetchPhotos';
import favouritesReducer, {
  TOGGLE_FAVOURITE,
  loadFavourites,
} from './reducers/favouritesReducer';

import SearchBar from './components/SearchBar';
import PhotoCard from './components/PhotoCard';
import Spinner from './components/Spinner';
import ErrorMessage from './components/ErrorMessage';

function App() {
  const { photos, loading, error } = useFetchPhotos();

  // Favourites managed with useReducer — hydrated from localStorage on mount
  const [favourites, dispatch] = useReducer(favouritesReducer, [], () => loadFavourites());

  // Search query
  const [searchQuery, setSearchQuery] = useState('');

  // Active tab: 'all' or 'favourites'
  const [activeTab, setActiveTab] = useState('all');

  // useCallback — memoised handler so SearchBar does not re-render on every keystroke cycle
  const handleSearchChange = useCallback((e) => {
    setSearchQuery(e.target.value);
  }, []);

  // useCallback — memoised toggle handler to avoid new function ref each render
  const handleToggleFavourite = useCallback((photoId) => {
    dispatch({ type: TOGGLE_FAVOURITE, payload: photoId });
  }, []);

  // useMemo — filtered list is re-computed only when photos or searchQuery change
  const filteredPhotos = useMemo(() => {
    if (!searchQuery.trim()) return photos;

    const query = searchQuery.toLowerCase().trim();
    return photos.filter((photo) =>
      photo.author.toLowerCase().includes(query)
    );
  }, [photos, searchQuery]);

  // Use a Set for O(1) lookup instead of array.includes O(n) per card
  const favouritesSet = useMemo(() => new Set(favourites), [favourites]);

  // Separate list for the favourites tab
  const favouritePhotos = useMemo(() => {
    return filteredPhotos.filter((photo) => favouritesSet.has(photo.id));
  }, [filteredPhotos, favouritesSet]);

  // Which photos to show based on active tab
  const displayedPhotos = activeTab === 'favourites' ? favouritePhotos : filteredPhotos;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50">
      {/* ---- Header ---- */}
      <header className="bg-white/90 border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
                📸 Photo Gallery
              </h1>
              <p className="text-sm text-gray-500 mt-0.5">
                Discover beautiful photos from around the world
              </p>
            </div>

            <SearchBar value={searchQuery} onChange={handleSearchChange} />
          </div>

          {/* ---- Tabs ---- */}
          <div className="flex gap-1 mt-4 bg-gray-100 rounded-lg p-1 max-w-xs">
            <button
              id="tab-all"
              onClick={() => setActiveTab('all')}
              className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-colors duration-150
                ${activeTab === 'all'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
                }`}
            >
              All Photos
            </button>
            <button
              id="tab-favourites"
              onClick={() => setActiveTab('favourites')}
              className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-colors duration-150
                ${activeTab === 'favourites'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
                }`}
            >
              Favourites
              {favourites.length > 0 && (
                <span className="ml-1.5 inline-flex items-center justify-center w-5 h-5 text-xs font-semibold bg-red-100 text-red-600 rounded-full">
                  {favourites.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* ---- Main content ---- */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading && <Spinner />}

        {error && <ErrorMessage message={error} />}

        {/* Empty state for favourites tab */}
        {!loading && !error && activeTab === 'favourites' && favouritePhotos.length === 0 && (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">💛</div>
            <p className="text-gray-400 text-lg font-medium">No favourites yet</p>
            <p className="text-gray-400 text-sm mt-1">
              Click the heart icon on any photo to add it here
            </p>
          </div>
        )}

        {/* Empty state for search with no results */}
        {!loading && !error && activeTab === 'all' && filteredPhotos.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">
              {searchQuery
                ? `No photos found for "${searchQuery}"`
                : 'No photos available.'}
            </p>
          </div>
        )}

        {/* Photo grid */}
        {!loading && !error && displayedPhotos.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {displayedPhotos.map((photo) => (
              <PhotoCard
                key={photo.id}
                photo={photo}
                isFavourite={favouritesSet.has(photo.id)}
                onToggleFavourite={handleToggleFavourite}
              />
            ))}
          </div>
        )}

        {/* Photo count footer */}
        {!loading && !error && displayedPhotos.length > 0 && (
          <p className="text-center text-gray-400 text-sm mt-8">
            Showing {displayedPhotos.length} of {photos.length} photos
            {favourites.length > 0 && ` · ${favourites.length} favourited`}
          </p>
        )}
      </main>
    </div>
  );
}

export default App;
