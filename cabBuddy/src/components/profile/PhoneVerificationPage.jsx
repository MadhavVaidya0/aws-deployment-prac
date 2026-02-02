import { useState, useEffect } from "react";
import { Card } from "../../components/ui/card";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useLocation } from "react-router-dom";

export default function PhoneVerificationPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const [phone, setPhone] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  /* --------------------------------------------------
     LOAD PHONE + VERIFICATION (AUTO SYNC, NO REFRESH)
  -------------------------------------------------- */
  useEffect(() => {
    // ✅ 1. Highest priority: phone from navigation (Profile → Verify)
    if (location.state?.phone) {
      setPhone(location.state.phone);
      setIsVerified(false);
      return;
    }

    // ✅ 2. Fallback: localStorage
    const savedProfile =
      JSON.parse(localStorage.getItem("profileData")) || {};

    if (savedProfile.phone) {
      setPhone(savedProfile.phone);
    }

    if (savedProfile.phoneVerified) {
      setIsVerified(true);
    }
  }, [location.state]);

  /* SEND OTP */
  const handleSendOtp = (e) => {
    e.preventDefault();
    if (!phone) return;

    setOtpSent(true);
    toast.success("📩 OTP Sent Successfully!", {
      position: "top-right",
      autoClose: 2000,
      theme: "colored",
    });
  };

  /* VERIFY OTP */
  const handleVerifyOtp = (e) => {
    e.preventDefault();

    if (otp === "1234") {
      setShowToast(true);
      setIsVerified(true);

      const existingProfile =
        JSON.parse(localStorage.getItem("profileData")) || {};

      localStorage.setItem(
        "profileData",
        JSON.stringify({
          ...existingProfile,
          phone,
          phoneVerified: true,
        })
      );

      setTimeout(() => {
        setShowToast(false);
        navigate("/profile", {
          state: { verified: { phone: true } },
        });
      }, 1500);
    } else {
      toast.error("❌ Wrong OTP, please try again!", {
        position: "top-right",
        autoClose: 2000,
        theme: "colored",
      });
    }
  };

  /* RESEND OTP */
  const handleResendOtp = () => {
    toast.info("🔄 OTP Resent Successfully!", {
      position: "top-right",
      autoClose: 2000,
      theme: "colored",
    });
  };

  /* EDIT PHONE */
  const handleEditPhone = () => {
    setIsVerified(false);
    setOtpSent(false);
    setOtp("");

    const existingProfile =
      JSON.parse(localStorage.getItem("profileData")) || {};

    localStorage.setItem(
      "profileData",
      JSON.stringify({
        ...existingProfile,
        phoneVerified: false,
      })
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-sky-100 flex items-center justify-center px-4">

      {showToast && (
        <div className="fixed top-6 right-6 bg-sky-500 text-white px-6 py-3 rounded-xl shadow-xl font-semibold animate-bounce z-50 border border-sky-300">
          ✅ OTP Verified Successfully!
        </div>
      )}

      <Card className="w-full max-w-md p-8 space-y-6 rounded-2xl shadow-xl border-2 border-sky-300 bg-white relative overflow-hidden">

        <div className="absolute -top-16 -right-16 w-40 h-40 bg-sky-300 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute -bottom-16 -left-16 w-40 h-40 bg-blue-300 rounded-full blur-3xl opacity-30"></div>

        <div className="space-y-1 text-center relative z-10">
          <h1 className="text-2xl font-bold text-sky-700 tracking-wide">
            Verify Your Mobile Number
          </h1>
          <p className="text-sm text-slate-600">
            Secure OTP verification
          </p>
        </div>

        {/* ✅ VERIFIED STATE */}
        {isVerified && (
          <div className="text-center space-y-3">
            <p className="text-green-600 font-semibold">
              ✅ {phone} Verified
            </p>
            <button
              onClick={handleEditPhone}
              className="text-sky-600 font-semibold hover:underline"
            >
              Edit Phone Number
            </button>
          </div>
        )}

        {/* SEND OTP */}
        {!otpSent && !isVerified && (
          <form className="space-y-5" onSubmit={handleSendOtp}>
            <div>
              <label className="text-sm font-medium text-slate-700">
                Phone Number
              </label>
              <input
                type="tel"
                maxLength="10"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full mt-1 px-4 py-2.5 border-2 border-sky-300 rounded-xl"
                placeholder="7666800427"
              />
            </div>

            <button className="w-full py-3 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 text-white font-semibold">
              Send OTP
            </button>
          </form>
        )}

        {/* VERIFY OTP */}
        {otpSent && !isVerified && (
          <form className="space-y-5" onSubmit={handleVerifyOtp}>
            <div>
              <label className="text-sm font-medium text-slate-700">
                Enter OTP
              </label>
              <input
                type="text"
                maxLength="4"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full mt-1 px-4 py-2.5 text-center tracking-widest text-lg font-bold border-2 border-sky-300 rounded-xl"
                placeholder="****"
              />
            </div>

            <button className="w-full py-3 rounded-xl bg-gradient-to-r from-sky-400 to-sky-600 text-white font-semibold">
              Verify OTP
            </button>

            <button
              type="button"
              onClick={handleResendOtp}
              className="w-full py-2 text-sky-600 font-semibold hover:underline"
            >
              Resend OTP
            </button>
          </form>
        )}

        <p className="text-xs text-center text-slate-500 pt-2">
          By continuing, you agree to receive automated messages.
        </p>
      </Card>

      <ToastContainer />
    </div>
  );
}
