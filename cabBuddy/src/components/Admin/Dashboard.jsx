import { useState, useEffect } from "react";
import { getAdminStats } from "@/api/adminApi";
import { getAllUsers } from "@/api/userApi";
import { getAllRides } from "@/api/rideApi";
import { Users, Car, BookOpen, Loader2 } from "lucide-react";

export default function AdminDashboard() {
  const [stats, setStats] = useState({ totalUsers: 0, totalRides: 0, totalBookings: 0 });
  const [recentUsers, setRecentUsers] = useState([]);
  const [recentRides, setRecentRides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      setError(null);
      try {
        const [statsRes, usersRes, ridesRes] = await Promise.all([
          getAdminStats(),
          getAllUsers(),
          getAllRides(),
        ]);
        setStats(statsRes.data || { totalUsers: 0, totalRides: 0, totalBookings: 0 });
        setRecentUsers((usersRes.data || []).slice(0, 5));
        setRecentRides((ridesRes.data || []).slice(0, 5));
      } catch (err) {
        setError(err.response?.data?.message || err.message || "Failed to load dashboard");
      } finally {
        setLoading(false);
      }
    };
    fetch();
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
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-blue-100 p-3">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Total Users</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalUsers}</p>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-green-100 p-3">
              <Car className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Total Rides</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalRides}</p>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-purple-100 p-3">
              <BookOpen className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Total Bookings</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalBookings}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">Recent Users</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="p-3 text-left font-medium text-gray-600">Name</th>
                  <th className="p-3 text-left font-medium text-gray-600">Email</th>
                  <th className="p-3 text-left font-medium text-gray-600">Role</th>
                </tr>
              </thead>
              <tbody>
                {recentUsers.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="p-4 text-center text-gray-500">No users yet</td>
                  </tr>
                ) : (
                  recentUsers.map((u) => (
                    <tr key={u.id} className="border-b border-gray-100">
                      <td className="p-3">{u.name || "—"}</td>
                      <td className="p-3">{u.email}</td>
                      <td className="p-3">{u.role || "—"}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">Recent Rides</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="p-3 text-left font-medium text-gray-600">Driver</th>
                  <th className="p-3 text-left font-medium text-gray-600">Route</th>
                  <th className="p-3 text-left font-medium text-gray-600">Date</th>
                  <th className="p-3 text-left font-medium text-gray-600">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentRides.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="p-4 text-center text-gray-500">No rides yet</td>
                  </tr>
                ) : (
                  recentRides.map((r) => (
                    <tr key={r.id} className="border-b border-gray-100">
                      <td className="p-3">{r.driverName || "—"}</td>
                      <td className="p-3">{r.source} → {r.destination}</td>
                      <td className="p-3">{r.rideDate || "—"}</td>
                      <td className="p-3">{r.status || "—"}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
