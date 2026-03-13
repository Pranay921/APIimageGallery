import { memo } from 'react';

// Use Picsum's resize endpoint instead of full-resolution download_url
// This loads ~400x300px thumbnails instead of ~5000x3000px originals
function getOptimizedUrl(photo) {
  return `https://picsum.photos/id/${photo.id}/400/300`;
}

const PhotoCard = memo(function PhotoCard({ photo, isFavourite, onToggleFavourite }) {
  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300">
      <div className="relative overflow-hidden">
        <img
          src={getOptimizedUrl(photo)}
          alt={`Photo by ${photo.author}`}
          loading="lazy"
          decoding="async"
          width={400}
          height={300}
          className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />

        {/* Heart button */}
        <button
          id={`fav-btn-${photo.id}`}
          onClick={() => onToggleFavourite(photo.id)}
          className={`absolute top-3 right-3 w-9 h-9 flex items-center justify-center
                     rounded-full shadow-md
                     transition-all duration-200 ease-out active:scale-90
                     ${isFavourite
                       ? 'bg-red-50 hover:bg-red-100'
                       : 'bg-white/80 hover:bg-white'
                     }`}
          aria-label={isFavourite ? 'Remove from favourites' : 'Add to favourites'}
        >
          {isFavourite ? (
            <svg className="w-5 h-5 text-red-500 animate-heartPop" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5
                       2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09
                       C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5
                       c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          ) : (
            <svg className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Author info */}
      <div className="px-4 py-3">
        <p className="text-sm font-medium text-gray-800 truncate">{photo.author}</p>
      </div>
    </div>
  );
});

export default PhotoCard;
