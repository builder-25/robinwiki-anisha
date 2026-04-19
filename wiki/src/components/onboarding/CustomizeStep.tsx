"use client";

import { useState } from "react";
import { T } from "@/lib/typography";
import { ActionButton } from "@/components/ui/action-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface CustomizeStepProps {
  onNext: () => void;
}

function InfoIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden
      className="text-[var(--helper-text)]"
    >
      <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1" />
      <path d="M8 7V11" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <circle cx="8" cy="5" r="0.75" fill="currentColor" />
    </svg>
  );
}

const labelClass =
  "uppercase tracking-[0.32px] text-[12px] flex items-center gap-2";

export default function CustomizeStep({ onNext }: CustomizeStepProps) {
  const [apiKey, setApiKey] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const canContinue = apiKey.trim().length > 0 && !saving;

  const handleContinue = async () => {
    setSaving(true);
    setError("");
    try {
      const res = await fetch("/api/users/preferences/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ openRouterKey: apiKey }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({ message: "Failed to save API key" }));
        setError(body.message || body.error || "Failed to save API key");
        setSaving(false);
        return;
      }
      onNext();
    } catch {
      setError("Network error. Please try again.");
      setSaving(false);
    }
  };

  return (
    <div className="flex flex-col items-start" style={{ width: 320 }}>
      <p
        className="whitespace-nowrap"
        style={{
          ...T.overline,
          color: "var(--section-label)",
        }}
      >
        AI
      </p>

      <h1
        className="whitespace-nowrap"
        style={{
          ...T.h1,
          color: "var(--heading-color)",
        }}
      >
        Customize your wiki
      </h1>

      <p
        className="w-full"
        style={{
          marginTop: 8,
          ...T.micro,
          color: "var(--section-label)",
        }}
      >
        Robin uses{" "}
        <a
          href="https://openrouter.ai/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
          style={{ color: "var(--section-label)" }}
        >
          OpenRouter
        </a>{" "}
        to access language models.
      </p>

      <div className="mt-10 flex w-full flex-col gap-1.5">
        <Label
          htmlFor="onboarding-api-key"
          className={labelClass}
          style={{ color: "var(--helper-text)" }}
        >
          OpenRouter API Key
          <InfoIcon />
        </Label>
        <Input
          id="onboarding-api-key"
          type="text"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          placeholder="sk or pk"
          autoComplete="off"
        />
        <p
          className="mt-1"
          style={{ ...T.helper, color: "var(--helper-text)" }}
        >
          Your key is stored securely. Robin never sees it.
        </p>
        {error && (
          <p
            className="mt-2"
            style={{ ...T.helper, color: "var(--destructive, #ef4444)" }}
          >
            {error}
          </p>
        )}
      </div>

      <ActionButton
        type="button"
        onClick={handleContinue}
        disabled={!canContinue}
        className="mt-10 self-end"
      >
        {saving ? "Saving..." : "Continue"}
      </ActionButton>
    </div>
  );
}
