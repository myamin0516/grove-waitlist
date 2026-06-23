"use client";

import oakTreeAnimation from "@/app/animations/oak-tree.json";
import Lottie from "lottie-react";

type OakTreeLottieProps = {
  className?: string;
  size?: number;
};

export function OakTreeLottie({ className, size = 30 }: OakTreeLottieProps) {
  return (
    <Lottie
      animationData={oakTreeAnimation}
      loop
      autoplay
      aria-hidden
      className={className}
      style={{ width: size, height: size }}
    />
  );
}
