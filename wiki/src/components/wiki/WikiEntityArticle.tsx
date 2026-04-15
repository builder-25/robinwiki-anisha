"use client";

import { useMemo, useState, type ReactNode } from "react";
import AddWikiModal from "@/components/layout/AddWikiModal";
import { wikiEntitySettingsPrefill } from "@/lib/wikiSettingsPrefill";
import {
  Check,
  CircleDot,
  Flag,
  UserRound,
  type LucideIcon,
} from "lucide-react";

const IBM = "var(--font-ibm-plex-sans), 'IBM Plex Sans', sans-serif";
const HELV_MED = "'Helvetica Neue', Helvetica, Arial, sans-serif";

const FragmentTitle =
  "Andrew Tate Biography | The Real World Portal";

function EyeOpenIcon() {
  return (
    <svg width={17} height={13} viewBox="0 0 17 13" fill="none" aria-hidden>
      <path
        d="M8.5 0.25C4.636 0.25 1.34 2.66 0 6.25C1.34 9.84 4.636 12.25 8.5 12.25C12.364 12.25 15.66 9.84 17 6.25C15.66 2.66 12.364 0.25 8.5 0.25ZM8.5 10.25C6.291 10.25 4.5 8.459 4.5 6.25C4.5 4.041 6.291 2.25 8.5 2.25C10.709 2.25 12.5 4.041 12.5 6.25C12.5 8.459 10.709 10.25 8.5 10.25ZM8.5 4.25C7.395 4.25 6.5 5.145 6.5 6.25C6.5 7.355 7.395 8.25 8.5 8.25C9.605 8.25 10.5 7.355 10.5 6.25C10.5 5.145 9.605 4.25 8.5 4.25Z"
        fill="var(--wiki-tab-text)"
      />
    </svg>
  );
}

function EyeClosedIcon() {
  return (
    <svg width={17} height={15} viewBox="0 0 17 15" fill="none" aria-hidden>
      <path
        d="M8.5 2.5C10.709 2.5 12.5 4.291 12.5 6.5C12.5 7.02 12.39 7.51 12.21 7.97L14.54 10.3C15.77 9.29 16.73 7.99 17 6.5C15.66 2.91 12.364 0.5 8.5 0.5C7.474 0.5 6.49 0.68 5.57 0.99L7.28 2.7C7.74 2.52 8.22 2.5 8.5 2.5ZM0.94 1.37L2.69 3.12L3.08 3.51C1.73 4.55 0.68 5.93 0 6.5C1.34 10.09 4.636 12.5 8.5 12.5C9.63 12.5 10.71 12.28 11.71 11.89L12.08 12.26L14.38 14.56L15.33 13.61L1.89 0.42L0.94 1.37ZM5.18 5.61L6.32 6.75C6.29 6.83 6.27 6.92 6.27 7C6.27 8.105 7.165 9 8.27 9C8.35 9 8.44 8.98 8.52 8.95L9.66 10.09C9.24 10.3 8.78 10.43 8.27 10.43C6.061 10.43 4.27 8.639 4.27 6.43C4.27 5.92 4.4 5.46 4.61 5.04L5.18 5.61ZM8.36 4.08L10.69 6.41L10.71 6.27C10.71 5.165 9.815 4.27 8.71 4.27L8.36 4.08Z"
        fill="var(--wiki-tab-text)"
      />
    </svg>
  );
}

function SettingsIcon() {
  return (
    <svg
      width={16}
      height={16}
      viewBox="0 0 24 24"
      fill="none"
      stroke="var(--wiki-header-icon)"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx={12} cy={12} r={3} />
    </svg>
  );
}

export function WikiLink({
  children,
  href = "#",
}: {
  children: ReactNode;
  href?: string;
}) {
  return (
    <a
      href={href}
      style={{ color: "var(--wiki-article-link)", textDecoration: "none" }}
    >
      {children}
    </a>
  );
}

const infoboxLabel = {
  fontFamily: HELV_MED,
  fontWeight: 700 as const,
  fontSize: 12,
  lineHeight: "16px",
  color: "var(--wiki-infobox-title)",
};

const infoboxBodyMuted = {
  fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
  fontWeight: 400 as const,
  fontSize: 12,
  lineHeight: "16px",
  color: "var(--wiki-infobox-text)",
  opacity: 0.7,
};

export function WikiInfoboxTypeUpdated({
  typeLabel,
  showSettings,
  onSettingsClick,
}: {
  typeLabel: string;
  showSettings?: boolean;
  onSettingsClick?: () => void;
}) {
  return (
    <aside
      className="wiki-aside-infobox"
      style={{
        position: "relative",
        width: 217,
        flexShrink: 0,
        border: "1px solid var(--wiki-card-border)",
        padding: 8,
        display: "flex",
        flexDirection: "column",
        gap: 20,
        boxSizing: "border-box",
        alignSelf: "flex-start",
      }}
    >
      {showSettings ? (
        <button
          type="button"
          aria-label="Infobox settings"
          onClick={() => onSettingsClick?.()}
          style={{
            position: "absolute",
            top: -1,
            right: 0,
            width: 28,
            height: 28,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 0,
          }}
        >
          <SettingsIcon />
        </button>
      ) : null}

      <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
        <p style={infoboxLabel}>Type</p>
        <p style={{ ...infoboxBodyMuted, margin: 0 }}>{typeLabel}</p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
        <p style={infoboxLabel}>Last Updated</p>
        <p
          style={{
            ...infoboxBodyMuted,
            color: "var(--wiki-article-link)",
            margin: 0,
            whiteSpace: "nowrap",
          }}
        >
          8 Apr 2026
        </p>
      </div>
    </aside>
  );
}

export function WikiInfoboxGoalStyle({
  typeValue,
  showSettings,
  onSettingsClick,
}: {
  typeValue: string;
  showSettings?: boolean;
  onSettingsClick?: () => void;
}) {
  const linkValue = {
    ...infoboxBodyMuted,
    color: "var(--wiki-article-link)",
    margin: 0 as const,
    whiteSpace: "nowrap" as const,
  };

  const rows: { label: string; value: string; link?: boolean }[] = [
    { label: "Type", value: typeValue, link: false },
    { label: "Started", value: "8 Apr 2026", link: true },
    { label: "Target", value: "8 Apr 2026", link: true },
    { label: "Momentum", value: "In Progress", link: true },
    { label: "Last Updated", value: "8 Apr 2026", link: true },
  ];

  return (
    <aside
      className="wiki-aside-infobox"
      style={{
        position: "relative",
        width: 217,
        flexShrink: 0,
        border: "1px solid var(--wiki-card-border)",
        padding: 8,
        display: "flex",
        flexDirection: "column",
        gap: 20,
        boxSizing: "border-box",
        alignSelf: "flex-start",
        fontSize: 12,
        lineHeight: "16px",
      }}
    >
      {showSettings ? (
        <button
          type="button"
          aria-label="Infobox settings"
          onClick={() => onSettingsClick?.()}
          style={{
            position: "absolute",
            top: -1,
            right: 0,
            width: 28,
            height: 28,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 0,
          }}
        >
          <SettingsIcon />
        </button>
      ) : null}
      {rows.map((row) => (
        <div
          key={row.label}
          style={{ display: "flex", flexDirection: "column", gap: 7 }}
        >
          <p style={infoboxLabel}>{row.label}</p>
          <p
            style={
              row.link
                ? linkValue
                : { ...infoboxBodyMuted, margin: 0, whiteSpace: "normal" }
            }
          >
            {row.value}
          </p>
        </div>
      ))}
    </aside>
  );
}

function ProgressMarkersBlock({
  rows,
}: {
  rows: [string, string, string, string, boolean][];
}) {
  return (
    <div
      style={{
        border: "1px solid #282828",
        display: "flex",
        flexDirection: "column",
        gap: 8,
        width: "100%",
      }}
    >
      {rows.map(([title, body, date, status, muted], i) => (
        <div
          key={i}
          style={{
            paddingLeft: 12,
            paddingRight: 12,
            opacity: muted ? 0.3 : 1,
          }}
        >
          <div
            className="wiki-progress-marker-row"
            style={{
              display: "flex",
              gap: 26,
              alignItems: "center",
              paddingTop: 9,
              paddingBottom: 9,
              width: "100%",
            }}
          >
            <div
              style={{
                width: 40,
                height: 40,
                flexShrink: 0,
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {i === 0 ? (
                <Check
                  size={24}
                  strokeWidth={1.5}
                  color="#b9b9b9"
                  aria-hidden
                />
              ) : i === 1 ? (
                <CircleDot
                  size={24}
                  strokeWidth={1.5}
                  color="#b9b9b9"
                  aria-hidden
                />
              ) : (
                <Flag
                  size={24}
                  strokeWidth={1.5}
                  color="#b9b9b9"
                  aria-hidden
                />
              )}
            </div>
            <div
              className="wiki-progress-marker-main"
              style={{
                flex: "0 1 442px",
                display: "flex",
                flexDirection: "column",
                gap: 8,
                minWidth: 0,
              }}
            >
              <p
                style={{
                  margin: 0,
                  fontFamily: IBM,
                  fontSize: 16,
                  fontWeight: 500,
                  lineHeight: "20px",
                  letterSpacing: "0.16px",
                  color: "#d5d5d5",
                  whiteSpace: "normal",
                  wordBreak: "break-word",
                }}
              >
                {title}
              </p>
              <p
                style={{
                  margin: 0,
                  fontFamily: "var(--font-inter), Inter, sans-serif",
                  fontSize: 14,
                  fontWeight: 400,
                  lineHeight: "22px",
                  color: "var(--wiki-article-text)",
                }}
              >
                {body}
              </p>
            </div>
            <div
              className="wiki-progress-marker-side"
              style={{
                flex: 1,
                display: "flex",
                justifyContent: "flex-end",
                textAlign: "right",
                minWidth: 0,
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                  alignItems: "flex-end",
                }}
              >
                <p
                  style={{
                    margin: 0,
                    fontFamily: IBM,
                    fontSize: 16,
                    fontWeight: 500,
                    lineHeight: "20px",
                    letterSpacing: "0.16px",
                    color: "#d5d5d5",
                    whiteSpace: "nowrap",
                  }}
                >
                  {date}
                </p>
                <p
                  style={{
                    margin: 0,
                    fontFamily: "var(--font-inter), Inter, sans-serif",
                    fontSize: 14,
                    fontWeight: 400,
                    lineHeight: "22px",
                    color: "var(--wiki-article-text)",
                    maxWidth: 171,
                  }}
                >
                  {status}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function WikiProgressMarkersSection({
  variant = "goal",
}: {
  variant?: "goal" | "project";
}) {
  const row1Body =
    variant === "project"
      ? "First real proof — covers team costs and proves repeatable sales."
      : "Team costs and proves repeatable sales.";
  const rows: [string, string, string, string, boolean][] = [
    ["$500k ARR", row1Body, "Mar 2025", "Achieved", false],
    [
      "$500k ARR",
      variant === "project"
        ? "First real proof — covers team costs and proves repeatable sales."
        : "First real proof",
      "April 2025",
      "In Progress",
      false,
    ],
    [
      "$500k ARR",
      variant === "project"
        ? "First real proof — covers team costs and"
        : "First real proof — covers team costs and",
      "Dec 2026",
      "Not Started",
      true,
    ],
  ];

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 24,
        width: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 11,
          paddingTop: 20,
          width: "100%",
        }}
      >
        <h2
          style={{
            margin: 0,
            fontFamily:
              "var(--font-source-serif-4), 'Source Serif 4', 'Source Serif Pro', serif",
            fontSize: 24,
            fontWeight: 400,
            lineHeight: "30px",
            color: "var(--wiki-article-h2)",
          }}
        >
          Progress Markers
        </h2>
        <div
          style={{
            height: 1,
            width: "100%",
            background: "var(--wiki-meta-line)",
          }}
        />
      </div>
      <ProgressMarkersBlock rows={rows} />
    </div>
  );
}

export function WikiIntroLead() {
  return (
    <p
      style={{
        margin: 0,
        fontFamily: "var(--font-inter), Inter, sans-serif",
        fontSize: 14,
        fontWeight: 400,
        lineHeight: "22px",
        color: "var(--wiki-article-text)",
      }}
    >
      Audre Lorde (
      <WikiLink>/ˈɔːdri ˈlɔːrd/</WikiLink>; born Audrey Geraldine Lorde;
      February 18, 1934 – November 17, 1992) was an American writer,{" "}
      <WikiLink>feminist</WikiLink>, <WikiLink>womanist</WikiLink>,{" "}
      <WikiLink>librarian</WikiLink>, and <WikiLink>civil rights</WikiLink>{" "}
      activist. She was a self-described
    </p>
  );
}

export function WikiBiographyBlock() {
  return (
    <p style={{ margin: 0 }}>
      Lorde was born in New York City to Caribbean immigrants. Her father,
      Frederick Byron Lorde, (known as Byron) hailed from Barbados and her
      mother, Linda Gertrude Belmar Lorde, was Grenadian and had been born in
      the island of <WikiLink>Carriacou</WikiLink>. Lorde&apos;s mother was of
      mixed ancestry but could &ldquo;<WikiLink>pass</WikiLink>&rdquo; for
      &lsquo;
      <WikiLink>Spanish</WikiLink>&rsquo;,
      <WikiLink>[4]</WikiLink> which was a source of pride for her family.
      Lorde&apos;s father was darker than the Belmar family liked, and they
      only allowed the couple to marry because of Byron Lorde&apos;s charm,
      ambition, and persistence.
      <WikiLink>[5]</WikiLink> The family settled in <WikiLink>Harlem</WikiLink>
      . <WikiLink>Nearsighted</WikiLink> to the point of{" "}
      <WikiLink>being legally</WikiLink> blind and the youngest of three
      daughters (her two older sisters were named Phyllis and Helen), Lorde grew
      up hearing her mother&apos;s stories about the <WikiLink>West Indies</WikiLink>
      . At the age of four, she learned to talk while she learned to read, and
      her mother taught her to write at around the same time. She wrote her
      first poem when she was in eighth grade.
    </p>
  );
}

export function WikiDesktopH4Lorem({ paragraphs = 1 }: { paragraphs?: 1 | 2 }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <h4
        style={{
          margin: 0,
          paddingTop: 6,
          fontFamily: HELV_MED,
          fontSize: 14,
          fontWeight: 700,
          lineHeight: "22.4px",
          color: "var(--wiki-article-text)",
        }}
      >
        Desktop H4
      </h4>
      <p
        style={{
          margin: 0,
          fontFamily: "var(--font-inter), Inter, sans-serif",
          fontSize: 14,
          fontWeight: 400,
          lineHeight: "22px",
          color: "var(--wiki-article-text)",
        }}
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis
      </p>
      {paragraphs === 2 ? (
        <p
          style={{
            margin: 0,
            fontFamily: "var(--font-inter), Inter, sans-serif",
            fontSize: 14,
            fontWeight: 400,
            lineHeight: "22px",
            color: "var(--wiki-article-text)",
          }}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
          veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
          commodo consequat. Duis
        </p>
      ) : null}
    </div>
  );
}

export function WikiSectionH2({ title }: { title: string }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 4,
        paddingTop: 20,
        width: "100%",
      }}
    >
      <h2
        style={{
          margin: 0,
          fontFamily:
            "var(--font-source-serif-4), 'Source Serif 4', 'Source Serif Pro', serif",
          fontSize: 24,
          fontWeight: 400,
          lineHeight: "30px",
          color: "var(--wiki-article-h2)",
        }}
      >
        {title}
      </h2>
      <div
        style={{
          height: 1,
          width: "100%",
          background: "var(--wiki-meta-line)",
        }}
      />
    </div>
  );
}

function MemberFragmentsSection() {
  return (
    <section style={{ width: "100%" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
          <p
            style={{
              margin: 0,
              fontFamily: HELV_MED,
              fontSize: 14,
              fontWeight: 500,
              lineHeight: "26.88px",
              color: "#9c9c9c",
            }}
          >
            MEMBER FRAGMENTS (4)
          </p>
          <div style={{ height: 1, width: "100%", background: "#313131" }} />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 8,
            paddingTop: 20,
          }}
        >
          {[1, 2, 3, 4].map((n) => (
            <div
              key={n}
              style={{ display: "flex", alignItems: "center", gap: 6 }}
            >
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "2px 8px",
                  flexShrink: 0,
                  fontFamily: "var(--font-inter), Inter, sans-serif",
                  fontSize: 12,
                  fontWeight: 400,
                  lineHeight: 1.5,
                  letterSpacing: "-0.0288px",
                  color: "rgba(242, 229, 229, 0.7)",
                }}
              >
                {n}.
              </span>
                  <a
                    href="#"
                    className="wiki-fragment-link"
                    style={{
                      fontFamily: IBM,
                      fontSize: 16,
                      fontWeight: 400,
                      lineHeight: "20px",
                      letterSpacing: "0.16px",
                      color: "var(--wiki-fragment-link)",
                      textDecoration: "underline",
                      textDecorationSkipInk: "none",
                    }}
                  >
                {FragmentTitle}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function MentionedPeopleSection() {
  const Person = () => (
    <>
      <div
        style={{
          width: 40,
          height: 40,
          flexShrink: 0,
          background: "#191919",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <UserRound size={24} color="#6b6b6b" aria-hidden />
      </div>
      <div
        style={{
          flex: 1,
          minWidth: 0,
          display: "flex",
          flexDirection: "column",
          gap: 8,
        }}
      >
        <p
          style={{
            margin: 0,
            fontFamily: IBM,
            fontSize: 16,
            fontWeight: 500,
            lineHeight: "20px",
            letterSpacing: "0.16px",
            color: "#d5d5d5",
          }}
        >
          Marcus Chen
        </p>
        <p
          style={{
            margin: 0,
            fontFamily: "var(--font-inter), Inter, sans-serif",
            fontSize: 14,
            fontWeight: 400,
            lineHeight: "22px",
            color: "var(--wiki-article-text)",
          }}
        >
          Colleague. Frequent discussions about politics, leadership, and
          presidential decision-making
        </p>
        <div
          style={{
            display: "flex",
            gap: 3,
            alignItems: "center",
            fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
            fontSize: 12,
            lineHeight: "17px",
            color: "#444",
            whiteSpace: "nowrap",
          }}
        >
          <span>Mentioned in 7 fragments </span>
          <span style={{ lineHeight: "10px" }}>•</span>
          <span>Last seen 1 week ago</span>
        </div>
      </div>
    </>
  );

  return (
    <section className="wiki-mentioned-section" style={{ width: "100%", maxWidth: 864 }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            paddingBottom: 16,
            width: "100%",
          }}
        >
          <p
            style={{
              margin: 0,
              fontFamily: HELV_MED,
              fontSize: 14,
              fontWeight: 500,
              lineHeight: "26.88px",
              color: "#9c9c9c",
            }}
          >
            MENTIONED PEOPLE (2)
          </p>
          <div style={{ height: 1, width: "100%", background: "#313131" }} />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 24,
            paddingTop: 4,
            paddingBottom: 4,
          }}
        >
          <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
            <Person />
          </div>
          <div style={{ height: 1, width: "100%", background: "#141414" }} />
          <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
            <Person />
          </div>
        </div>
      </div>
    </section>
  );
}

export type WikiEntityInfoboxConfig =
  | { kind: "simple"; typeLabel: string; showSettings?: boolean }
  | { kind: "extended"; typeValue: string; showSettings?: boolean };

export type WikiEntityArticleProps = {
  chipIcon: LucideIcon;
  chipLabel: string;
  title: string;
  titleEllipsis?: boolean;
  /** Voice layout: full-width rule before member fragments */
  dividerBeforeFragments?: boolean;
  /** Figma agent: divider under title row is hidden */
  showTitleUnderline?: boolean;
  infobox: WikiEntityInfoboxConfig;
  children: ReactNode;
};

function renderInfobox(
  config: WikiEntityInfoboxConfig,
  onSettingsClick?: () => void,
) {
  if (config.kind === "simple") {
    return (
      <WikiInfoboxTypeUpdated
        typeLabel={config.typeLabel}
        showSettings={config.showSettings}
        onSettingsClick={onSettingsClick}
      />
    );
  }
  return (
    <WikiInfoboxGoalStyle
      typeValue={config.typeValue}
      showSettings={config.showSettings}
      onSettingsClick={onSettingsClick}
    />
  );
}

export function WikiEntityArticle({
  chipIcon: ChipIcon,
  chipLabel,
  title,
  titleEllipsis = false,
  dividerBeforeFragments = false,
  showTitleUnderline = true,
  infobox,
  children,
}: WikiEntityArticleProps) {
  const [infoVisible, setInfoVisible] = useState(true);
  const [wikiSettingsOpen, setWikiSettingsOpen] = useState(false);

  const wikiSettingsPrefill = useMemo(
    () => wikiEntitySettingsPrefill({ title, chipLabel }),
    [title, chipLabel],
  );

  const tabs = ["Read", "Edit", "View history"] as const;

  return (
    <div className="wiki-article-wrapper">
      <div
        style={{
          width: "100%",
          maxWidth: 864,
          display: "flex",
          flexDirection: "column",
          gap: 56,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 22,
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 8,
              width: "100%",
            }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 4,
                padding: "2px 8px",
                background: "#141414",
                width: "fit-content",
              }}
            >
              <ChipIcon
                size={12}
                strokeWidth={1.5}
                color="rgba(140, 140, 140, 0.7)"
                aria-hidden
              />
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
                {chipLabel}
              </span>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 4,
                width: "100%",
              }}
            >
              <div
                className="wiki-article-title-wrap"
                style={{
                  position: "relative",
                  minHeight: 35,
                  width: "100%",
                }}
              >
                <h1
                  className="wiki-article-h1"
                  style={{
                    position: "absolute",
                    left: 0,
                    top: "calc(50% - 17.5px)",
                    margin: 0,
                    maxWidth: "calc(100% - 200px)",
                    fontFamily:
                      "var(--font-source-serif-4), 'Source Serif 4', 'Source Serif Pro', serif",
                    fontSize: 28,
                    fontWeight: 400,
                    lineHeight: "35px",
                    color: "var(--wiki-title)",
                    overflow: titleEllipsis ? "hidden" : undefined,
                    textOverflow: titleEllipsis ? "ellipsis" : undefined,
                    whiteSpace: titleEllipsis ? "nowrap" : undefined,
                  }}
                >
                  {title}
                </h1>
                <div
                  className="wiki-article-tabs"
                  style={{
                    position: "absolute",
                    right: 0,
                    top: -4.12,
                    display: "flex",
                    alignItems: "flex-end",
                    gap: 13,
                    height: 49,
                  }}
                >
                  {tabs.map((tab, i) => (
                    <button
                      key={tab}
                      type="button"
                      style={{
                        background: "none",
                        border: "none",
                        borderBottom:
                          i === 0
                            ? "1px solid #aebdcf"
                            : "1px solid transparent",
                        cursor: "pointer",
                        fontFamily: "var(--font-inter), Inter, sans-serif",
                        fontSize: 14,
                        fontWeight: 400,
                        lineHeight: "20px",
                        color: "var(--wiki-tab-text)",
                        padding: "16px 0 7px",
                        whiteSpace: "nowrap",
                        boxSizing: "border-box",
                        minHeight: 49,
                        display: "flex",
                        alignItems: "flex-end",
                      }}
                    >
                      {tab}
                    </button>
                  ))}
                  <button
                    type="button"
                    title={infoVisible ? "Hide infobox" : "Show infobox"}
                    onClick={() => setInfoVisible((v) => !v)}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 24,
                      height: "100%",
                      padding: 0,
                    }}
                  >
                    {infoVisible ? <EyeOpenIcon /> : <EyeClosedIcon />}
                  </button>
                </div>
              </div>
              {showTitleUnderline ? (
                <div
                  style={{
                    height: 1,
                    width: "100%",
                    background: "var(--wiki-search-section-line)",
                  }}
                />
              ) : null}
            </div>
          </div>

          <div
            className="wiki-article-layout"
            style={{
              display: "flex",
              gap: 16,
              alignItems: "flex-start",
              width: "100%",
            }}
          >
            <div
              className="wiki-article-content"
              style={{
                flex: 1,
                minWidth: 0,
                display: "flex",
                flexDirection: "column",
                gap: 8,
              }}
            >
              {children}
            </div>

            {infoVisible
              ? renderInfobox(
                  infobox,
                  (infobox.kind === "simple" || infobox.kind === "extended") &&
                    infobox.showSettings
                    ? () => setWikiSettingsOpen(true)
                    : undefined,
                )
              : null}
          </div>
        </div>

        {dividerBeforeFragments ? (
          <div
            style={{
              height: 1,
              width: "100%",
              background: "#161616",
              flexShrink: 0,
            }}
          />
        ) : null}

        <MemberFragmentsSection />
        <MentionedPeopleSection />
      </div>

      <AddWikiModal
        open={wikiSettingsOpen}
        onClose={() => setWikiSettingsOpen(false)}
        title="Wiki Settings"
        confirmLabel="Edit Wiki"
        prefill={wikiSettingsPrefill}
      />
    </div>
  );
}
