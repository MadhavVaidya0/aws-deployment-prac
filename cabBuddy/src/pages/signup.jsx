import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axiosInstance";

// UI Components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";

export default function Signup() {
  const navigate = useNavigate();

  // FORM STATE
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // ERROR STATE
  const [errors, setErrors] = useState({});

  // ✅ FIXED SUBMIT HANDLER
  async function handleSignup(e) {
    e.preventDefault();

    let err = {};

    if (!fullname) err.fullname = "Name required";
    if (!email) err.email = "Email required";
    if (!role) err.role = "Role required";

    if (email && !email.includes("@")) {
      err.email = "Enter a valid email";
    }

    if (!phone) {
      err.phone = "Phone required";
    } else if (phone.length !== 10) {
      err.phone = "Phone number must be 10 digits";
    } else if (!/^[6-9]\d{9}$/.test(phone)) {
      err.phone = "Enter a valid Indian phone number";
    }

    if (password && password.length < 8) {
      err.password = "Password must be at least 8 characters";
    }

    if (password !== confirmPassword) {
      err.passwordMatch = "Password and confirm password should be same";
    }

    if (Object.keys(err).length > 0) {
      setErrors(err);
      return;
    }

    const signupData = {
      name: fullname,
      email,
      password,
      phone,
      role,
    };

    try {
      const res = await api.post("/auth/register", signupData);

      console.log("Signup successful:", res.data);
      alert("Signup successful");
      navigate("/login");

    } catch (error) {
      console.error("Signup error:", error);
      alert(error.response?.data?.message || "Signup failed");
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-4">
      <Card className="w-full max-w-md rounded-2xl border shadow-sm">
        <CardContent className="p-8 space-y-6">

          <div className="text-center space-y-1">
            <h1 className="text-2xl font-bold">Create an account ✨</h1>
            <p className="text-gray-500">Sign up to continue with CabBuddy</p>
          </div>

          <form className="space-y-4" onSubmit={handleSignup}>

            <div>
              <Label className="mb-2">Full Name</Label>
              <Input
                value={fullname}
                placeholder="John Doe"
                onChange={(e) => {
                  setFullname(e.target.value);
                  setErrors({ ...errors, fullname: "" });
                }}
                className={errors.fullname ? "border-red-500" : ""}
              />
              {errors.fullname && <p className="text-red-500 text-xs">{errors.fullname}</p>}
            </div>

            <div>
              <Label className="mb-2">Email</Label>
              <Input
                type="email"
                value={email}
                placeholder="john@example.com"
                onChange={(e) => {
                  setEmail(e.target.value);
                  setErrors({ ...errors, email: "" });
                }}
                className={errors.email ? "border-red-500" : ""}
              />
              {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="mb-2">Phone Number</Label>
                <Input
                  value={phone}
                  placeholder="9876543210"
                  onChange={(e) => {
                    setPhone(e.target.value);
                    setErrors({ ...errors, phone: "" });
                  }}
                  className={errors.phone ? "border-red-500" : ""}
                />
                {errors.phone && <p className="text-red-500 text-xs">{errors.phone}</p>}
              </div>

              <div>
                <Label className="mb-2">Role</Label>
                <select
                  value={role}
                  onChange={(e) => {
                    setRole(e.target.value);
                    setErrors({ ...errors, role: "" });
                  }}
                  className={`w-full rounded-lg border px-3 py-2 ${errors.role ? "border-red-500" : ""}`}
                >
                  <option value="">Select role</option>
                  <option value="USER">User</option>
                  <option value="ADMIN">Admin</option>
                  <option value="DRIVER">Driver</option>
                </select>
                {errors.role && <p className="text-red-500 text-xs">{errors.role}</p>}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="mb-2">Password</Label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setErrors({ ...errors, passwordMatch: "" });
                  }}
                />
              </div>

              <div>
                <Label className="mb-2">Confirm Password</Label>
                <Input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    setErrors({ ...errors, passwordMatch: "" });
                  }}
                />
              </div>
            </div>

            {errors.passwordMatch && (
              <p className="text-red-500 text-xs">{errors.passwordMatch}</p>
            )}

            <Button type="submit" className="w-full h-12 rounded-full bg-[#4285F4] hover:bg-[#357AE8]">
              Sign Up
            </Button>
          </form>

          <Separator />

          <div className="text-center text-sm text-gray-500">Or continue with</div>

          <Button
            type="button"
            className="w-full h-12 rounded-full bg-[#4285F4] hover:bg-[#357AE8]"
            onClick={() => console.log("Google signup clicked")}
          >
            Sign up with Google
          </Button>

          <p className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:underline">Login</Link>
          </p>

        </CardContent>
      </Card>
    </div>
  );
}

