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
};

export function WaitlistCta({
  status,
  email,
  onEmailChange,
  onSubmit,
}: WaitlistCtaProps) {
  const isSubmitting = status === "submitting";
  const isSuccess = status === "success";
  const isError = status === "error";

  return (
    <div className="mx-auto w-full max-w-md">
      <form
        onSubmit={onSubmit}
        className="rounded-2xl border border-white/60 bg-white/85 p-2 shadow-sm sm:p-1.5"
      >
        <div className="flex min-h-11 flex-col gap-2 transition-all duration-500 ease-in-out sm:flex-row sm:items-center">
          <div
            className={cn(
              "overflow-hidden transition-all duration-500 ease-in-out motion-reduce:transition-none",
              isSuccess
                ? "max-h-0 max-w-0 flex-[0_0_0%] opacity-0"
                : "max-h-12 w-full flex-1 opacity-100 sm:max-w-none"
            )}
          >
            <Input
              type="email"
              placeholder={copyContent.card.emailPlaceholder}
              className="h-11 border-0 bg-transparent text-base shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
              value={email}
              onChange={(e) => onEmailChange(e.target.value)}
              required
              disabled={isSubmitting || isSuccess}
              aria-label="Email address"
              tabIndex={isSuccess ? -1 : 0}
            />
          </div>

          {isSuccess ? (
            <div
              className="pointer-events-none flex h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-grove-olive/90 px-4 text-sm font-medium text-primary-foreground motion-reduce:transition-none"
              role="status"
              aria-live="polite"
            >
              <span className="whitespace-nowrap">
                {copyContent.card.successTitle}
              </span>
              <OakTreeLottie size={28} />
            </div>
          ) : (
            <Button
              type="submit"
              disabled={isSubmitting}
              className={cn(
                "h-11 shrink-0 rounded-xl bg-primary px-5 text-sm font-medium text-primary-foreground transition-all duration-500 ease-in-out hover:bg-grove-olive-light motion-reduce:transition-none",
                "w-full sm:w-auto"
              )}
            >
              <span
                className={cn(
                  "inline-flex items-center gap-2 transition-opacity duration-300",
                  isSubmitting ? "opacity-100" : "opacity-100"
                )}
              >
                {isSubmitting
                  ? copyContent.card.submittingText
                  : copyContent.card.buttonText}
                {isSubmitting ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <ArrowRight className="h-4 w-4" />
                )}
              </span>
            </Button>
          )}
        </div>
      </form>

      {isSuccess && (
        <p className="mt-2 text-center text-sm text-muted-foreground">
          {copyContent.card.successSubtitle}
        </p>
      )}

      {isError && (
        <p className="mt-2 text-sm font-medium text-destructive" role="alert">
          {copyContent.card.errorText}
        </p>
      )}
    </div>
  );
}
