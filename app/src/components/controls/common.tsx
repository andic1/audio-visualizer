import { type HTMLAttributes, type HTMLProps, type ReactNode } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useLabMode, useAppStateActions } from "@/lib/appState";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

export const ControlsContainer = ({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn(
        "pointer-events-auto flex flex-col items-center justify-center gap-4",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export const ValueLabel = ({
  label,
  value,
  className,
  ...props
}: HTMLProps<HTMLDivElement> & {
  label: string;
  value: string | number;
}) => {
  return (
    <div
      className={cn("flex w-full items-center justify-between", className)}
      {...props}
    >
      <Label>{label}</Label>
      <span className="w-12 px-2 py-0.5 text-right text-sm text-muted-foreground">
        {value}
      </span>
    </div>
  );
};

export const LabModeToggle = () => {
  const labMode = useLabMode();
  const { setLabMode } = useAppStateActions();

  const btnBase =
    "px-3 py-1 text-xs rounded-full border transition-colors whitespace-nowrap";

  return (
    <div className="flex items-center gap-2 text-xs">
      <span className="text-muted-foreground">实验模式</span>
      <div className="flex gap-1">
        <Button
          variant="ghost"
          size="sm"
          className={`${btnBase} ${
            labMode === "classic"
              ? "bg-slate-800 text-slate-50 border-slate-600"
              : "bg-transparent text-slate-400 border-slate-700"
          }`}
          onClick={() => setLabMode("classic")}
        >
          经典可视化
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className={`${btnBase} ${
            labMode === "rhythm"
              ? "bg-emerald-700 text-emerald-50 border-emerald-500"
              : "bg-transparent text-slate-400 border-slate-700"
          }`}
          onClick={() => setLabMode("rhythm")}
        >
          节奏诊断
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className={`${btnBase} ${
            labMode === "mood"
              ? "bg-fuchsia-700 text-fuchsia-50 border-fuchsia-500"
              : "bg-transparent text-slate-400 border-slate-700"
          }`}
          onClick={() => setLabMode("mood")}
        >
          情绪光场
        </Button>
      </div>
    </div>
  );
};

export const ToolbarItem = ({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn(
        "pointer-events-auto flex h-8 w-8 cursor-pointer flex-row items-center justify-center rounded-full bg-white/20 duration-300 ease-in-out hover:scale-150 hover:bg-white/50",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export const ToolbarPopover = ({
  trigger,
  ...props
}: HTMLAttributes<HTMLDivElement> & {
  trigger: ReactNode;
  align?: "start" | "end" | "center";
}) => {
  return (
    <Popover>
      <PopoverTrigger>{trigger}</PopoverTrigger>
      <PopoverContent {...props} />
    </Popover>
  );
};
