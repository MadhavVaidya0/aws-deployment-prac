import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createRide } from "@/api/rideApi";
import { getUserById, registerUser, updateUser } from "@/api/userApi";
import { toast } from "react-toastify";
import { format } from "date-fns";
import { CalendarDays, Clock, MapPin, Users, DollarSign, ArrowRight, Car, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import LocationAutocomplete from "@/components/LocationAutocomplete";

export default function PublishRide() {
  const navigate = useNavigate();

  const [date, setDate] = useState(new Date());
  const [departureTime, setDepartureTime] = useState("10:00");  // ✅ CHANGED: departureTime
  const [arrivalTime, setArrivalTime] = useState("13:00");      // ✅ NEW: arrivalTime
  const [fromCity, setFromCity] = useState("");
  const [toCity, setToCity] = useState("");
  const [seats, setSeats] = useState(2);
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(false);
  const [driverId, setDriverId] = useState(1);

  // ✅ FIXED: Price input handler
  const handlePriceChange = (e) => {
    const inputValue = e.target.value;
    
    if (inputValue === "") {
      setPrice("");
      return;
    }

    if (/^\d*\.?\d{0,2}$/.test(inputValue)) {
      const numValue = parseFloat(inputValue);
      if (numValue >= 1 && numValue <= 5000) {
        setPrice(inputValue);
      } else if (numValue < 1) {
        setPrice("1");
      }
    }
  };

  // ✅ NEW: Auto-calculate arrival time based on departure + 3 hours (default)
  const calculateArrivalTime = (departure) => {
    try {
      const [hours, minutes] = departure.split(":");
      const departureDate = new Date();
      departureDate.setHours(parseInt(hours), parseInt(minutes), 0, 0);
      
      // Add 3 hours (default duration)
      departureDate.setHours(departureDate.getHours() + 3);
      
      const arrivalHours = String(departureDate.getHours()).padStart(2, '0');
      const arrivalMinutes = String(departureDate.getMinutes()).padStart(2, '0');
      return `${arrivalHours}:${arrivalMinutes}`;
    } catch {
      return "13:00";
    }
  };

  // Update arrival time when departure changes
  useEffect(() => {
    setArrivalTime(calculateArrivalTime(departureTime));
  }, [departureTime]);

  // Check if driver user exists on mount
  useEffect(() => {
    const checkDriver = async () => {
      try {
        const response = await getUserById(driverId);
        console.log("Driver user found:", response.data);
      } catch (err) {
        if (err.response?.status === 404 || err.response?.status === 500) {
          console.warn("Driver user not found. Creating default driver...");
          toast.info("Creating default driver user...", { position: "top-right", autoClose: 3000 });
          
          try {
            const newUser = await registerUser({
              name: "Default Driver",
              email: `driver${Date.now()}@example.com`,
              password: "password123",
              phone: "1234567890"
            });
            setDriverId(newUser.data.id);
          } catch (createErr) {
            console.error("Failed to create default user:", createErr);
          }
        }
      }
    };
    
    checkDriver();
  }, [driverId]);

  const handlePublish = async () => {
    const priceNum = parseFloat(price);
    if (!price || isNaN(priceNum) || priceNum < 1) {
      toast.error("Please enter a valid price (minimum ₹1)");
      return;
    }

    if (!fromCity?.trim()) {
      toast.error("Please enter a source location");
      return;
    }

    if (!toCity?.trim()) {
      toast.error("Please enter a destination location");
      return;
    }

    if (fromCity.trim().toLowerCase() === toCity.trim().toLowerCase()) {
      toast.error("Source and destination cannot be the same");
      return;
    }

    if (seats < 1 || seats > 8) {
      toast.error("Seats must be between 1 and 8");
      return;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const selectedDate = new Date(date);
    selectedDate.setHours(0, 0, 0, 0);
    
    if (selectedDate < today) {
      toast.error("Please select a future date");
      return;
    }

    // ✅ UPDATED: Format both departureTime and arrivalTime
    const formatTime = (timeStr) => {
      const timeParts = timeStr.split(":");
      return `${timeParts[0]}:${timeParts[1] || "00"}:00`;
    };

    const payload = {
      source: fromCity.trim(),
      destination: toCity.trim(),
      rideDate: date.toISOString().split("T")[0],
      departureTime: formatTime(departureTime),  // ✅ NEW
      arrivalTime: formatTime(arrivalTime),      // ✅ NEW
      availableSeats: seats,
      pricePerSeat: priceNum,
      driverId: driverId
    };

    console.log("Publishing ride:", payload); // Debug log

    setLoading(true);
    try {
      const response = await createRide(payload);
      toast.success("Ride published successfully! 🚗");
      
      // Reset form
      setFromCity("");
      setToCity("");
      setDate(new Date());
      setDepartureTime("10:00");
      setArrivalTime("13:00");
      setSeats(2);
      setPrice("");
      
      setTimeout(() => {
        navigate("/search");
      }, 1500);
    } catch (err) {
      console.error("Error publishing ride:", err);
      
      let errorMessage = "Failed to publish ride";
      if (err.response) {
        const status = err.response.status;
        const data = err.response.data;
        
        if (status === 400) {
          errorMessage = data?.message || "Invalid request. Please check all fields.";
        } else if (status === 500) {
          errorMessage = "Server error. Please try again later.";
        }
      }
      
      toast.error(errorMessage, { position: "top-right", autoClose: 5000 });
    } finally {
      setLoading(false);
    }
  };

  const handleSwapLocations = () => {
    const temp = fromCity;
    setFromCity(toCity);
    setToCity(temp);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 mb-4 shadow-lg">
            <Car className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Publish Your Ride</h1>
          <p className="text-gray-600 text-lg">Share your journey and earn while you travel</p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
          <div className="p-8 md:p-10">
            <form onSubmit={(e) => { e.preventDefault(); handlePublish(); }}>
              <div className="space-y-6">
                {/* Source and Destination */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-4">
                    <MapPin className="h-5 w-5 text-blue-600" />
                    <h2 className="text-xl font-semibold text-gray-900">Route Details</h2>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="from" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
                          <span className="text-xs font-bold text-blue-600">A</span>
                        </div>
                        From
                      </Label>
                      <LocationAutocomplete
                        id="from"
                        value={fromCity}
                        onChange={setFromCity}
                        onSelect={setFromCity}
                        placeholder="Enter pickup location"
                        iconColor="blue"
                      />
                    </div>

                    <div className="hidden md:flex items-end pb-2">
                      <button
                        type="button"
                        onClick={handleSwapLocations}
                        className="w-10 h-10 rounded-full bg-gray-100 hover:bg-blue-100 border-2 border-gray-200 hover:border-blue-300 flex items-center justify-center transition-all duration-200 hover:scale-110 mx-auto"
                        aria-label="Swap locations"
                      >
                        <ArrowRight className="h-5 w-5 text-gray-600" />
                      </button>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="to" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center">
                          <span className="text-xs font-bold text-red-600">B</span>
                        </div>
                        To
                      </Label>
                      <LocationAutocomplete
                        id="to"
                        value={toCity}
                        onChange={setToCity}
                        onSelect={setToCity}
                        placeholder="Enter destination"
                        iconColor="red"
                      />
                    </div>
                  </div>

                  <div className="md:hidden flex justify-center">
                    <button
                      type="button"
                      onClick={handleSwapLocations}
                      className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <ArrowRight className="h-4 w-4" />
                      <span>Swap locations</span>
                    </button>
                  </div>
                </div>

                {/* ✅ UPDATED: Date, Departure Time, Arrival Time */}
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <CalendarDays className="h-4 w-4 text-purple-600" />
                      Date
                    </Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          type="button"
                          variant="outline"
                          className="w-full justify-start text-left font-normal h-12 bg-white hover:bg-gray-50 border-gray-300"
                        >
                          <CalendarDays className="mr-2 h-4 w-4 text-purple-600" />
                          {format(date, "EEE, dd MMM yyyy")}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={(d) => { if (d) setDate(d); }}
                          disabled={{ before: new Date() }}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="departureTime" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <Clock className="h-4 w-4 text-green-600" />
                      Departure
                    </Label>
                    <div className="relative">
                      <Input
                        id="departureTime"
                        type="time"
                        value={departureTime}
                        onChange={(e) => setDepartureTime(e.target.value)}
                        className="h-12 bg-white border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="arrivalTime" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <Clock className="h-4 w-4 text-orange-600" />
                      Arrival (auto)
                    </Label>
                    <div className="relative">
                      <Input
                        id="arrivalTime"
                        type="time"
                        value={arrivalTime}
                        onChange={(e) => setArrivalTime(e.target.value)}
                        className="h-12 bg-white border-gray-300 focus:border-blue-500 focus:ring-blue-500 bg-green-50"
                      />
                    </div>
                  </div>
                </div>

                {/* Seats and Price */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="seats" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <Users className="h-4 w-4 text-indigo-600" />
                      Available Seats
                    </Label>
                    <div className="relative">
                      <Input
                        id="seats"
                        type="number"
                        min="1"
                        max="8"
                        value={seats}
                        onChange={(e) => {
                          const val = parseInt(e.target.value) || 1;
                          setSeats(Math.max(1, Math.min(8, val)));
                        }}
                        className="h-12 bg-white border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      />
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">
                        {seats === 1 ? "seat" : "seats"}
                      </div>
                    </div>
                    <p className="text-xs text-gray-500">Maximum 8 seats</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="price" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-green-600" />
                      Price per Seat
                    </Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 font-medium">₹</span>
                      <Input
                        id="price"
                        type="text"
                        value={price}
                        onChange={handlePriceChange}
                        placeholder="100"
                        className="h-12 bg-white border-gray-300 focus:border-blue-500 focus:ring-blue-500 pl-8 pr-3"
                      />
                    </div>
                    <p className="text-xs text-gray-500">Minimum ₹1, up to ₹5000 per seat</p>
                  </div>
                </div>

                {/* ✅ UPDATED: Summary Card */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
                  <div className="flex items-center gap-2 mb-4">
                    <Sparkles className="h-5 w-5 text-blue-600" />
                    <h3 className="text-lg font-semibold text-gray-900">Ride Summary</h3>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Route:</span>
                      <span className="font-medium text-gray-900">{fromCity || "—"} → {toCity || "—"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Date:</span>
                      <span className="font-medium text-gray-900">{format(date, "dd MMM yyyy")}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Departure:</span>
                      <span className="font-medium text-gray-900">{departureTime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Arrival:</span>
                      <span className="font-medium text-gray-900">{arrivalTime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Seats:</span>
                      <span className="font-medium text-gray-900">{seats} {seats === 1 ? "seat" : "seats"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Price per seat:</span>
                      <span className="font-medium text-gray-900">₹{price || "—"}</span>
                    </div>
                    <div className="pt-2 border-t border-blue-200 flex justify-between">
                      <span className="text-gray-700 font-semibold">Total potential:</span>
                      <span className="font-bold text-blue-600 text-lg">
                        ₹{(price ? parseFloat(price) * seats : 0).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={loading || !fromCity || !toCity || !price}
                  className="w-full h-14 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Publishing Ride...</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Car className="h-5 w-5" />
                      <span>Publish Ride</span>
                    </div>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>

        {/* Help Text */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Need help? Contact support or{" "}
            <button onClick={() => navigate("/search")} className="text-blue-600 hover:text-blue-700 font-medium underline">
              browse available rides
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
