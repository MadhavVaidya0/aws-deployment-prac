import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { MapPin, Clock, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { getAllRides } from "@/api/rideApi";

// Popular Indian cities and locations (fallback)
const POPULAR_LOCATIONS = [
  "Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai", "Kolkata", 
  "Pune", "Ahmedabad", "Jaipur", "Surat", "Lucknow", "Kanpur",
  "Nagpur", "Indore", "Thane", "Bhopal", "Visakhapatnam", "Patna",
  "Vadodara", "Ghaziabad", "Ludhiana", "Agra", "Nashik", "Faridabad",
  "Meerut", "Rajkot", "Varanasi", "Srinagar", "Amritsar", "Allahabad",
  "Howrah", "Gwalior", "Jabalpur", "Coimbatore", "Vijayawada", "Jodhpur",
  "Madurai", "Raipur", "Kota", "Chandigarh", "Guwahati", "Solapur",
  "Aurangabad", "Nashik", "Kolhapur", "Sangli", "Satara", "Ratnagiri"
];

export default function LocationAutocomplete({
  value,
  onChange,
  placeholder = "Enter location",
  onSelect,
  className,
  iconColor = "blue",
  label,
  id,
}) {
  const [inputValue, setInputValue] = useState(value || "");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [recentSearches, setRecentSearches] = useState([]);
  const [databaseLocations, setDatabaseLocations] = useState([]);
  const [loadingLocations, setLoadingLocations] = useState(false);
  const inputRef = useRef(null);
  const suggestionsRef = useRef(null);
  const containerRef = useRef(null);

  // Load recent searches from localStorage
  useEffect(() => {
    const recent = localStorage.getItem("recentLocationSearches");
    if (recent) {
      try {
        setRecentSearches(JSON.parse(recent));
      } catch (e) {
        console.error("Error parsing recent searches:", e);
      }
    }
  }, []);

  // Fetch unique locations from database
  useEffect(() => {
    const fetchLocations = async () => {
      setLoadingLocations(true);
      try {
        const response = await getAllRides();
        const rides = response.data || [];
        
        // Extract unique sources and destinations
        const sources = new Set();
        const destinations = new Set();
        
        rides.forEach(ride => {
          if (ride.source && ride.source.trim()) {
            sources.add(ride.source.trim());
          }
          if (ride.destination && ride.destination.trim()) {
            destinations.add(ride.destination.trim());
          }
        });
        
        // Combine and convert to array, sorted alphabetically
        const allLocations = Array.from(new Set([...sources, ...destinations])).sort();
        setDatabaseLocations(allLocations);
      } catch (error) {
        console.error("Error fetching locations from database:", error);
        // Keep empty array, will fallback to popular locations
        setDatabaseLocations([]);
      } finally {
        setLoadingLocations(false);
      }
    };

    fetchLocations();
  }, []);

  // Sync with external value
  useEffect(() => {
    setInputValue(value || "");
  }, [value]);

  // Filter suggestions based on input
  useEffect(() => {
    if (inputValue.trim().length === 0) {
      setSuggestions([]);
      return;
    }

    const query = inputValue.toLowerCase().trim();
    
    // First, search in database locations (actual rides)
    const dbFiltered = databaseLocations.filter(location =>
      location.toLowerCase().includes(query)
    );
    
    // Then search in popular locations (fallback)
    const popularFiltered = POPULAR_LOCATIONS.filter(location =>
      location.toLowerCase().includes(query) && 
      !databaseLocations.includes(location)
    );
    
    // Combine: database locations first, then popular locations
    const allFiltered = [...dbFiltered, ...popularFiltered];
    
    // Also search in recent searches (prioritize them)
    const recentFiltered = recentSearches.filter(location =>
      location.toLowerCase().includes(query) && 
      !allFiltered.includes(location)
    );
    
    // Combine: recent first, then database, then popular (limit to 10 total)
    const combined = [...recentFiltered, ...allFiltered].slice(0, 10);
    
    setSuggestions(combined);
  }, [inputValue, recentSearches, databaseLocations]);

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    onChange?.(newValue);
    setShowSuggestions(true);
    setSelectedIndex(-1);
  };

  const handleSelect = (location) => {
    setInputValue(location);
    onChange?.(location);
    setShowSuggestions(false);
    setSelectedIndex(-1);
    
    // Save to recent searches
    const updated = [location, ...recentSearches.filter(l => l !== location)].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem("recentLocationSearches", JSON.stringify(updated));
    
    // Call onSelect callback
    if (onSelect) {
      onSelect(location);
    }
    
    // Small delay before blur to ensure the value is set
    setTimeout(() => {
      inputRef.current?.blur();
    }, 100);
  };

  const handleClear = (e) => {
    e.stopPropagation();
    setInputValue("");
    onChange?.("");
    setShowSuggestions(false);
    inputRef.current?.focus();
  };

  const handleKeyDown = (e) => {
    if (!showSuggestions || suggestions.length === 0) {
      if (e.key === "Enter") {
        e.preventDefault();
        return;
      }
      return;
    }

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case "Enter":
        e.preventDefault();
        if (selectedIndex >= 0 && selectedIndex < suggestions.length) {
          handleSelect(suggestions[selectedIndex]);
        }
        break;
      case "Escape":
        setShowSuggestions(false);
        setSelectedIndex(-1);
        inputRef.current?.blur();
        break;
    }
  };

  const handleFocus = () => {
    if (inputValue.trim().length > 0) {
      setShowSuggestions(true);
    }
  };

  const handleBlur = (e) => {
    // Delay to allow click events on suggestions
    setTimeout(() => {
      if (!containerRef.current?.contains(document.activeElement)) {
        setShowSuggestions(false);
        setSelectedIndex(-1);
      }
    }, 200);
  };

  const iconColors = {
    blue: "bg-blue-100 text-blue-600",
    red: "bg-red-100 text-red-600",
  };

  return (
    <div ref={containerRef} className={cn("relative w-full", className)}>
      {label && (
        <label htmlFor={id} className="block text-xs font-medium text-gray-500 mb-1 uppercase tracking-wide">
          {label}
        </label>
      )}
      <div className="relative">
        <Input
          ref={inputRef}
          id={id}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          className="border-none shadow-none focus-visible:ring-0 p-0 h-auto text-base font-medium text-gray-900 placeholder:text-gray-400 bg-transparent pr-8"
          autoComplete="off"
        />
        {inputValue && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-0 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Clear"
          >
            <X className="h-4 w-4 text-gray-400" />
          </button>
        )}
      </div>

      {/* Suggestions Dropdown */}
      {showSuggestions && (suggestions.length > 0 || recentSearches.length > 0) && (
        <div className="absolute z-50 w-full mt-2 bg-white rounded-lg shadow-xl border border-gray-200 max-h-80 overflow-hidden">
          <div className="overflow-y-auto max-h-80">
            {/* Recent Searches */}
            {inputValue.trim().length === 0 && recentSearches.length > 0 && (
              <div className="p-2">
                <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Recent Searches
                </div>
                {recentSearches.slice(0, 3).map((location, index) => (
                  <button
                    key={`recent-${index}`}
                    type="button"
                    onClick={() => handleSelect(location)}
                    className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-gray-50 rounded-md transition-colors text-left"
                  >
                    <Clock className="h-4 w-4 text-gray-400" />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-gray-900 truncate">
                        {location}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {/* Suggestions */}
            {suggestions.length > 0 && (
              <div className="p-2">
                {inputValue.trim().length > 0 && (
                  <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    Suggestions
                  </div>
                )}
                {suggestions.map((location, index) => (
                  <button
                    key={`suggestion-${index}`}
                    type="button"
                    onClick={() => handleSelect(location)}
                    className={cn(
                      "w-full flex items-center gap-3 px-3 py-2.5 rounded-md transition-colors text-left",
                      selectedIndex === index
                        ? "bg-blue-50"
                        : "hover:bg-gray-50"
                    )}
                    onMouseEnter={() => setSelectedIndex(index)}
                  >
                    <div className={cn("w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0", iconColors[iconColor])}>
                      <MapPin className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-gray-900 truncate">
                        {location}
                      </div>
                      <div className="text-xs text-gray-500 truncate">
                        {location}, India
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {/* No results */}
            {inputValue.trim().length > 0 && suggestions.length === 0 && (
              <div className="p-8 text-center">
                <MapPin className="h-8 w-8 text-gray-300 mx-auto mb-2" />
                <p className="text-sm text-gray-500">No locations found</p>
                <p className="text-xs text-gray-400 mt-1">
                  Try searching for a city name
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

