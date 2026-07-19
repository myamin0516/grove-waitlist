"use client";

import { OakTreeLottie } from "@/components/oak-tree-lottie";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import copyContent from "@/data/copy.json";
import { ArrowRight, Loader2 } from "lucide-react";
import { FormEvent } from "react";

export type WaitlistStatus = "idle" | "submitting" | "success" | "error";

type WaitlistCtaProps = {
  status: WaitlistStatus;
  email: string;
  onEmailChange: (value: string) => void;
  onSubmit: (e: FormEvent) => void;
  className?: string;
};

export function WaitlistCta({
  status,
  email,
  onEmailChange,
  onSubmit,
  className,
}: WaitlistCtaProps) {
  const isSubmitting = status === "submitting";
  const isSuccess = status === "success";
  const isError = status === "error";

  return (
    <div className={cn("w-full max-w-md", className)}>
      <form
        onSubmit={onSubmit}
        className="rounded-2xl border border-white/60 bg-white/85 p-2 shadow-sm sm:p-1.5"
      >
        <div className="flex min-h-11 flex-col gap-2 sm:flex-row sm:items-center">
          <div className="relative min-h-11 w-full flex-1">
            <Input
              type="email"
              placeholder={copyContent.card.emailPlaceholder}
              className={cn(
                "h-11 border-0 bg-transparent text-base shadow-none transition-opacity duration-500 focus-visible:ring-0 focus-visible:ring-offset-0 motion-reduce:transition-none",
                isSuccess && "pointer-events-none opacity-0 disabled:opacity-0"
              )}
              value={email}
              onChange={(e) => onEmailChange(e.target.value)}
              required
              disabled={isSubmitting || isSuccess}
              aria-label="Email address"
              tabIndex={isSuccess ? -1 : 0}
            />
            <span
              role="status"
              aria-live="polite"
              className={cn(
                "absolute inset-0 flex items-center px-3 text-sm text-muted-foreground transition-opacity duration-500 motion-reduce:transition-none",
                isSuccess ? "opacity-100" : "pointer-events-none opacity-0"
              )}
            >
              {copyContent.card.successSubtitle}
            </span>
          </div>

          <Button
            type="submit"
            disabled={isSubmitting || isSuccess}
            className={cn(
              "h-11 shrink-0 rounded-xl bg-primary px-5 text-sm font-medium text-primary-foreground transition-colors duration-300 hover:bg-grove-olive-light motion-reduce:transition-none",
              "w-full sm:w-auto",
              isSuccess && "pointer-events-none disabled:opacity-100"
            )}
          >
            <span className="inline-flex items-center gap-2">
              {isSuccess
                ? copyContent.card.successTitle
                : isSubmitting
                  ? copyContent.card.submittingText
                  : copyContent.card.buttonText}
              {isSuccess ? (
                <OakTreeLottie size={24} />
              ) : isSubmitting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <ArrowRight className="h-4 w-4" />
              )}
            </span>
          </Button>
        </div>
      </form>

      {isError && (
        <p className="mt-2 text-sm font-medium text-destructive" role="alert">
          {copyContent.card.errorText}
        </p>
      )}
    </div>
  );
}
