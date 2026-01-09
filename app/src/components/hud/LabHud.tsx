import { useMemo } from "react";
import { useLabMode, useMappers } from "@/lib/appState";

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

const getLabModeLabel = (mode: string) => {
  switch (mode) {
    case "classic":
      return "经典可视化";
    case "rhythm":
      return "节奏诊断";
    case "mood":
      return "情绪光场";
    default:
      return mode;
  }
};

export const LabHud = () => {
  const labMode = useLabMode();
  const { energyTracker } = useMappers();

  const energy = energyTracker ? energyTracker.get() : 0;
  const normalized = useMemo(() => clamp01(energy), [energy]);

  const barColor =
    labMode === "rhythm"
      ? "bg-emerald-500"
      : labMode === "mood"
        ? "bg-fuchsia-500"
        : "bg-sky-500";

  return (
    <div className="pointer-events-none absolute left-4 top-4 z-50 w-[260px] rounded-xl border border-white/10 bg-black/40 p-3 text-white backdrop-blur">
      <div className="flex items-center justify-between gap-2">
        <div className="text-xs text-white/70">实验模式</div>
        <div className="text-xs font-semibold">{getLabModeLabel(labMode)}</div>
      </div>

      <div className="mt-2">
        <div className="flex items-center justify-between text-[11px] text-white/70">
          <span>能量</span>
          <span className="tabular-nums">{normalized.toFixed(2)}</span>
        </div>
        <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-white/10">
          <div
            className={`h-full ${barColor} transition-[width] duration-100`}
            style={{ width: `${Math.round(normalized * 100)}%` }}
          />
        </div>
        <div className="mt-2 text-[11px] text-white/60">
          {labMode === "rhythm"
            ? "提示：强低频会触发更强的视觉响应"
            : labMode === "mood"
              ? "提示：整体能量影响氛围与色彩"
              : "提示：基础可视化模式"}
        </div>
      </div>
    </div>
  );
};

export default LabHud;
