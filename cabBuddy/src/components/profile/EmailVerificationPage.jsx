import { useState, useEffect } from "react";
import { Card } from "../../components/ui/card";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

export default function EmailVerificationPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  /* ✅ LOAD SAVED EMAIL VERIFICATION */
  useEffect(() => {
    const savedProfile = JSON.parse(localStorage.getItem("profileData"));
    if (savedProfile?.emailVerified) {
      setEmail(savedProfile.email);
      setIsVerified(true);
    }
  }, []);

  const handleSendEmail = (e) => {
    e.preventDefault();
    if (!email) return;

    setOtpSent(true);

    toast.info("📩 Verification Email Sent!", {
      position: "top-right",
      autoClose: 2000,
      theme: "colored",
    });
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();

    if (otp === "12345") {
      setShowToast(true);
      setIsVerified(true);

      /* ✅ SAVE EMAIL VERIFICATION PERMANENTLY */
      const existingProfile =
        JSON.parse(localStorage.getItem("profileData")) || {};

      localStorage.setItem(
        "profileData",
        JSON.stringify({
          ...existingProfile,
          email,
          emailVerified: true, // ✅ stays forever
        })
      );

      setTimeout(() => {
        setShowToast(false);

        navigate("/profile", {
          state: {
            verified: { email: true },
            email,
          },
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

  /* ✅ EDIT EMAIL */
  const handleEditEmail = () => {
    setIsVerified(false);
    setOtpSent(false);
    setOtp("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-sky-100 flex items-center justify-center px-4">
      {showToast && (
        <div className="fixed top-6 right-6 bg-sky-500 text-white px-6 py-3 rounded-xl shadow-xl font-semibold animate-bounce z-50 border border-sky-300">
          ✅ Email Verified Successfully!
        </div>
      )}

      <Card className="w-full max-w-md p-8 space-y-6 rounded-2xl shadow-xl border-2 border-sky-300 bg-white relative overflow-hidden">
        <div className="absolute -top-16 -right-16 w-40 h-40 bg-sky-300 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute -bottom-16 -left-16 w-40 h-40 bg-blue-300 rounded-full blur-3xl opacity-30"></div>

        <div className="space-y-1 text-center relative z-10">
          <h1 className="text-2xl font-bold text-sky-700 tracking-wide">
            Verify Your Email
          </h1>
          <p className="text-sm text-slate-600">
            Secure email verification
          </p>
        </div>

        {/* ✅ VERIFIED STATE */}
        {isVerified && (
          <div className="text-center space-y-3">
            <p className="text-green-600 font-semibold">
              ✅ {email} Verified
            </p>
            <button
              onClick={handleEditEmail}
              className="text-sky-600 font-semibold hover:underline"
            >
              Edit Email Address
            </button>
          </div>
        )}

        {/* SEND EMAIL */}
        {!otpSent && !isVerified && (
          <form className="space-y-5 relative z-10" onSubmit={handleSendEmail}>
            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-700">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mt-1 px-4 py-2.5 border-2 border-sky-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-400 shadow-sm"
                placeholder="nikhil@example.com"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 text-white font-semibold tracking-wide hover:opacity-90 transition shadow-lg"
            >
              Send Verification Code
            </button>
          </form>
        )}

        {/* VERIFY OTP */}
        {otpSent && !isVerified && (
          <form className="space-y-5 relative z-10" onSubmit={handleVerifyOtp}>
            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-700">
                Enter OTP
              </label>
              <input
                type="text"
                maxLength="5"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full mt-1 px-4 py-2.5 text-center tracking-widest text-lg font-bold border-2 border-sky-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-400 shadow-sm"
                placeholder="*****"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-sky-400 to-sky-600 text-white font-semibold tracking-wide hover:opacity-90 transition shadow-lg"
            >
              Verify Email
            </button>

            <button
              type="button"
              onClick={() =>
                toast.info("🔄 Verification Code Resent!", {
                  position: "top-right",
                  autoClose: 2000,
                  theme: "colored",
                })
              }
              className="w-full mt-2 py-2 rounded-xl text-sky-600 font-semibold hover:underline"
            >
              Resend Code
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
