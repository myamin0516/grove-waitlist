"use client";

import { cn } from "@/lib/utils";

/*
 * Frame: phone-frame-final.png (324x678), no Dynamic Island cutout.
 * Transparent screen hole at left 4.32%, top 1.92%, width 91.05%, height 96.46%.
 * The video sits under the frame and shows through the hole; the opaque
 * bezel masks its edges, so the video itself stays rectangular.
 */
export function PhoneDemo({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative aspect-[324/678] w-auto shrink-0",
        "drop-shadow-[0_18px_40px_rgba(82,98,60,0.18)]",
        className
      )}
      aria-hidden
    >
      <video
        src="/images/app-demo-swiping-final-web.mp4"
        className="absolute left-[4.32%] top-[1.92%] z-0 h-[96.46%] w-[91.05%] rounded-[22px] object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      />
      <img
        src="/images/phone-frame-final.png"
        alt=""
        className="pointer-events-none absolute inset-0 z-10 h-full w-full select-none"
        draggable={false}
      />
    </div>
  );
}
