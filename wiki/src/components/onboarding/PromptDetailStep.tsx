"use client";

import { useState } from "react";

interface PromptDetailStepProps {
  onNext: () => void;
}

function UserIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21"
        stroke="var(--card-desc)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"
        stroke="var(--card-desc)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const defaultPrompt = `You are a people-extraction engine. Given a collection of text fragments, identify every distinct person mentioned.

For each person, extract:
- Full name (and any aliases)
- Relationship to the author
- Key context (role, how they met, shared interests)
- Communication style notes
- Last known interaction date

Output structured JSON. Merge duplicates. Flag uncertain identifications.`;

export default function PromptDetailStep({ onNext }: PromptDetailStepProps) {
  const [prompt, setPrompt] = useState(defaultPrompt);

  return (
    <div className="flex flex-col items-start" style={{ width: 288 }}>
      <p
        className="text-[13px] font-normal uppercase whitespace-nowrap"
        style={{
          fontFamily: "var(--font-inter), 'Inter', sans-serif",
          lineHeight: "35px",
          color: "var(--section-label)",
        }}
      >
        AI
      </p>

      <h1
        className="text-[28px] whitespace-nowrap"
        style={{
          fontFamily:
            "var(--font-source-serif-4), 'Source Serif 4', serif",
          fontWeight: 400,
          lineHeight: "35px",
          color: "var(--heading-color)",
        }}
      >
        People Extraction
      </h1>

      <p
        className="text-[12px] font-normal w-full"
        style={{
          marginTop: 8,
          fontFamily: "var(--font-inter), 'Inter', sans-serif",
          lineHeight: "19px",
          color: "var(--section-label)",
        }}
      >
        Controls how Robin identifies and maps relationships from your
        fragments.
      </p>

      <div
        className="flex w-full flex-col"
        style={{ marginTop: 50, gap: 12 }}
      >
        {/* Prompt card header */}
        <div
          className="flex items-center"
          style={{ gap: 9.736 }}
        >
          <div className="shrink-0" style={{ width: 24, height: 24 }}>
            <UserIcon />
          </div>
          <span
            className="font-semibold"
            style={{
              fontSize: 12.17,
              fontFamily: "var(--font-inter), 'Inter', sans-serif",
              lineHeight: "14.604px",
              color: "var(--card-title)",
            }}
          >
            People Extraction Prompt
          </span>
        </div>

        {/* Editable prompt textarea */}
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="w-full resize-none"
          rows={10}
          style={{
            padding: 14,
            borderRadius: 4,
            border: "0.608px solid var(--card-border)",
            backgroundColor: "var(--input-bg)",
            color: "var(--card-title)",
            fontFamily: "var(--font-inter), 'Inter', sans-serif",
            fontSize: 10,
            lineHeight: "16px",
            outline: "none",
          }}
        />

        <span
          className="font-medium"
          style={{
            fontSize: 9.736,
            fontFamily: "var(--font-inter), 'Inter', sans-serif",
            lineHeight: "14.604px",
            color: "#616161",
          }}
        >
          This prompt runs whenever Robin processes new fragments to
          identify people and their relationships.
        </span>
      </div>

      <button
        onClick={onNext}
        className="self-end cursor-pointer rounded-[2px] text-center text-[14px] font-bold transition-opacity hover:opacity-90"
        style={{
          marginTop: 50,
          height: 32,
          minWidth: 32,
          maxWidth: 448,
          padding: "4px 12px",
          lineHeight: "20px",
          fontFamily: "var(--font-inter), 'Inter', sans-serif",
          backgroundColor: "var(--btn-primary-bg)",
          color: "var(--btn-primary-text)",
          border: "none",
        }}
      >
        Continue
      </button>
    </div>
  );
}
