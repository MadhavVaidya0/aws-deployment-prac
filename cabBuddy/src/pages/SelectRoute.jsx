import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

const mockRoutes = [
  {
    id: 1,
    label: "5 hr 23 min - Tolls",
    subLabel: "237 km - NH 753F",
  },
  {
    id: 2,
    label: "5 hr 47 min - Tolls",
    subLabel:
      "315 km - NH60 and Hindu Hrudaysamrat Balasaheb Thackeray Maharashtra Samruddhi Mahamarg",
  },
  {
    id: 3,
    label: "7 hr - Tolls",
    subLabel: "332 km - NH 65 and NH 753F",
  },
  {
    id: 4,
    label: "6 hr 31 min - No tolls",
    subLabel: "271 km - NH 753F",
  },
];

export default function SelectRoute() {
  const [selectedId, setSelectedId] = useState(1);

  const handleContinue = () => {
    const route = mockRoutes.find((r) => r.id === selectedId);
    console.log("Selected route:", route);
    // navigate or call API here
  };

  return (
    <div className="min-h-screen flex items-start justify-center bg-white px-4 py-10">
      <div className="w-full max-w-4xl">
        {/* Title */}
        <h1 className="text-center text-4xl md:text-5xl font-bold text-[#003b46] mb-10">
          What is your route?
        </h1>

        {/* Card with scrollable list and full-width button */}
        <div className="rounded-3xl border border-slate-100 bg-white shadow-sm overflow-hidden">
          {/* Scrollable options (like Drop-off) */}
          <ScrollArea className="h-72 w-full">
            <div className="space-y-3 p-4">
              {mockRoutes.map((route) => {
                const isSelected = route.id === selectedId;
                return (
                  <button
                    key={route.id}
                    type="button"
                    onClick={() => setSelectedId(route.id)}
                    className={`w-full text-left rounded-3xl px-6 py-5 transition-colors cursor-pointer ${
                      isSelected
                        ? "bg-[#ebfbff]"
                        : "bg-white hover:bg-[#f5fbff]"
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      {/* Custom radio */}
                      <div
                        className={`mt-1 flex h-7 w-7 items-center justify-center rounded-full border-2 cursor-pointer ${
                          isSelected
                            ? "border-[#00aff5]"
                            : "border-[#cbd5e1]"
                        }`}
                      >
                        {isSelected && (
                          <div className="h-3.5 w-3.5 rounded-full bg-[#00aff5]" />
                        )}
                      </div>

                      <div>
                        <p className="text-base md:text-lg font-semibold text-[#003b46]">
                          {route.label}
                        </p>
                        <p className="mt-1 text-sm md:text-base text-[#4b5b66]">
                          {route.subLabel}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </ScrollArea>

          {/* Full-width button attached below scroll area */}
          <Button
            onClick={handleContinue}
            className="h-14 w-full rounded-none bg-[#00aff5] hover:bg-[#0092cc] text-white text-base font-semibold cursor-pointer"
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
}
