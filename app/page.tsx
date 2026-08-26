"use client";

import { PhoneDemo } from "@/components/phone-demo";
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

      <div className="relative flex h-full items-center justify-center px-5 py-4 sm:px-8 md:px-10">
        <div className="grove-glass flex h-full w-full items-center justify-center overflow-hidden px-5 py-5 sm:px-8 sm:py-6 md:px-10 md:py-8">
          {/* Centered cluster: copy + phone as one unit */}
          <div className="mx-auto flex h-full w-full max-w-5xl flex-col items-center justify-center gap-5 sm:gap-6 md:h-auto md:flex-row md:items-center md:gap-10 lg:max-w-6xl lg:gap-12">
            {/* Left: brand → headline → sub → CTA → footer */}
            <div className="flex w-full min-w-0 flex-col items-center gap-4 text-center sm:gap-5 md:max-w-xl md:flex-1 md:items-start md:justify-center md:gap-6 md:text-left">
              <header className="flex flex-col items-center gap-2 md:flex-row md:items-center md:gap-3">
                <Image
                  src="/images/Grove-01.png"
                  alt=""
                  width={64}
                  height={64}
                  className="h-11 w-11 rounded-xl sm:h-12 sm:w-12 md:h-14 md:w-14"
                  priority
                />
                <div className="space-y-0.5">
                  <p className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                    {copyContent.brand.name}
                  </p>
                  <p className="text-sm tracking-wide text-grove-olive">
                    {copyContent.brand.tagline}
                  </p>
                </div>
              </header>

              <div className="flex flex-col gap-2.5 sm:gap-3">
                <h1 className="max-w-xl text-2xl font-semibold leading-[1.1] tracking-tight text-foreground sm:text-3xl md:text-4xl lg:text-5xl">
                  {copyContent.hero.headline}
                </h1>
                <p className="max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg">
                  {copyContent.hero.subheading}
                </p>
              </div>

              <div className="flex w-full flex-col items-center gap-2 md:items-start">
                <WaitlistCta
                  status={ctaStatus}
                  email={email}
                  onEmailChange={setEmail}
                  onSubmit={handleSubmit}
                  className="mx-auto md:mx-0"
                />
                <footer className="space-y-0.5 text-xs text-muted-foreground/75">
                  <p>{copyContent.footerText}</p>
                  <p>
                    {copyContent.company.credit}{" "}
                    <a
                      href={copyContent.company.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline-offset-2 transition-colors hover:text-muted-foreground hover:underline"
                    >
                      {copyContent.company.name}
                    </a>
                  </p>
                </footer>
              </div>
            </div>

            {/* Right: smaller app demo */}
            <div className="flex shrink-0 items-center justify-center">
              <PhoneDemo className="h-[min(36dvh,100%)] md:h-[70dvh] md:max-h-[700px]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
