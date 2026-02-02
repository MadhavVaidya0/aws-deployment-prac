import { CheckCircle2, XCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function VerificationRow({
  label,
  value,
  verified,
  actionLabel,
  actionRoute,
}) {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between py-3 border-b border-slate-200 last:border-0">
      <div className="flex items-center gap-3">
        {verified ? (
          <CheckCircle2 className="h-5 w-5 text-green-500" />
        ) : (
          <XCircle className="h-5 w-5 text-red-500" />
        )}

        <div>
          <p className="font-medium text-slate-800">{label}</p>
          {value && (
            <p className="text-xs text-slate-500 truncate max-w-[220px]">
              {value}
            </p>
          )}
          <p className="text-sm text-slate-500">
            {verified ? "Verified" : "Not verified yet"}
          </p>
        </div>
      </div>

      {!verified && actionRoute && (
        <button
          onClick={() => navigate(actionRoute)}
          className="text-blue-600 text-sm hover:underline"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
