"use client";

import { WaitlistCta } from "@/components/waitlist-cta";
import copyContent from "../data/copy.json";
import Image from "next/image";
import { FormEvent, useState } from "react";

export default function WaitlistPage() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">(
    "idle"
  );

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch(copyContent.config.webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setEmail("");
      } else {
        setSubmitStatus("error");
      }
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  }

  const ctaStatus = isSubmitting
    ? "submitting"
    : submitStatus === "success"
      ? "success"
      : submitStatus === "error"
        ? "error"
        : "idle";

  return (
    <div className="relative h-dvh overflow-hidden">
      {/* Base gradients — cream top-left, sage bottom-right */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#f7f4ec] via-[#e8efe2] to-[#c8d8b8]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-[#b8c9a8]/20 via-transparent to-[#faf8f4]/50"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_15%_10%,#f5f0e6_0%,transparent_55%),radial-gradient(ellipse_at_85%_90%,#a8b89a_0%,transparent_50%)] opacity-65"
      />

      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -left-[18%] -top-[12%] h-[62%] w-[62%] rounded-full bg-[#f0ebe3]/60 blur-[110px]" />
        <div className="absolute -right-[10%] -top-[6%] h-[50%] w-[54%] rounded-full bg-[#e8efe4]/55 blur-[95px]" />
        <div className="absolute -bottom-[12%] -right-[6%] h-[54%] w-[58%] rounded-full bg-[#9bb08a]/45 blur-[115px]" />
        <div className="absolute -bottom-[8%] -left-[12%] h-[44%] w-[50%] rounded-full bg-[#d0dcc4]/55 blur-[90px]" />
        <div className="absolute left-[20%] top-[30%] h-[38%] w-[42%] rounded-full bg-[#f2ece3]/40 blur-[100px]" />
        <div className="absolute right-[10%] top-[50%] h-[35%] w-[40%] rounded-full bg-[#b5c9a5]/35 blur-[85px]" />
      </div>

      <div className="relative flex h-full items-center justify-center px-8 py-4 sm:px-12">
        <div className="grove-glass flex w-full flex-col gap-4 overflow-hidden px-6 py-5 text-center sm:gap-5 sm:px-8 sm:py-6">
          <header className="flex flex-col items-center gap-2.5">
            <Image
              src="/images/Grove-01.png"
              alt=""
              width={80}
              height={80}
              className="h-16 w-16 rounded-2xl sm:h-[4.5rem] sm:w-[4.5rem]"
              priority
            />
            <div className="space-y-1">
              <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
                {copyContent.brand.name}
              </h1>
              <p className="text-sm tracking-wide text-grove-olive sm:text-base">
                {copyContent.brand.tagline}
              </p>
            </div>
          </header>

          <div className="mx-auto flex flex-col gap-2">
            <h2 className="whitespace-nowrap text-[0.8125rem] font-semibold leading-snug tracking-tight text-foreground sm:text-2xl sm:leading-tight">
              {copyContent.hero.headline}
            </h2>
            <p className="mx-auto max-w-md text-sm leading-relaxed text-muted-foreground sm:text-[0.9375rem]">
              {copyContent.hero.subheading}
            </p>
          </div>

          <WaitlistCta
            status={ctaStatus}
            email={email}
            onEmailChange={setEmail}
            onSubmit={handleSubmit}
          />

          <blockquote className="mx-auto max-w-md border-l border-grove-olive/25 py-0 pl-3.5 text-left">
            <p className="text-[0.6875rem] italic leading-relaxed text-muted-foreground/75 sm:text-xs">
              &ldquo;{copyContent.quote.text}&rdquo;
            </p>
            <footer className="mt-1 text-[0.6875rem] text-muted-foreground/60">
              — {copyContent.quote.author}
            </footer>
          </blockquote>

          <p className="mt-1 text-sm font-medium text-muted-foreground sm:text-base">
            · {copyContent.brand.badge.replace(/^Grove is /i, "")}
          </p>
          <footer className="text-xs text-muted-foreground">
            {copyContent.footerText}
          </footer>
        </div>
      </div>
    </div>
  );
}
