import { cn } from "@/lib/utils";

interface ProgressBarProps {
  progress: number;
  label?: string;
  className?: string;
}

export const ProgressBar = ({
  progress,
  label,
  className,
}: ProgressBarProps) => {
  if (progress <= 0) return null;

  return (
    <div className={cn("w-full", className)}>
      {label && (
        <div className="flex justify-between items-end text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 mb-3">
          <span>{label}</span>
          <span className="text-red-600">{progress}%</span>
        </div>
      )}
      <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden border border-white/5">
        <div
          className={cn(
            "h-full bg-red-600 transition-all ease-out",
            label
              ? "duration-1000 shadow-[0_0_8px_rgba(220,38,38,0.5)]"
              : "duration-500",
          )}
          style={{ width: `${progress}%` }}
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
    </div>
  );
};
