import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import { LayoutDashboard, Users, Car, BookOpen, LogOut } from "lucide-react";

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const userJson = localStorage.getItem("user");
  const user = userJson ? (() => { try { return JSON.parse(userJson); } catch { return null; } })() : null;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const nav = [
    { to: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { to: "/admin/users", label: "Users", icon: Users },
    { to: "/admin/rides", label: "Rides", icon: Car },
    { to: "/admin/payments", label: "Bookings", icon: BookOpen },
  ];

  return (
    <div className="flex h-[calc(100vh-3.5rem)] bg-gray-50">
      <aside className="w-64 shrink-0 border-r border-gray-200 bg-white">
        <div className="flex h-full flex-col p-4">
          <h2 className="mb-6 px-3 text-lg font-bold text-gray-900">Admin Panel</h2>
          <nav className="flex-1 space-y-1">
            {nav.map(({ to, label, icon: Icon }) => (
              <Link
                key={to}
                to={to}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  location.pathname === to
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <Icon className="h-5 w-5" />
                {label}
              </Link>
            ))}
          </nav>
          <button
            onClick={handleLogout}
            className="mt-4 flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
          >
            <LogOut className="h-5 w-5" />
            Logout
          </button>
        </div>
      </aside>
      <main className="flex-1 overflow-auto p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            Welcome, {user?.name || "Admin"}
          </h1>
          <p className="text-sm text-gray-500">{user?.email}</p>
        </div>
        <Outlet />
      </main>
    </div>
  );
}
