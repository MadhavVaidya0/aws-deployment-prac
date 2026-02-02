import { useState } from "react";
import { Card } from "../../components/ui/card";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

export default function DrivingLicenseVerificationPage() {
  const [licenseNumber, setLicenseNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [file, setFile] = useState(null);
  const [showToast, setShowToast] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!licenseNumber || !expiryDate || !file) {
      toast.error("❌ Please fill all fields and upload license photo!", {
        position: "top-right",
        autoClose: 2000,
        theme: "colored",
      });
      return;
    }

    const clean = licenseNumber.replace(/[^A-Za-z0-9]/g, "");
    if (clean.length !== 16) {
      toast.error("❌ License number must be exactly 16 characters!", {
        position: "top-right",
        autoClose: 2000,
        theme: "colored",
      });
      return;
    }

    setShowToast(true);

    setTimeout(() => {
      setShowToast(false);
      navigate("/profile", { state: { verified: { drivingLicense: true } } });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-sky-100 flex items-center justify-center px-4">

      {showToast && (
        <div className="fixed top-6 right-6 bg-sky-500 text-white px-6 py-3 rounded-xl shadow-xl font-semibold animate-bounce z-50 border border-sky-300">
          ✅ Driving License Submitted Successfully!
        </div>
      )}

      <Card className="w-full max-w-md p-8 space-y-6 rounded-2xl shadow-xl border-2 border-sky-300 bg-white relative overflow-hidden">
        <div className="absolute -top-16 -right-16 w-40 h-40 bg-sky-300 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute -bottom-16 -left-16 w-40 h-40 bg-blue-300 rounded-full blur-3xl opacity-30"></div>

        <div className="text-center relative z-10 space-y-1">
          <h1 className="text-2xl font-bold text-sky-700 tracking-wide">
            Add Your Driving License
          </h1>
          <p className="text-sm text-slate-600">
            Add your license details to become eligible for driving on CabBuddy.
          </p>
        </div>

        <form className="space-y-5 relative z-10" onSubmit={handleSubmit}>
          <div>
            <label className="text-sm font-medium text-slate-700">
              License Number
            </label>
            <input
              type="text"
              value={licenseNumber}
              onChange={(e) => {
                const val = e.target.value.replace(/[^A-Za-z0-9]/g, "");
                if (val.length <= 16) setLicenseNumber(val);
              }}
              className="w-full mt-1 px-4 py-2.5 border-2 border-sky-300 rounded-xl
                focus:outline-none focus:ring-2 focus:ring-sky-400 shadow-sm transition"
              placeholder="DL-XXXXXXXXXXXXXX"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700">
              Expiry Date
            </label>
            <input
              type="date"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              className="w-full mt-1 px-4 py-2.5 border-2 border-sky-300 rounded-xl
                focus:outline-none focus:ring-2 focus:ring-sky-400 shadow-sm transition"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700">
              Upload License Photo
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files[0])}
              className="w-full mt-1 px-4 py-2.5 border-2 border-sky-300 rounded-xl bg-white
                text-sm focus:outline-none focus:ring-2 focus:ring-sky-400 shadow-sm transition"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600
              text-white font-semibold tracking-wide hover:opacity-90 transition shadow-lg"
          >
            Save & Submit
          </button>
        </form>
      </Card>

      <ToastContainer />
    </div>
  );
}
