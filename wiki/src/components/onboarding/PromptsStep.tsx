"use client";

import { useState } from "react";

interface PromptsStepProps {
  onNext: () => void;
  onSkip: () => void;
}

function FileTextIcon({ stroke = "var(--card-desc)" }: { stroke?: string }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14 2V8H20"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16 13H8"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16 17H8"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 9H9H8"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Figma node 141:25310 — Stroke/User, 24×24 */
function UserStrokeIcon({ stroke = "var(--card-desc)" }: { stroke?: string }) {
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
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx="12"
        cy="7"
        r="4"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6 12L10 8L6 4"
        stroke="var(--card-desc)"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 4L4 12M4 4L12 12"
        stroke="var(--card-desc)"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Figma 141:25267 / 141:25302 — shared prompt row metrics */
const PROMPT_ROW_STYLE = {
  width: 288,
  minWidth: 194.71697998046875,
  padding: 14,
  borderRadius: 4,
  gap: 9.736,
  border: "0.608px solid var(--card-border)",
} as const;

const defaultPrompt = `You are a wiki-generation engine. Given a collection of text fragments about a topic, synthesize them into a cohesive wiki article.

Guidelines:
- Write in an encyclopedic, neutral tone
- Organize content with clear section headings
- Merge overlapping information, resolve contradictions
- Cite fragment sources where possible
- Include a brief introductory summary
- Generate "See also" links to related topics

Output well-structured markdown.`;

export default function PromptsStep({ onNext, onSkip }: PromptsStepProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [prompt, setPrompt] = useState(defaultPrompt);
  const [edited, setEdited] = useState(false);

  const handleSave = () => {
    setEdited(true);
    setModalOpen(false);
  };

  return (
    <>
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
          Customize your prompts
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
          Robin uses two core prompts to process your knowledge.
        </p>

        <div
          className="flex w-full flex-col"
          style={{ marginTop: 50, gap: 19 }}
        >
          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="flex w-full cursor-pointer items-center text-left"
            style={{
              ...PROMPT_ROW_STYLE,
              border: edited
                ? "0.608px solid var(--radio-border)"
                : PROMPT_ROW_STYLE.border,
              background: "none",
            }}
          >
            <div className="shrink-0" style={{ width: 24, height: 24 }}>
              <FileTextIcon stroke="var(--prompt-wiki-icon-stroke)" />
            </div>
            <div
              className="flex min-h-px min-w-px flex-[1_0_0] flex-col items-start"
              style={{ gap: 4, lineHeight: "14.604px" }}
            >
              <span
                className="w-full shrink-0 font-semibold"
                style={{
                  fontSize: 12.17,
                  fontFamily: "var(--font-inter), 'Inter', sans-serif",
                  color: "var(--card-title)",
                }}
              >
                Wiki Generation Prompt
              </span>
              <span
                className="w-full shrink-0 font-medium whitespace-pre-wrap"
                style={{
                  fontSize: 9.736,
                  fontFamily: "var(--font-inter), 'Inter', sans-serif",
                  color: "#616161",
                }}
              >
                Controls how fragments are synthesized into wiki articles
              </span>
            </div>
            <div className="relative shrink-0" style={{ width: 16, height: 16 }}>
              <ChevronRightIcon />
            </div>
          </button>

          {/* Figma 141:25302 — inactive; whole row opacity 20% */}
          <div
            className="flex w-full items-center text-left not-italic"
            style={{
              ...PROMPT_ROW_STYLE,
              opacity: 0.2,
              cursor: "default",
              pointerEvents: "none",
            }}
            aria-disabled="true"
            role="group"
          >
            <div
              className="relative shrink-0 overflow-hidden"
              style={{ width: 24, height: 24 }}
            >
              <UserStrokeIcon stroke="var(--card-desc)" />
            </div>
            <div
              className="relative flex min-h-px min-w-px flex-[1_0_0] flex-col items-start"
              style={{ gap: 4, lineHeight: "14.604px" }}
            >
              <span
                className="w-full shrink-0 font-semibold"
                style={{
                  fontSize: 12.17,
                  fontFamily: "var(--font-inter), 'Inter', sans-serif",
                  color: "var(--card-title)",
                }}
              >
                People Extraction Prompt
              </span>
              <span
                className="w-full shrink-0 font-medium"
                style={{
                  fontSize: 9.736,
                  fontFamily: "var(--font-inter), 'Inter', sans-serif",
                  color: "#616161",
                }}
              >
                Controls how robin identifies and maps relationships from your fragments
              </span>
            </div>
            <div className="relative shrink-0" style={{ width: 16, height: 16 }}>
              <ChevronRightIcon />
            </div>
          </div>
        </div>

        <div
          className="flex w-full items-center justify-between"
          style={{ marginTop: 50 }}
        >
          <button
            type="button"
            onClick={onSkip}
            className="rounded-[2px] text-center text-[14px] font-bold transition-opacity hover:opacity-80"
            style={{
              height: 32,
              minWidth: 32,
              padding: "4px 12px",
              lineHeight: "20px",
              fontFamily: "var(--font-inter), 'Inter', sans-serif",
              color: "var(--skip-link)",
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
          >
            Skip
          </button>
          <button
            type="button"
            onClick={onNext}
            disabled={!edited}
            className="rounded-[2px] text-center text-[14px] font-bold transition-opacity"
            style={{
              height: 32,
              minWidth: 32,
              maxWidth: 448,
              padding: "4px 12px",
              lineHeight: "20px",
              fontFamily: "var(--font-inter), 'Inter', sans-serif",
              backgroundColor: edited
                ? "var(--btn-primary-bg)"
                : "var(--btn-disabled-bg)",
              color: edited
                ? "var(--btn-primary-text)"
                : "var(--btn-disabled-text)",
              cursor: edited ? "pointer" : "not-allowed",
              border: "none",
            }}
          >
            Continue
          </button>
        </div>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(0, 0, 0, 0.6)",
          }}
          onClick={() => setModalOpen(false)}
        >
          <div
            style={{
              width: 480,
              maxWidth: "90vw",
              maxHeight: "80vh",
              backgroundColor: "var(--bg)",
              borderRadius: 8,
              border: "1px solid var(--card-border)",
              padding: 28,
              display: "flex",
              flexDirection: "column",
              gap: 16,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal header */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <FileTextIcon stroke="var(--prompt-wiki-icon-stroke)" />
                <span
                  className="font-semibold"
                  style={{
                    fontSize: 14,
                    fontFamily:
                      "var(--font-inter), 'Inter', sans-serif",
                    color: "var(--heading-color)",
                  }}
                >
                  Wiki Generation Prompt
                </span>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: 4,
                  display: "flex",
                }}
              >
                <CloseIcon />
              </button>
            </div>

            <p
              style={{
                fontSize: 11,
                fontFamily:
                  "var(--font-inter), 'Inter', sans-serif",
                lineHeight: "16px",
                color: "var(--section-label)",
              }}
            >
              Controls how fragments are synthesized into wiki articles.
            </p>

            {/* Textarea */}
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full resize-none"
              rows={10}
              style={{
                flex: 1,
                padding: 14,
                borderRadius: 4,
                border: "0.608px solid var(--card-border)",
                backgroundColor: "var(--input-bg)",
                color: "var(--heading-color)",
                fontFamily:
                  "var(--font-inter), 'Inter', sans-serif",
                fontSize: 12,
                lineHeight: "18px",
                outline: "none",
              }}
            />

            {/* Save button */}
            <button
              onClick={handleSave}
              className="self-end cursor-pointer rounded-[2px] text-center text-[14px] font-bold transition-opacity hover:opacity-90"
              style={{
                height: 32,
                padding: "4px 16px",
                lineHeight: "20px",
                fontFamily:
                  "var(--font-inter), 'Inter', sans-serif",
                backgroundColor: "var(--btn-primary-bg)",
                color: "var(--btn-primary-text)",
                border: "none",
              }}
            >
              Save
            </button>
          </div>
        </div>
      )}
    </>
  );
}
