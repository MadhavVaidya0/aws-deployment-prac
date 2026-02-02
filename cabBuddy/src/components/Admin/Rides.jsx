import { useState, useEffect } from "react";
import { getAllRides, cancelRide } from "@/api/rideApi";
import { Loader2, RefreshCw, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";

export default function AdminRides() {
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getAllRides();
      setRides(res.data || []);
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Failed to load rides");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleCancel = async (rideId) => {
    if (!window.confirm("Cancel this ride? Bookings may be affected.")) return;
    try {
      await cancelRide(rideId);
      setRides((prev) =>
        prev.map((r) => (r.id === rideId ? { ...r, status: "CANCELLED" } : r))
      );
      toast.success("Ride cancelled");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to cancel ride");
    }
  };

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
        <h2 className="text-2xl font-bold text-gray-900">All Rides</h2>
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
                <th className="p-3 text-left font-medium text-gray-600">ID</th>
                <th className="p-3 text-left font-medium text-gray-600">Driver</th>
                <th className="p-3 text-left font-medium text-gray-600">Source</th>
                <th className="p-3 text-left font-medium text-gray-600">Destination</th>
                <th className="p-3 text-left font-medium text-gray-600">Date</th>
                <th className="p-3 text-left font-medium text-gray-600">Time</th>
                <th className="p-3 text-left font-medium text-gray-600">Seats</th>
                <th className="p-3 text-left font-medium text-gray-600">Price</th>
                <th className="p-3 text-left font-medium text-gray-600">Status</th>
                <th className="p-3 text-left font-medium text-gray-600">Action</th>
              </tr>
            </thead>
            <tbody>
              {rides.length === 0 ? (
                <tr>
                  <td colSpan={10} className="p-8 text-center text-gray-500">
                    No rides found
                  </td>
                </tr>
              ) : (
                rides.map((r) => (
                  <tr key={r.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="p-3 font-mono text-gray-500">{r.id}</td>
                    <td className="p-3">{r.driverName || "—"}</td>
                    <td className="p-3">{r.source}</td>
                    <td className="p-3">{r.destination}</td>
                    <td className="p-3">{r.rideDate || "—"}</td>
                    <td className="p-3">{r.departureTime ?? r.rideTime ?? "—"}</td>
                    <td className="p-3">{r.availableSeats ?? "—"}</td>
                    <td className="p-3">₹{r.pricePerSeat ?? "—"}</td>
                    <td className="p-3">
                      <span
                        className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                          r.status === "ACTIVE"
                            ? "bg-green-100 text-green-800"
                            : r.status === "CANCELLED"
                            ? "bg-red-100 text-red-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {r.status || "—"}
                      </span>
                    </td>
                    <td className="p-3">
                      {r.status === "ACTIVE" && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-red-600 hover:bg-red-50"
                          onClick={() => handleCancel(r.id)}
                        >
                          <XCircle className="h-4 w-4" />
                        </Button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
