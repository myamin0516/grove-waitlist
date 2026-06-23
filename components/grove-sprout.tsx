import { groveSproutPaths, groveSproutViewBox } from "@/lib/grove-mark";
import { cn } from "@/lib/utils";

type GroveSproutProps = {
  className?: string;
  size?: number;
};

export function GroveSprout({ className, size = 28 }: GroveSproutProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={groveSproutViewBox}
      width={size}
      height={size * 1.25}
      fill="currentColor"
      aria-hidden
      className={cn("text-grove-olive", className)}
    >
      <path d={groveSproutPaths.leafLeft} />
      <path d={groveSproutPaths.leafRight} />
      <path d={groveSproutPaths.stem} />
      <path
        d={groveSproutPaths.spiral}
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  );
}
