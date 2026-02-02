import { useState, useEffect } from "react";
import { getAdminBookings } from "@/api/adminApi";
import { Loader2, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminPayments() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getAdminBookings();
      setBookings(res.data || []);
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Failed to load bookings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-10 w-10 animate-spin text-blue-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg bg-red-50 p-4 text-red-700">
        {error}
        <Button variant="outline" size="sm" className="mt-2" onClick={load}>
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">All Bookings</h2>
        <Button variant="outline" size="sm" onClick={load}>
          <RefreshCw className="mr-2 h-4 w-4" />
          Refresh
        </Button>
      </div>
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="p-3 text-left font-medium text-gray-600">Booking ID</th>
                <th className="p-3 text-left font-medium text-gray-600">Route</th>
                <th className="p-3 text-left font-medium text-gray-600">Seats</th>
                <th className="p-3 text-left font-medium text-gray-600">Price/Seat</th>
                <th className="p-3 text-left font-medium text-gray-600">Amount</th>
                <th className="p-3 text-left font-medium text-gray-600">Status</th>
                <th className="p-3 text-left font-medium text-gray-600">Created</th>
              </tr>
            </thead>
            <tbody>
              {bookings.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-gray-500">
                    No bookings found
                  </td>
                </tr>
              ) : (
                bookings.map((b) => {
                  const ride = b.ride || {};
                  const amount = (ride.price ?? 0) * (b.seatsBooked ?? 0);
                  return (
                    <tr key={b.bookingId} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="p-3 font-mono text-gray-500">{b.bookingId}</td>
                      <td className="p-3">
                        {ride.source} → {ride.destination}
                      </td>
                      <td className="p-3">{b.seatsBooked ?? "—"}</td>
                      <td className="p-3">₹{ride.price ?? "—"}</td>
                      <td className="p-3 font-medium">₹{amount}</td>
                      <td className="p-3">
                        <span
                          className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                            b.status === "CONFIRMED"
                              ? "bg-green-100 text-green-800"
                              : b.status === "CANCELLED"
                              ? "bg-red-100 text-red-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {b.status || "—"}
                        </span>
                      </td>
                      <td className="p-3 text-gray-500">
                        {b.createdAt
                          ? new Date(b.createdAt).toLocaleString()
                          : "—"}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
