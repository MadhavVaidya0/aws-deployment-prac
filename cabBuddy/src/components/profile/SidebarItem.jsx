import { cn } from "@/lib/utils";

export default function SidebarItem({
  label,
  icon: Icon,
  isActive,
  onClick,
}) {
  return (
    <button
      onClick={onClick}
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "relative w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left",

        // Accessibility
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",

        // Professional motion (safe)
        "transition-colors transition-shadow duration-150 ease-out",
        "motion-reduce:transition-none",

        // Touch pop (press feedback)
        "active:bg-blue-50 active:shadow-inner",

        isActive
          ? "bg-blue-50 text-blue-700 shadow-sm"
          : "text-slate-600 hover:bg-slate-100"
      )}
    >
      {/* Active Indicator */}
      <span
        className={cn(
          "absolute left-0 top-1/2 -translate-y-1/2 h-5 w-0.5 rounded-full bg-blue-600",
          "transition-opacity duration-150 ease-out",
          "motion-reduce:transition-none",
          isActive ? "opacity-100" : "opacity-0"
        )}
      />

      {/* Icon */}
      <Icon
        className={cn(
          "w-5 h-5",
          "transition-colors duration-150 ease-out",
          "motion-reduce:transition-none",
          isActive ? "text-blue-600" : "text-slate-500"
        )}
      />

      {/* Label */}
      <span className="font-medium">{label}</span>
    </button>
  );
}
