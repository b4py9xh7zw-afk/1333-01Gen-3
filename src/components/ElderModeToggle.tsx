import { User, UserRound } from "lucide-react";
import { useLoginStore } from "@/store/useLoginStore";

export default function ElderModeToggle() {
  const { elderMode, toggleElderMode } = useLoginStore();

  return (
    <button
      onClick={toggleElderMode}
      className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${
        elderMode
          ? "bg-warm-50 text-warm-600 border-2 border-warm-500 shadow-md"
          : "bg-gray-50 text-gray-600 border-2 border-transparent hover:bg-gray-100"
      }`}
    >
      {elderMode ? (
        <>
          <UserRound className="w-5 h-5" strokeWidth={2} />
          <span className="text-sm font-medium">长辈模式</span>
        </>
      ) : (
        <>
          <User className="w-4 h-4" strokeWidth={2} />
          <span className="text-sm">长辈模式</span>
        </>
      )}
    </button>
  );
}
