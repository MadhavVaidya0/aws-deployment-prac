import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";

// Pages
import Login from "./pages/Login";
import SignupPage from "./pages/signup";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import PublishRide from "./pages/AddRide";
import Payments from "./pages/Payments";
import Search from "./pages/Search";
import SelectRoute from "./pages/SelectRoute";
import RequestBooking from "./pages/requestbooking";
import Bookings from "./pages/Bookings";
import Logout from "./pages/Logout";
import Checkout from "@/pages/Checkout";
import PaymentFailed from "@/pages/PaymentFailed";

// Admin
import AdminLayout from "./components/Admin/AdminLayout";
import AdminDashboard from "./components/Admin/Dashboard";
import AdminUsers from "./components/Admin/User";
import AdminRides from "./components/Admin/Rides";
import AdminPayments from "./components/Admin/Payments";
// Profile verification components
import PhoneVerificationPage from "./components/profile/PhoneVerificationPage";
import EmailVerificationPage from "./components/profile/EmailVerificationPage";
import GovtIdVerificationPage from "./components/profile/GovtIdVerificationPage";
import DrivingLicenseVerificationPage from "./components/profile/DrivingLicenseVerificationPage";
import Vehicle from "./components/profile/Vehicle";

// Route Guards
import ProtectedRoute from "./routes/ProtectedRoute";
import DriverRoute from "./routes/DriverRoute";
import AdminRoute from "./routes/AdminRoute"; // new for admin

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        {/* 🔑 Public Routes */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* 🔒 Protected Routes (Any logged-in user) */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-bookings"
          element={
            <ProtectedRoute>
              <Bookings />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-payments"
          element={
            <ProtectedRoute>
              <Payments />
            </ProtectedRoute>
          }
        />
        <Route
          path="/requestbooking/:id"
          element={
            <ProtectedRoute>
              <RequestBooking />
            </ProtectedRoute>
          }
        />
        <Route
          path="/search"
          element={
            <ProtectedRoute>
              <Search />
            </ProtectedRoute>
          }
        />
        <Route
          path="/select-route"
          element={
            <ProtectedRoute>
              <SelectRoute />
            </ProtectedRoute>
          }
        />

        {/* 🚗 Driver Only */}
        <Route
          path="/publish-ride"
          element={
            <DriverRoute>
              <PublishRide />
            </DriverRoute>
          }
        />

        {/* 🛡️ Admin Only - Layout with nested routes */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }
        >
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="rides" element={<AdminRides />} />
          <Route path="payments" element={<AdminPayments />} />
        </Route>

        {/* 🔓 Logout */}
        {/* Public pages */}
        <Route path="/" element={<Home />} />
        <Route path="/logout" element={<Logout />} />

        {/* Profile + nested routes */}
        <Route path="/profile" element={<Profile />}>
          <Route path="vehicle" element={<Vehicle />} />
        </Route>

        {/* Verification pages */}
        <Route path="/verify/phone" element={<PhoneVerificationPage />} />
        <Route path="/verify/email" element={<EmailVerificationPage />} />
        <Route path="/verify/govt-id" element={<GovtIdVerificationPage />} />
        <Route path="/verify/driving-license" element={<DrivingLicenseVerificationPage />} />
        <Route path="/my-bookings" element={<Bookings />} />
         {/* ADD THIS */}
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/payment-failed" element={<PaymentFailed />} />
        <Route path="/logout" element={<Logout />} />

        {/* ❌ Fallback - show login so page is never blank */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default App;
