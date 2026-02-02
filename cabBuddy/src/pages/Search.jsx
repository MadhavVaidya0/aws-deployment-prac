import { useEffect, useState, useMemo, useRef } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { getAllRides, searchRides } from "@/api/rideApi";
import SearchFilters from "@/components/SearchFilters";
import AvailableRideCard from "@/components/AvailableRideCard";

export default function Search() {
  const [allRides, setAllRides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Filter states
  const [sortBy, setSortBy] = useState(null);
  const [timeFilters, setTimeFilters] = useState({
    before06: false,
    sixTo12: false,
    twelveTo18: false,
  });
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [minSeats, setMinSeats] = useState("");

  // SearchBox refs
  const sourceRef = useRef(null);
  const destinationRef = useRef(null);
  const dateRef = useRef(null);

  // Load all rides on mount
  useEffect(() => {
    setLoading(true);
    getAllRides()
      .then(res => {
        setAllRides(res.data || []);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setAllRides([]);
        setLoading(false);
      });
  }, []);

  // Time filter counts
  const timeCounts = useMemo(() => {
    const getHour = (t) => t ? parseInt(t.split(":")[0]) : -1;

    return {
      before06: allRides.filter(r => getHour(r.departureTime) < 6).length,
      sixTo12: allRides.filter(r => {
        const h = getHour(r.departureTime);
        return h >= 6 && h < 12;
      }).length,
      twelveTo18: allRides.filter(r => {
        const h = getHour(r.departureTime);
        return h >= 12 && h < 18;
      }).length,
    };
  }, [allRides]);

  // Filtering logic
  const filteredRides = useMemo(() => {
    let rides = [...allRides];

    const source = searchParams.get("source")?.toLowerCase().trim();
    const destination = searchParams.get("destination")?.toLowerCase().trim();
    const date = searchParams.get("date");

    if (source || destination || date) {
      rides = rides.filter(ride => {
        if (source && !ride.source?.toLowerCase().includes(source)) return false;
        if (destination && !ride.destination?.toLowerCase().includes(destination)) return false;

        if (date) {
          const rideDate = ride.rideDate?.split("T")[0];
          if (rideDate !== date) return false;
        }
        return true;
      });
    }

    const activeTimeFilters = Object.entries(timeFilters).filter(([_, v]) => v);
    if (activeTimeFilters.length > 0) {
      rides = rides.filter(ride => {
        if (!ride.departureTime) return false;
        const hour = parseInt(ride.departureTime.split(":")[0]);

        return activeTimeFilters.some(([key]) => {
          if (key === "before06") return hour < 6;
          if (key === "sixTo12") return hour >= 6 && hour < 12;
          if (key === "twelveTo18") return hour >= 12 && hour < 18;
          return false;
        });
      });
    }

    if (minPrice) rides = rides.filter(r => r.pricePerSeat >= +minPrice);
    if (maxPrice) rides = rides.filter(r => r.pricePerSeat <= +maxPrice);
    if (minSeats) rides = rides.filter(r => r.availableSeats >= +minSeats);

    if (sortBy) {
      rides.sort((a, b) => {
        if (sortBy === "earliest")
          return (a.departureTime || "99").localeCompare(b.departureTime || "99");
        if (sortBy === "lowest_price") return a.pricePerSeat - b.pricePerSeat;
        if (sortBy === "highest_price") return b.pricePerSeat - a.pricePerSeat;
        if (sortBy === "most_seats") return b.availableSeats - a.availableSeats;
        return 0;
      });
    }

    return rides;
  }, [allRides, searchParams, timeFilters, minPrice, maxPrice, minSeats, sortBy]);

  const formatTime = (t) => t ? t.substring(0, 5) : "00:00";

  // 🔥 ONLY CHANGE: search API on button click
  const handleSearchSubmit = async (e) => {
    e.preventDefault();

    const source = sourceRef.current?.value?.trim();
    const destination = destinationRef.current?.value?.trim();
    const date = dateRef.current?.value;

    const params = new URLSearchParams();
    if (source) params.set("source", source);
    if (destination) params.set("destination", destination);
    if (date) params.set("date", date);

    navigate(`/search?${params.toString()}`);

    try {
      setLoading(true);
      const res = await searchRides(source, destination, date);
      setAllRides(res.data || []);
    } catch (err) {
      console.error("Search error:", err);
      setAllRides([]);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = ({ sort, times }) => {
    if (sort !== undefined) setSortBy(sort);
    if (times) setTimeFilters(times);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <form onSubmit={handleSearchSubmit} className="bg-white p-6 rounded-xl shadow mb-6">
        <div className="grid md:grid-cols-3 gap-4">
          <input ref={sourceRef} defaultValue={searchParams.get("source") || ""} placeholder="From" className="border p-3 rounded" />
          <input ref={destinationRef} defaultValue={searchParams.get("destination") || ""} placeholder="To" className="border p-3 rounded" />
          <input ref={dateRef} type="date" defaultValue={searchParams.get("date") || ""} className="border p-3 rounded" />
        </div>
        <button className="mt-4 w-full bg-blue-600 text-white p-3 rounded">
          🔍 Search Rides
        </button>
      </form>

      <div className="flex gap-6">
        <SearchFilters
          initialSort={sortBy}
          timeCounts={timeCounts}
          onChange={handleFilterChange}
        />

        <div className="flex-1 space-y-4">
          {loading && <p>Loading...</p>}

          {!loading && filteredRides.map(ride => (
            <Link key={ride.id} to={`/requestbooking/${ride.id}`}>
              <AvailableRideCard
                startTime={formatTime(ride.departureTime)}
                endTime={formatTime(ride.arrivalTime)}
                from={ride.source}
                to={ride.destination}
                price={ride.pricePerSeat}
                rideDate={ride.rideDate}
                availableSeats={ride.availableSeats}
                driver={{
                  name: ride.driverName || "Driver",
                  rating: 4.5,
                }}
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
