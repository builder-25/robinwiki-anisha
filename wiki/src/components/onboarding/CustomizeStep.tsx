"use client";

import { useState } from "react";

interface CustomizeStepProps {
  onNext: () => void;
}

function InfoIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="8" cy="8" r="7" stroke="var(--helper-text)" strokeWidth="1" />
      <path
        d="M8 7V11"
        stroke="var(--helper-text)"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <circle cx="8" cy="5" r="0.75" fill="var(--helper-text)" />
    </svg>
  );
}

function ChevronDownIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3 4.5L6 7.5L9 4.5"
        stroke="var(--input-placeholder)"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const embeddingModels = [
  "text-embedding-3-small",
  "text-embedding-3-large",
  "text-embedding-ada-002",
];

const fragmentModels = [
  "text-embedding-3-small",
  "text-embedding-3-large",
  "text-embedding-ada-002",
];

const labelStyle: React.CSSProperties = {
  fontFamily: "var(--font-ibm-plex-sans), 'IBM Plex Sans', sans-serif",
  fontSize: 12,
  fontWeight: 400,
  lineHeight: "16px",
  letterSpacing: "0.32px",
  color: "var(--helper-text)",
};

const inputBoxStyle: React.CSSProperties = {
  width: "100%",
  height: 32,
  padding: "7px 16px",
  fontFamily: "var(--font-ibm-plex-sans), 'IBM Plex Sans', sans-serif",
  fontSize: 14,
  fontWeight: 400,
  lineHeight: "18px",
  letterSpacing: "0.16px",
  color: "var(--heading-color)",
  backgroundColor: "var(--input-bg)",
  border: "none",
  borderBottom: "1px solid var(--input-border)",
  outline: "none",
};

export default function CustomizeStep({ onNext }: CustomizeStepProps) {
  const [apiKey, setApiKey] = useState("");
  const [embeddingModel, setEmbeddingModel] = useState(embeddingModels[0]);
  const [fragmentModel, setFragmentModel] = useState(fragmentModels[0]);

  const canContinue = apiKey.trim().length > 0;

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
        Customize your wiki
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
        Robin uses{" "}
        <a
          href="https://openrouter.ai/"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: "var(--section-label)",
            textDecoration: "underline",
          }}
        >
          OpenRouter
        </a>{" "}
        to access language models.
      </p>

      {/* OPENROUTER API KEY */}
      <div className="flex w-full flex-col" style={{ marginTop: 40 }}>
        <div
          className="flex items-center"
          style={{ gap: 8, paddingBottom: 8 }}
        >
          <span style={labelStyle}>OPENROUTER API KEY</span>
          <InfoIcon />
        </div>
        <input
          type="text"
          placeholder="sk or pk"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          style={inputBoxStyle}
        />
        <p
          style={{
            marginTop: 4,
            fontFamily:
              "var(--font-ibm-plex-sans), 'IBM Plex Sans', sans-serif",
            fontSize: 11,
            fontWeight: 400,
            lineHeight: "16px",
            letterSpacing: "0.32px",
            color: "var(--helper-text)",
          }}
        >
          Your key is stored securely. Robin never sees it.
        </p>
      </div>

      {/* Divider */}
      <div
        style={{
          width: "100%",
          height: 1,
          backgroundColor: "var(--card-border)",
          marginTop: 28,
          marginBottom: 28,
        }}
      />

      {/* EMBEDDING MODEL */}
      <div className="flex w-full flex-col">
        <div style={{ paddingBottom: 8 }}>
          <span style={labelStyle}>EMBEDDING MODEL</span>
        </div>
        <div style={{ position: "relative", width: "100%" }}>
          <select
            value={embeddingModel}
            onChange={(e) => setEmbeddingModel(e.target.value)}
            style={{
              ...inputBoxStyle,
              appearance: "none",
              paddingRight: 40,
              cursor: "pointer",
            }}
          >
            {embeddingModels.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
          <div
            style={{
              position: "absolute",
              right: 16,
              top: "50%",
              transform: "translateY(-50%)",
              pointerEvents: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 20,
              height: 20,
            }}
          >
            <ChevronDownIcon />
          </div>
        </div>
      </div>

      {/* FRAGMENT PROCESSING MODEL */}
      <div className="flex w-full flex-col" style={{ marginTop: 24 }}>
        <div style={{ paddingBottom: 8 }}>
          <span style={labelStyle}>FRAGMENT PROCESSING MODEL</span>
        </div>
        <div style={{ position: "relative", width: "100%" }}>
          <select
            value={fragmentModel}
            onChange={(e) => setFragmentModel(e.target.value)}
            style={{
              ...inputBoxStyle,
              appearance: "none",
              paddingRight: 40,
              cursor: "pointer",
            }}
          >
            {fragmentModels.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
          <div
            style={{
              position: "absolute",
              right: 16,
              top: "50%",
              transform: "translateY(-50%)",
              pointerEvents: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 20,
              height: 20,
            }}
          >
            <ChevronDownIcon />
          </div>
        </div>
      </div>

      {/* CONTINUE BUTTON */}
      <button
        onClick={onNext}
        disabled={!canContinue}
        className="self-end rounded-[2px] text-center text-[14px] font-bold transition-opacity"
        style={{
          marginTop: 40,
          height: 32,
          minWidth: 32,
          maxWidth: 448,
          padding: "4px 12px",
          lineHeight: "20px",
          fontFamily: "var(--font-inter), 'Inter', sans-serif",
          backgroundColor: canContinue
            ? "var(--btn-primary-bg)"
            : "var(--btn-disabled-bg)",
          color: canContinue
            ? "var(--btn-primary-text)"
            : "var(--btn-disabled-text)",
          cursor: canContinue ? "pointer" : "not-allowed",
          border: "none",
        }}
      >
        Continue
      </button>
    </div>
  );
}
