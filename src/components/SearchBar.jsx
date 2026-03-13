function SearchBar({ value, onChange }) {
  return (
    <div className="relative w-full max-w-md mx-auto sm:mx-0">
      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
        <svg
          className="w-4 h-4 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
          />
        </svg>
      </div>
      <input
        id="search-input"
        type="text"
        placeholder="Search by author name…"
        value={value}
        onChange={onChange}
        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50/60
                   text-sm text-gray-700 placeholder-gray-400
                   focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-transparent focus:bg-white
                   transition-all duration-200"
      />
    </div>
  );
}

export default SearchBar;
