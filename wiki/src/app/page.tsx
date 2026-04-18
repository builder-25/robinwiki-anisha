"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { useSession } from "@/hooks/useSession";
import { useProfile } from "@/hooks/useProfile";
import { Spinner } from "@/components/ui/spinner";

import WelcomeStep from "@/components/onboarding/WelcomeStep";
import CustomizeStep from "@/components/onboarding/CustomizeStep";
import PromptsStep from "@/components/onboarding/PromptsStep";
import CompleteStep from "@/components/onboarding/CompleteStep";

export default function Home() {
  const router = useRouter();
  const { isAuthenticated, isLoading: sessionLoading } = useSession();
  const { data: profile, isLoading: profileLoading } = useProfile({
    enabled: isAuthenticated,
  });

  const [step, setStep] = useState(0);

  const nextStep = () => setStep((s) => Math.min(s + 1, 3));
  const prevStep = () => setStep((s) => Math.max(s - 1, 0));

  // Redirect: not authenticated -> /login
  useEffect(() => {
    if (!sessionLoading && !isAuthenticated) {
      router.replace("/login");
    }
  }, [sessionLoading, isAuthenticated, router]);

  // Redirect: authenticated + onboarded -> /wiki
  useEffect(() => {
    if (!sessionLoading && isAuthenticated && !profileLoading && profile?.onboardedAt) {
      router.replace("/wiki");
    }
  }, [sessionLoading, isAuthenticated, profileLoading, profile, router]);

  // Loading: session or profile still resolving
  if (sessionLoading || (isAuthenticated && profileLoading)) {
    return (
      <div
        className="flex h-full min-h-screen w-full items-center justify-center"
        style={{ backgroundColor: "var(--color-background)" }}
      >
        <Spinner className="size-6" />
      </div>
    );
  }

  // Not authenticated — redirect is firing, render nothing
  if (!isAuthenticated) {
    return null;
  }

  // Authenticated + already onboarded — redirect is firing, render nothing
  if (profile?.onboardedAt) {
    return null;
  }

  // Authenticated + not onboarded — show setup wizard
  return (
    <div
      className="home-outer-shell relative flex h-full min-h-screen w-full flex-col items-center justify-center transition-colors duration-200"
      style={{ backgroundColor: "var(--color-background)" }}
    >
      {step > 0 && (
        <button
          type="button"
          onClick={prevStep}
          aria-label="Back"
          className="fixed top-5 left-5 z-50 flex h-8 w-8 items-center justify-center rounded-full transition-opacity hover:opacity-70"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden
          >
            <path
              d="M15 18L9 12L15 6"
              stroke="var(--heading-secondary)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      )}

      <div className="flex w-full items-center justify-center px-6">
        {step === 0 && <WelcomeStep onNext={nextStep} />}
        {step === 1 && <CustomizeStep onNext={nextStep} />}
        {step === 2 && (
          <PromptsStep onNext={nextStep} onSkip={nextStep} />
        )}
        {step === 3 && <CompleteStep />}
      </div>
    </div>
  );
}
