"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

function Logo() {
  return (
    <svg
      width="27"
      height="27"
      viewBox="0 0 27 27"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.13646 11.1135L11.4799 13.4569L11.4869 13.45L13.121 15.084L13.1279 15.091L15.5145 17.4775C17.7112 19.6742 21.2727 19.6742 23.4694 17.4775C25.6662 15.2808 25.6662 11.7193 23.4694 9.52255C21.2727 7.32584 17.7112 7.32584 15.5145 9.52255L14.7119 10.3251L16.3029 11.9161L17.1055 11.1135C18.4234 9.79552 20.5604 9.79552 21.8784 11.1135C23.1965 12.4316 23.1965 14.5684 21.8784 15.8865C20.5604 17.2045 18.4234 17.2045 17.1055 15.8865L14.7741 13.5553L14.7671 13.5623L10.7274 9.52255C8.53075 7.32584 4.9692 7.32584 2.7725 9.52255C0.575797 11.7193 0.575797 15.2808 2.7725 17.4775C4.9692 19.6742 8.53075 19.6742 10.7274 17.4775L11.5299 16.675L9.93893 15.084L9.13646 15.8865C7.81844 17.2045 5.6815 17.2045 4.36349 15.8865C3.04547 14.5684 3.04547 12.4316 4.36349 11.1135C5.6815 9.79552 7.81844 9.79552 9.13646 11.1135Z"
        fill="var(--logo-color)"
      />
    </svg>
  );
}

export default function CompleteStep() {
  const router = useRouter();
  const [copied, setCopied] = useState(false);
  const mcpEndpoint = "http://localhost:3001/mcp";

  const handleCopy = async () => {
    await navigator.clipboard.writeText(mcpEndpoint);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col items-center" style={{ width: 348 }}>
      <Logo />

      <h1
        className="text-[28px] whitespace-nowrap"
        style={{
          marginTop: 12,
          fontFamily: "var(--font-source-serif-4), 'Source Serif 4', serif",
          fontWeight: 400,
          lineHeight: "35px",
          color: "var(--heading-color)",
        }}
      >
        You are all set
      </h1>

      <p
        className="text-center text-[14px] font-normal"
        style={{
          marginTop: 12,
          fontFamily: "var(--font-inter), 'Inter', sans-serif",
          lineHeight: "22px",
          width: 245,
          color: "var(--body-text)",
        }}
      >
        Your second brain is ready. Connect it to your tools with MCP.
      </p>

      {/* MCP ENDPOINT CARD */}
      <div
        className="flex w-full"
        style={{
          marginTop: 50,
          gap: 10,
          padding: 14,
          borderRadius: 1,
          border: "0.6px solid var(--card-border)",
        }}
      >
        <div className="flex flex-1 flex-col" style={{ gap: 6 }}>
          <span
            className="text-[12px] font-semibold"
            style={{
              fontFamily: "var(--font-inter), 'Inter', sans-serif",
              lineHeight: "15px",
              color: "var(--mcp-endpoint-label)",
            }}
          >
            MCP Endpoint
          </span>

          <div className="flex items-start" style={{ gap: 6 }}>
            <div
              className="flex flex-1 items-center rounded-[4px]"
              style={{
                height: 32,
                padding: "0 10px",
                backgroundColor: "var(--mcp-input-bg)",
              }}
            >
              <span
                className="text-[11px] font-medium truncate"
                style={{
                  fontFamily: "var(--font-inter), 'Inter', sans-serif",
                  color: "var(--card-desc)",
                }}
              >
                {mcpEndpoint}
              </span>
            </div>
            <button
              onClick={handleCopy}
              className="flex shrink-0 cursor-pointer items-center justify-center rounded-[4px] transition-opacity hover:opacity-80"
              style={{
                width: 35,
                height: 32,
                backgroundColor: "var(--mcp-copy-bg)",
              }}
              aria-label="Copy endpoint"
            >
              {copied ? (
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="var(--card-desc)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              ) : (
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="var(--card-desc)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                </svg>
              )}
            </button>
          </div>

          <span
            className="text-[10px] font-medium"
            style={{
              fontFamily: "var(--font-inter), 'Inter', sans-serif",
              lineHeight: "15px",
              color: "var(--card-desc)",
            }}
          >
            Add fragments yourself through the UI. Paste notes, write thoughts,
            log decisions.
          </span>
        </div>
      </div>

      {/* QUICK SETUP CARD */}
      <div
        className="flex w-full"
        style={{
          marginTop: 12,
          gap: 10,
          padding: 14,
          borderRadius: 1,
          border: "0.6px solid var(--card-border)",
        }}
      >
        <div className="flex flex-1 flex-col" style={{ gap: 6 }}>
          <span
            className="text-[12px] font-semibold"
            style={{
              fontFamily: "var(--font-inter), 'Inter', sans-serif",
              lineHeight: "15px",
              color: "var(--mcp-endpoint-label)",
            }}
          >
            Quick setup
          </span>

          {[1, 2, 3].map((num) => (
            <div
              key={num}
              className="flex items-start"
              style={{
                gap: 6,
                fontFamily: "var(--font-inter), 'Inter', sans-serif",
              }}
            >
              <span
                className="shrink-0 text-[10px] font-medium whitespace-nowrap"
                style={{ lineHeight: "15px", color: "var(--setup-number)" }}
              >
                {num}
              </span>
              <span
                className="flex-1 text-[10px] font-medium"
                style={{ lineHeight: "15px", color: "var(--setup-text)" }}
              >
                Add fragments yourself through the UI. Paste notes, write
                thoughts, log decisions.
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* CREATE NOTE BUTTON */}
      <button
        onClick={() => router.push("/wiki")}
        className="cursor-pointer rounded-[2px] text-center text-[14px] font-bold transition-opacity hover:opacity-90"
        style={{
          marginTop: 40,
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
        Create a your first note
      </button>
    </div>
  );
}
