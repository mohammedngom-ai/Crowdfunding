"use client";
import { useRouter, useSearchParams } from "next/navigation";

const sectors = [
  { value: "", label: "Tous" },
  { value: "mine", label: "Mines" },
  { value: "carriere", label: "Carrières" },
  { value: "construction", label: "Construction" },
];

const statuses = [
  { value: "", label: "Tous" },
  { value: "open", label: "Ouvert" },
  { value: "full", label: "Complet" },
  { value: "active", label: "En cours" },
];

export default function DealsFilter({
  currentSector,
  currentStatus,
}: {
  currentSector?: string;
  currentStatus?: string;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  function update(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`/deals?${params.toString()}`);
  }

  return (
    <div className="flex flex-wrap gap-3 mb-8">
      <div className="flex gap-2 flex-wrap">
        <span className="text-xs text-slate-500 self-center">Secteur:</span>
        {sectors.map((s) => (
          <button
            key={s.value}
            onClick={() => update("sector", s.value)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
              (currentSector ?? "") === s.value
                ? "border-[#0C4693] bg-[#E6EEF4] text-[#0C4693]"
                : "border-slate-200 text-slate-500 hover:border-[#0C4693]/25 hover:text-[#0C4693]"
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>
      <div className="flex gap-2 flex-wrap">
        <span className="text-xs text-slate-500 self-center">Statut:</span>
        {statuses.map((s) => (
          <button
            key={s.value}
            onClick={() => update("status", s.value)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
              (currentStatus ?? "") === s.value
                ? "border-[#0C4693] bg-[#E6EEF4] text-[#0C4693]"
                : "border-slate-200 text-slate-500 hover:border-[#0C4693]/25 hover:text-[#0C4693]"
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>
    </div>
  );
}
