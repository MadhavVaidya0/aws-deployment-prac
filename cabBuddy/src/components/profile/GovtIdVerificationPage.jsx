import { useState } from "react";
import { Card } from "../../components/ui/card";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

export default function GovtIdVerificationPage() {
  const [idType, setIdType] = useState("Aadhaar Card");
  const [file, setFile] = useState(null);
  const [showToast, setShowToast] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!file) {
      toast.error("❌ Please upload a valid ID file!", {
        position: "top-right",
        autoClose: 2000,
        theme: "colored",
      });
      return;
    }

    setShowToast(true);

    setTimeout(() => {
      setShowToast(false);
      navigate("/profile", { state: { verified: { govtId: true } } });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-sky-100 flex items-center justify-center px-4">

      {showToast && (
        <div className="fixed top-6 right-6 bg-sky-500 text-white px-6 py-3 rounded-xl shadow-xl font-semibold animate-bounce z-50 border border-sky-300">
          ✅ ID Submitted Successfully for Review!
        </div>
      )}

      <Card className="w-full max-w-md p-8 space-y-6 rounded-2xl shadow-xl border-2 border-sky-300 bg-white relative overflow-hidden">
        <div className="absolute -top-16 -right-16 w-40 h-40 bg-sky-300 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute -bottom-16 -left-16 w-40 h-40 bg-blue-300 rounded-full blur-3xl opacity-30"></div>

        <div className="space-y-1 text-center relative z-10">
          <h1 className="text-2xl font-bold text-sky-700 tracking-wide">
            Upload Government ID
          </h1>
          <p className="text-sm text-slate-600 leading-relaxed">
            Upload a clear photo of your government-issued ID to verify your identity.
          </p>
        </div>

        <form className="space-y-5 relative z-10" onSubmit={handleSubmit}>
          <div>
            <label className="text-sm font-medium text-slate-700">ID Type</label>
            <select
              value={idType}
              onChange={(e) => setIdType(e.target.value)}
              className="w-full mt-1 px-4 py-2.5 border-2 border-sky-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-400 shadow-sm transition"
            >
              <option>Aadhaar Card</option>
              <option>Driving License</option>
              <option>Passport</option>
              <option>Voter ID</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700">Upload ID</label>
            <input
              type="file"
              accept="image/*,.pdf"
              onChange={(e) => setFile(e.target.files[0])}
              className="w-full mt-1 text-sm border-2 border-sky-300 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-sky-400 shadow-sm transition bg-white"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 text-white font-semibold tracking-wide hover:opacity-90 transition shadow-lg"
          >
            Submit for Review
          </button>
        </form>
      </Card>

      <ToastContainer />
    </div>
  );
}
