import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import api from "@/api/axiosInstance";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill all fields");
      return;
    }

    try {
      const res = await api.post("/auth/login", {
        email,
        password,
      });

      const data = res.data;

      // Store auth data
      localStorage.setItem("token", data.token);
      localStorage.setItem("authToken", data.token);
      localStorage.setItem("user", JSON.stringify(data));

      console.log("✅ LOGIN SUCCESS", data);

      // Redirect: admin → admin dashboard, else home
      if (data.role === "ADMIN") {
        navigate("/admin/dashboard", { replace: true });
      } else {
        navigate("/home", { replace: true });
      }

    } catch (err) {
      console.error("❌ Login failed:", err);
      setError(
        err.response?.data?.message ||
        "Login failed"
      );
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-4">
      <Card className="w-full max-w-md shadow-sm border border-gray-200 rounded-2xl">
        <CardContent className="p-8 space-y-6">

          <div className="text-center space-y-1">
            <h1 className="text-2xl font-bold text-gray-900">
              Welcome back 👋
            </h1>
            <p className="text-gray-500">
              Login to your CabBuddy account
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleLogin}>
            <div className="space-y-1">
              <Label>Email</Label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="space-y-1">
              <Label>Password</Label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <Button className="w-full h-12 rounded-full">
              Login
            </Button>

            {error && (
              <p className="text-red-600 text-sm text-center">
                {error}
              </p>
            )}
          </form>

          <Separator />

          <p className="text-center text-sm">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-600">
              Sign up
            </Link>
          </p>

        </CardContent>
      </Card>
    </div>
  );
}
