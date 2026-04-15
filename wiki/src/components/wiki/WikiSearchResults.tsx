"use client";

import { useState, type ReactNode } from "react";

const IBM = "var(--font-ibm-plex-sans), 'IBM Plex Sans', sans-serif";
const HELV_MED = "'Helvetica Neue', Helvetica, Arial, sans-serif";
const HELV_REG = "'Helvetica Neue', Helvetica, Arial, sans-serif";

const LOREM =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis";

const LINK_TITLE = "Andrew Tate Biography | The Real World Portal";

function SectionRule() {
  return (
    <div
      style={{
        width: "100%",
        height: 1,
        background: "var(--wiki-search-section-line)",
        flexShrink: 0,
      }}
    />
  );
}

function FilterChip({
  icon,
  label,
  active,
  onClick,
}: {
  icon: ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex cursor-pointer items-center justify-center border-none"
      style={{
        gap: 4,
        padding: "2px 8px",
        background: active
          ? "var(--wiki-search-chip-active-bg)"
          : "var(--wiki-search-chip-bg)",
        outline: active ? "1px solid rgba(140,140,140,0.35)" : "none",
      }}
    >
      <span className="flex h-3 w-3 shrink-0 items-center justify-center">
        {icon}
      </span>
      <span
        style={{
          fontFamily: "var(--font-inter), Inter, sans-serif",
          fontSize: 12,
          fontWeight: 400,
          lineHeight: 1.5,
          letterSpacing: "-0.0288px",
          color: "rgba(140, 140, 140, 0.7)",
          whiteSpace: "nowrap",
        }}
      >
        {label}
      </span>
    </button>
  );
}

function IconCircle() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
      <circle
        cx="6"
        cy="6"
        r="4.5"
        stroke="rgba(140,140,140,0.7)"
        strokeWidth="1.2"
      />
    </svg>
  );
}

function IconFileCode() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
      <path
        d="M7 1.5H3.5C2.95 1.5 2.5 1.95 2.5 2.5v7c0 .55.45 1 1 1h5c.55 0 1-.45 1-1V4L7 1.5z"
        stroke="rgba(140,140,140,0.7)"
        strokeWidth="1"
        strokeLinejoin="round"
      />
      <path
        d="M7 1.5V4h2.5M4 6.5h4M4 8.5h3"
        stroke="rgba(140,140,140,0.7)"
        strokeWidth="1"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconUserRound() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
      <circle cx="6" cy="3.5" r="2" stroke="rgba(140,140,140,0.7)" strokeWidth="1" />
      <path
        d="M2.5 10.5c.5-2 2.5-3 3.5-3s3 1 3.5 3"
        stroke="rgba(140,140,140,0.7)"
        strokeWidth="1"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconWiki() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
      <path
        d="M3 2.5h6v7H3v-7zM4.5 2.5V1.5h3v1M4.5 5h3M4.5 6.5h2"
        stroke="rgba(140,140,140,0.7)"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function WikiResultRow({
  chip,
}: {
  chip: ReactNode;
}) {
  return (
    <div
      className="flex w-full flex-col items-start"
      style={{ gap: 8, paddingTop: 20 }}
    >
      <div className="flex w-full flex-col" style={{ gap: 6 }}>
        <div
          className="wiki-search-result-row-head flex w-full items-center"
          style={{ gap: 6 }}
        >
          <a
            href="#"
            className="wiki-search-result-title-link min-w-0"
            style={{
              fontFamily: IBM,
              fontSize: 16,
              fontWeight: 400,
              lineHeight: "20px",
              letterSpacing: "0.16px",
              color: "var(--wiki-fragment-link)",
              textDecoration: "underline",
              textDecorationSkipInk: "none",
              whiteSpace: "nowrap",
            }}
          >
            {LINK_TITLE}
          </a>
          {chip}
        </div>
      </div>
      <p
        style={{
          fontFamily: "var(--font-inter), Inter, sans-serif",
          fontSize: 14,
          fontWeight: 400,
          lineHeight: "22px",
          color: "var(--wiki-article-text)",
          maxWidth: "100%",
        }}
      >
        {LOREM}
      </p>
      <div
        className="wiki-search-result-meta flex items-center"
        style={{
          fontFamily: HELV_REG,
          fontSize: 12,
          fontWeight: 400,
          color: "#444444",
          gap: 3,
          whiteSpace: "nowrap",
        }}
      >
        <span style={{ lineHeight: "17px" }}>14 Fragments</span>
        <span style={{ lineHeight: "10px" }}>•</span>
        <span style={{ lineHeight: "17px" }}>14 Backlinks</span>
        <span style={{ lineHeight: "10px" }}>•</span>
        <span style={{ lineHeight: "17px" }}>Updated 40 secs ago</span>
      </div>
    </div>
  );
}

function PeopleChip() {
  return (
    <div
      className="flex items-center justify-center"
      style={{
        gap: 4,
        padding: "2px 8px",
        background: "var(--wiki-search-chip-bg)",
      }}
    >
      <IconUserRound />
      <span
        style={{
          fontFamily: "var(--font-inter), Inter, sans-serif",
          fontSize: 12,
          fontWeight: 400,
          lineHeight: 1.5,
          letterSpacing: "-0.0288px",
          color: "rgba(140, 140, 140, 0.7)",
          whiteSpace: "nowrap",
        }}
      >
        People
      </span>
    </div>
  );
}

function TypeChip({ label }: { label: string }) {
  return (
    <div
      className="flex items-center justify-center"
      style={{
        padding: "2px 8px",
        background: "var(--wiki-search-chip-bg)",
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-inter), Inter, sans-serif",
          fontSize: 12,
          fontWeight: 400,
          lineHeight: 1.5,
          letterSpacing: "-0.0288px",
          color: "rgba(140, 140, 140, 0.7)",
          whiteSpace: "nowrap",
        }}
      >
        {label}
      </span>
    </div>
  );
}

function FragmentResultRow({ typeLabel }: { typeLabel: string }) {
  return (
    <div
      className="flex w-full flex-col items-start"
      style={{ gap: 8, paddingTop: 20 }}
    >
      <div className="flex w-full flex-col" style={{ gap: 6 }}>
        <div
          className="wiki-search-result-row-head flex w-full items-center"
          style={{ gap: 6 }}
        >
          <a
            href="#"
            className="wiki-search-result-title-link min-w-0"
            style={{
              fontFamily: IBM,
              fontSize: 16,
              fontWeight: 400,
              lineHeight: "20px",
              letterSpacing: "0.16px",
              color: "var(--wiki-fragment-link)",
              textDecoration: "underline",
              textDecorationSkipInk: "none",
              whiteSpace: "nowrap",
            }}
          >
            {LINK_TITLE}
          </a>
          <TypeChip label={typeLabel} />
        </div>
      </div>
      <p
        style={{
          fontFamily: "var(--font-inter), Inter, sans-serif",
          fontSize: 14,
          fontWeight: 400,
          lineHeight: "22px",
          color: "var(--wiki-article-text)",
          maxWidth: "100%",
        }}
      >
        {LOREM}
      </p>
      <div
        className="wiki-search-result-meta flex items-center"
        style={{
          fontFamily: HELV_REG,
          fontSize: 12,
          fontWeight: 400,
          color: "#444444",
          gap: 3,
          whiteSpace: "nowrap",
        }}
      >
        <span style={{ lineHeight: "17px" }}>14 Fragments</span>
        <span style={{ lineHeight: "10px" }}>•</span>
        <span style={{ lineHeight: "17px" }}>14 Backlinks</span>
        <span style={{ lineHeight: "10px" }}>•</span>
        <span style={{ lineHeight: "17px" }}>Last edited, 40 secs ago</span>
      </div>
    </div>
  );
}

function PersonRow() {
  return (
    <div className="flex w-full items-start" style={{ gap: 14 }}>
      <div
        className="relative shrink-0 overflow-hidden"
        style={{
          width: 40,
          height: 40,
          background: "var(--wiki-search-avatar-bg)",
        }}
      >
        <div
          className="absolute left-1/2 top-1/2 flex h-6 w-6 -translate-x-1/2 -translate-y-1/2 items-center justify-center"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
            <circle cx="12" cy="9" r="3.5" stroke="#8c8c8c" strokeWidth="1.2" />
            <path
              d="M5 20.5c1-4 5.5-6 7-6s6 2 7 6"
              stroke="#8c8c8c"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>
      <div
        className="flex min-h-px min-w-px flex-[1_0_0] flex-col items-start"
        style={{ gap: 8 }}
      >
        <p
          className="wiki-search-person-name"
          style={{
            fontFamily: IBM,
            fontSize: 16,
            fontWeight: 500,
            lineHeight: "20px",
            letterSpacing: "0.16px",
            color: "#d5d5d5",
            whiteSpace: "nowrap",
          }}
        >
          Marcus Chen
        </p>
        <p
          style={{
            fontFamily: "var(--font-inter), Inter, sans-serif",
            fontSize: 14,
            fontWeight: 400,
            lineHeight: "22px",
            color: "var(--wiki-article-text)",
            maxWidth: "100%",
          }}
        >
          Colleague. Frequent discussions about politics, leadership, and
          presidential decision-making
        </p>
        <div
          className="wiki-search-result-meta flex items-center"
          style={{
            fontFamily: HELV_REG,
            fontSize: 12,
            fontWeight: 400,
            color: "#444444",
            gap: 3,
            whiteSpace: "nowrap",
          }}
        >
          <span style={{ lineHeight: "17px" }}>Mentioned in 7 fragments </span>
          <span style={{ lineHeight: "10px" }}>•</span>
          <span style={{ lineHeight: "17px" }}>Last seen 1 week ago</span>
        </div>
      </div>
    </div>
  );
}

export default function WikiSearchResults({ query }: { query: string }) {
  const [filter, setFilter] = useState<
    "all" | "fragments" | "people" | "wiki"
  >("all");

  return (
    <div
      className="wiki-search-results-root flex w-full min-w-0 flex-col items-start"
      style={{
        width: "100%",
        maxWidth: 864,
        gap: 12,
      }}
    >
      <div className="flex w-full flex-col items-start" style={{ gap: 5 }}>
        <div className="flex w-full flex-col items-start">
          <div className="flex w-full flex-col" style={{ gap: 4 }}>
            <div className="wiki-search-results-title-wrap relative h-[35px] w-full shrink-0">
              <h1
                className="wiki-search-results-h1"
                style={{
                  position: "absolute",
                  left: 0,
                  top: "calc(50% - 17.5px)",
                  margin: 0,
                  fontFamily:
                    "var(--font-source-serif-4), 'Source Serif 4', serif",
                  fontSize: 28,
                  fontWeight: 400,
                  lineHeight: "35px",
                  color: "var(--wiki-title)",
                }}
              >
                {query}
              </h1>
            </div>
            <SectionRule />
          </div>
        </div>
        <div className="flex items-center px-1" style={{ gap: 3 }}>
          <p
            style={{
              fontFamily: HELV_REG,
              fontSize: 10,
              fontWeight: 400,
              lineHeight: "17.3px",
              color: "#8c8d8d",
              whiteSpace: "nowrap",
            }}
          >
            23 results
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-start" style={{ gap: 8 }}>
        <FilterChip
          icon={<IconCircle />}
          label="All (13)"
          active={filter === "all"}
          onClick={() => setFilter("all")}
        />
        <FilterChip
          icon={<IconFileCode />}
          label="Fragments (9)"
          active={filter === "fragments"}
          onClick={() => setFilter("fragments")}
        />
        <FilterChip
          icon={<IconUserRound />}
          label="People (2)"
          active={filter === "people"}
          onClick={() => setFilter("people")}
        />
        <FilterChip
          icon={<IconWiki />}
          label="Wiki (3)"
          active={filter === "wiki"}
          onClick={() => setFilter("wiki")}
        />
      </div>

      {/* Results — Figma 269:44191, gap 64 between sections */}
      <div className="flex w-full flex-col items-start" style={{ gap: 64 }}>
        {(filter === "all" || filter === "wiki") && (
          <section className="w-full" style={{ minHeight: 0 }}>
            <div className="flex w-full flex-col" style={{ gap: 8 }}>
              <div className="flex w-full flex-col items-start">
                <p
                  style={{
                    fontFamily: HELV_MED,
                    fontSize: 14,
                    fontWeight: 500,
                    lineHeight: "26.88px",
                    color: "#9c9c9c",
                    width: "100%",
                  }}
                >
                  WIKI (8)
                </p>
                <SectionRule />
              </div>
              <WikiResultRow chip={<PeopleChip />} />
              <WikiResultRow chip={<PeopleChip />} />
              <WikiResultRow chip={<PeopleChip />} />
            </div>
          </section>
        )}

        {(filter === "all" || filter === "fragments") && (
          <section className="w-full">
            <div className="flex w-full flex-col" style={{ gap: 8 }}>
              <div className="flex w-full flex-col items-start">
                <p
                  style={{
                    fontFamily: HELV_MED,
                    fontSize: 14,
                    fontWeight: 500,
                    lineHeight: "26.88px",
                    color: "#9c9c9c",
                    width: "100%",
                  }}
                >
                  FRAGMENTS (11)
                </p>
                <SectionRule />
              </div>
              <FragmentResultRow typeLabel="Fact" />
              <FragmentResultRow typeLabel="Question" />
              <FragmentResultRow typeLabel="Idea" />
            </div>
          </section>
        )}

        {(filter === "all" || filter === "people") && (
          <section className="w-full">
            <div className="flex w-full flex-col" style={{ gap: 8 }}>
              <div
                className="flex w-full flex-col items-start pb-4"
              >
                <p
                  style={{
                    fontFamily: HELV_MED,
                    fontSize: 14,
                    fontWeight: 500,
                    lineHeight: "26.88px",
                    color: "#9c9c9c",
                    width: "100%",
                  }}
                >
                  PEOPLE (2)
                </p>
                <SectionRule />
              </div>
              <div
                className="flex w-full flex-col items-start py-1"
                style={{ gap: 24 }}
              >
                <PersonRow />
                <div
                  style={{
                    width: "100%",
                    height: 1,
                    background: "var(--wiki-search-chip-bg)",
                  }}
                />
                <PersonRow />
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
