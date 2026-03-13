function ErrorMessage({ message }) {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="bg-red-50 border border-red-200 rounded-lg px-6 py-5 max-w-md text-center">
        <svg
          className="w-10 h-10 text-red-400 mx-auto mb-3"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <h3 className="text-red-800 font-semibold text-lg mb-1">
          Oops, something went wrong
        </h3>
        <p className="text-red-600 text-sm">{message}</p>
      </div>
    </div>
  );
}

export default ErrorMessage;
