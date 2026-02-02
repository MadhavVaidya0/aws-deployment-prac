import React from "react";
import { format } from "date-fns";

export default function AvailableRideCard({
  startTime,
  duration,
  endTime,
  from,
  to,
  price,
  rideDate,
  availableSeats = 0,  // ✅ ADDED: Seats prop with default 0
  driver = {},
}) {
  const { name = "Driver", avatar, rating = 5.0 } = driver;

  // Format date for display - handle database date format (YYYY-MM-DD)
  const formattedDate = (() => {
    if (!rideDate) return "";
    try {
      let dateToFormat;
      if (typeof rideDate === 'string') {
        if (rideDate.match(/^\d{4}-\d{2}-\d{2}/)) {
          dateToFormat = new Date(rideDate.split('T')[0] + 'T00:00:00');
        } else {
          dateToFormat = new Date(rideDate);
        }
      } else {
        dateToFormat = new Date(rideDate);
      }
      
      if (isNaN(dateToFormat.getTime())) {
        return "";
      }
      
      return format(dateToFormat, "EEE, dd MMM yyyy");
    } catch (e) {
      console.error("Error formatting date:", e, rideDate);
      return "";
    }
  })();

  return (
    <div className="max-w-3xl mx-auto bg-white border-2 border-blue-400 rounded-2xl overflow-hidden shadow-sm my-4 hover:shadow-md transition-shadow">
      {/* Date Header */}
      {formattedDate && (
        <div className="px-6 py-2 bg-blue-50 border-b border-blue-100">
          <div className="flex items-center gap-2">
            <svg className="h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="text-sm font-semibold text-blue-900">{formattedDate}</span>
          </div>
        </div>
      )}

      {/* Top Section */}
      <div className="px-6 py-4 border-b">
        <div className="flex items-center justify-between">
          <div className="flex-1 pr-6">
            <div className="flex items-center justify-between">
              {/* Start time */}
              <div className="text-left w-20">
                <div className="text-lg font-semibold text-blue-900">{startTime}</div>
                <div className="text-xs text-gray-500">{from}</div>
              </div>

              {/* TIMELINE */}
              <div className="flex-1 px-4">
                <div className="relative flex items-center h-8">
                  <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-1 bg-gray-200 rounded-full" />
                  <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-1 bg-blue-700 rounded-full" />
                  <div className="relative z-10 flex items-center justify-center w-5 h-5 rounded-full bg-white border-2 border-blue-700">
                    <div className="w-2.5 h-2.5 rounded-full bg-white" />
                  </div>
                  <div className="ml-auto relative z-10 flex items-center justify-center w-5 h-5 rounded-full bg-white border-2 border-blue-700">
                    <div className="w-2.5 h-2.5 rounded-full bg-white" />
                  </div>
                  <div className="absolute left-1/2 -translate-x-1/2 -top-3 text-xs text-gray-600 font-medium">
                    {duration}
                  </div>
                </div>
              </div>

              {/* End time */}
              <div className="text-right w-20">
                <div className="text-lg font-semibold text-blue-900">{endTime}</div>
                <div className="text-xs text-gray-500">{to}</div>
              </div>
            </div>
          </div>

          {/* Price */}
          <div className="ml-6 text-right w-28">
            <div className="text-2xl font-bold text-blue-900">₹{price}</div>
            <div className="text-xs text-gray-400">00</div>
          </div>
        </div>
      </div>

      {/* ✅ NEW SEATS SECTION */}
      <div className="px-6 py-3 border-b bg-blue-25">
        <div className="flex items-center justify-between">
          {/* Seats Info */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-4 py-2 bg-blue-100 rounded-xl">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
              </svg>
              <div>
                <div className="font-semibold text-blue-900 text-sm">{availableSeats}</div>
                <div className="text-xs text-blue-700">
                  {availableSeats === 1 ? "seat available" : "seats available"}
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="text-right text-xs text-gray-500">
            {availableSeats > 0 ? "Book now" : "Full"}
          </div>
        </div>
      </div>

      {/* Driver Section */}
      <div className="px-6 py-3 flex items-center gap-4">
        {/* Car Icon */}
        <div className="flex-shrink-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-8 h-8 text-blue-600"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M3 13l1.5-4.5A2 2 0 016.3 7h11.4a2 2 0 011.8 1.5L21 13" />
            <path d="M5 17a1 1 0 100-2 1 1 0 000 2zm14 0a1 1 0 100-2 1 1 0 000 2z" />
            <path d="M7 13v3M17 13v3" />
          </svg>
        </div>

        {/* Driver Avatar + Info */}
        <div className="flex items-center gap-3 flex-1">
          <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-white shadow-sm">
            {avatar ? (
              <img src={avatar} alt={name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">
                <span className="text-sm">DP</span>
              </div>
            )}
          </div>

          <div className="flex-1">
            <div className="text-sm font-semibold text-gray-800 flex items-center gap-2">
              <span>{name}</span>
              <span className="text-xs text-blue-600">✔︎</span>
              <span className="text-xs text-gray-500">★ {rating.toFixed(1)}</span>
            </div>
          </div>
        </div>

        <div className="w-8" />
      </div>
    </div>
  );
}
