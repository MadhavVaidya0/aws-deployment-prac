import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import emptyRatingsImg from "./ratings_empty_state-ea73cfd242a65e49.jpg";

export default function ProfileRatings() {
  const [activeTab, setActiveTab] = useState("received");

  return (
    <Card className="px-6 py-8 mt-6 rounded-2xl border border-slate-200 bg-white shadow-md">

      <h2 className="text-2xl font-semibold text-slate-900 text-center mb-6">
        Ratings
      </h2>

      <div className="flex justify-center gap-10 border-b mb-10">
        <button
          onClick={() => setActiveTab("received")}
          className={`pb-3 text-sm font-medium transition ${
            activeTab === "received"
              ? "text-slate-900 border-b-2 border-slate-900"
              : "text-slate-400"
          }`}
        >
          Received
        </button>

        <button
          onClick={() => setActiveTab("given")}
          className={`pb-3 text-sm font-medium transition ${
            activeTab === "given"
              ? "text-slate-900 border-b-2 border-slate-900"
              : "text-slate-400"
          }`}
        >
          Given
        </button>
      </div>

      <div className="flex flex-col items-center justify-center text-center gap-6 py-10">
        <img
          src={emptyRatingsImg}
          alt="No ratings"
          className="w-48 opacity-90"
        />

        {activeTab === "received" ? (
          <p className="text-xl font-semibold text-slate-700">
            You haven't received any ratings yet.
          </p>
        ) : (
          <p className="text-xl font-semibold text-slate-700">
            You haven't given any ratings yet.
          </p>
        )}
      </div>
    </Card>
  );
}
