import { useState, useRef } from "react";

export default function SearchBox({ onSubmit, className = "" }) {
  const [loading, setLoading] = useState(false);
  const sourceRef = useRef(null);
  const destinationRef = useRef(null);
  const dateRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const source = sourceRef.current?.value?.trim();
    const destination = destinationRef.current?.value?.trim();
    const date = dateRef.current?.value;

    if (!source || !destination) {
      alert("Please enter both source and destination");
      setLoading(false);
      return;
    }

    if (onSubmit) {
      onSubmit({ source, destination, date });
    }
    
    setTimeout(() => setLoading(false), 1000);
  };

  return (
    <div className={`w-full max-w-2xl mx-auto ${className}`}>
      <form onSubmit={handleSubmit} className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border p-1">
        <div className="flex flex-col sm:flex-row gap-2 p-3">
          
          {/* From */}
          <div className="flex-1 relative group">
            <input
              ref={sourceRef}
              type="text"
              placeholder="From"
              className="w-full h-12 px-4 pr-10 text-base rounded-xl border border-gray-200 focus:border-blue-400 focus:ring-1 focus:ring-blue-100 focus:outline-none transition-all duration-200 bg-white shadow-sm"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
            </div>
          </div>

          {/* Arrow */}
          <div className="flex sm:w-12 sm:items-center sm:justify-center">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-md">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          </div>

          {/* To */}
          <div className="flex-1 relative group">
            <input
              ref={destinationRef}
              type="text"
              placeholder="To"
              className="w-full h-12 px-4 pr-10 text-base rounded-xl border border-gray-200 focus:border-emerald-400 focus:ring-1 focus:ring-emerald-100 focus:outline-none transition-all duration-200 bg-white shadow-sm"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-emerald-500">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
              </svg>
            </div>
          </div>

          {/* Date */}
          <div className="w-full sm:w-32 relative">
            <input
              ref={dateRef}
              type="date"
              defaultValue={new Date().toISOString().split('T')[0]}
              min={new Date().toISOString().split('T')[0]}
              className="w-full h-12 px-3 text-sm rounded-xl border border-gray-200 focus:border-purple-400 focus:ring-1 focus:ring-purple-100 focus:outline-none transition-all duration-200 bg-white shadow-sm"
            />
          </div>
        </div>

        {/* Search Button */}
        <div className="px-3 pb-3 flex justify-center">
          <button
            type="submit"
            disabled={loading}
            className="px-8 py-2.5 bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white font-semibold text-sm rounded-xl shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-50 flex items-center gap-1.5 min-w-[100px]"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Search
              </>
            ) : (
              "🔍 Search"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
