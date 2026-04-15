"use client";

import { useMemo, useState, type ReactNode } from "react";
import AddWikiModal from "@/components/layout/AddWikiModal";
import { wikiEntitySettingsPrefill } from "@/lib/wikiSettingsPrefill";

const IBM = "var(--font-ibm-plex-sans), 'IBM Plex Sans', sans-serif";
const HELV_MED = "'Helvetica Neue', Helvetica, Arial, sans-serif";

const FragmentTitle =
  "Andrew Tate Biography | The Real World Portal";

function PeopleUserIcon() {
  return (
    <svg
      width={12}
      height={12}
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden
    >
      <circle
        cx="6"
        cy="4"
        r="2"
        stroke="rgba(189, 141, 141, 0.7)"
        strokeWidth="1"
      />
      <path
        d="M2.5 10.5c.8-2.2 2.8-3.5 3.5-3.5s2.7 1.3 3.5 3.5"
        stroke="rgba(189, 141, 141, 0.7)"
        strokeWidth="1"
        strokeLinecap="round"
      />
    </svg>
  );
}

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

function Link({
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

function PeopleInfobox({
  visible,
  onSettingsClick,
}: {
  visible: boolean;
  onSettingsClick?: () => void;
}) {
  if (!visible) return null;

  const label = {
    fontFamily: HELV_MED,
    fontWeight: 700 as const,
    fontSize: 12,
    lineHeight: "16px",
    color: "var(--wiki-infobox-title)",
  };

  const body = {
    fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
    fontWeight: 400 as const,
    fontSize: 12,
    lineHeight: "16px",
    color: "var(--wiki-infobox-text)",
    opacity: 0.7,
  };

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

      <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
        <p style={label}>Relationship</p>
        <div style={body}>
          <p style={{ margin: 0 }}>Audrey Geraldine Lorde</p>
          <p style={{ margin: 0 }}>
            February 18, 1934
            <span
              style={{
                color: "var(--wiki-article-link)",
                fontSize: 7.74,
                verticalAlign: "super",
              }}
            >
              [1]
            </span>
          </p>
          <p style={{ margin: 0 }}>
            <Link>New York City</Link>, U.S.
          </p>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
        <p style={label}>Last Updated</p>
        <p
          style={{
            ...body,
            color: "var(--wiki-article-link)",
            margin: 0,
            whiteSpace: "nowrap",
          }}
        >
          8 Apr 2026
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
        <p style={label}>Who They Are</p>
        <div style={body}>
          <p style={{ margin: 0 }}>Poetry</p>
          <p style={{ margin: 0 }}>Nonfiction</p>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
        <p style={label}>How They Think</p>
        <div style={{ ...body, fontStyle: "italic" }}>
          <p style={{ margin: 0 }}>The First Cities</p>
          <p style={{ margin: 0 }}>
            <Link>Zami: A New Spelling of My Name</Link>
          </p>
          <p style={{ margin: 0 }}>
            <Link>The Cancer Journals</Link>
          </p>
        </div>
      </div>
    </aside>
  );
}

/** Figma 269:44658 — People wiki (Audre Lorde) */
export default function WikiPeoplePage() {
  const [infoVisible, setInfoVisible] = useState(true);
  const [wikiSettingsOpen, setWikiSettingsOpen] = useState(false);

  const wikiSettingsPrefill = useMemo(
    () =>
      wikiEntitySettingsPrefill({
        title: "Audre Lorde",
        chipLabel: "People",
      }),
    [],
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
        {/* Title + Content — Figma gap 22px inside first block */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 22,
            width: "100%",
          }}
        >
          {/* Chrome — gap 8px */}
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
                background: "#251813",
                width: "fit-content",
              }}
            >
              <PeopleUserIcon />
              <span
                style={{
                  fontFamily: "var(--font-inter), Inter, sans-serif",
                  fontSize: 12,
                  fontWeight: 400,
                  lineHeight: 1.5,
                  letterSpacing: "-0.0288px",
                  color: "rgba(189, 141, 141, 0.7)",
                  whiteSpace: "nowrap",
                }}
              >
                People
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
                  }}
                >
                  Audre Lorde
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
                          i === 0 ? "1px solid #aebdcf" : "1px solid transparent",
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
              <div
                style={{
                  height: 1,
                  width: "100%",
                  background: "var(--wiki-search-section-line)",
                }}
              />
            </div>
          </div>

          {/* Article + infobox — gap 16 */}
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
              <div
                style={{
                  fontFamily: "var(--font-inter), Inter, sans-serif",
                  fontSize: 14,
                  fontWeight: 400,
                  lineHeight: "22px",
                  color: "var(--wiki-article-text)",
                }}
              >
                <p style={{ marginBottom: 0 }}>
                  Audre Lorde (
                  <Link>/ˈɔːdri ˈlɔːrd/</Link>; born Audrey Geraldine Lorde;
                  February 18, 1934 – November 17, 1992) was an American writer,{" "}
                  <Link>feminist</Link>, <Link>womanist</Link>,{" "}
                  <Link>librarian</Link>, and <Link>civil rights</Link> activist.
                  She was a self-described &ldquo;black, lesbian, mother, warrior,
                  poet,&rdquo; who &ldquo;dedicated both her life and her creative
                  talent to confronting and addressing injustices of{" "}
                  <Link>racism</Link>, <Link>sexism</Link>,{" "}
                  <Link>classism</Link>, and <Link>homophobia</Link>.&rdquo;
                  <Link>[1]</Link>
                </p>
                <p style={{ marginBottom: 0 }}>
                  As a poet, she is best known for technical mastery and emotional
                  expression, as well as her poems that express anger and outrage
                  at civil and social injustices she observed throughout her
                  life. As a <Link>spoken word</Link> artist, her delivery has
                  been called powerful, melodic, and intense by the Poetry
                  Foundation.
                  <Link>[1]</Link> Her poems and prose largely deal with issues
                  related to civil rights, feminism, lesbianism, illness and
                  disability, and the exploration of black female identity.
                  <Link>[2][1][3]</Link>
                </p>
              </div>

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
                  Who They Are
                </h2>
                <div
                  style={{
                    height: 1,
                    width: "100%",
                    background: "var(--wiki-meta-line)",
                  }}
                />
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                }}
              >
                <h3
                  style={{
                    margin: 0,
                    paddingTop: 8,
                    fontFamily: HELV_MED,
                    fontSize: 16.8,
                    fontWeight: 700,
                    lineHeight: "26.88px",
                    color: "var(--wiki-article-text)",
                  }}
                >
                  Desktop H3
                </h3>
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
                  Lorde was born in New York City to Caribbean immigrants. Her
                  father, Frederick Byron Lorde, (known as Byron) hailed from
                  Barbados and her mother, Linda Gertrude Belmar Lorde, was
                  Grenadian and had been born in the island of{" "}
                  <Link>Carriacou</Link>. Lorde&apos;s mother was of mixed ancestry
                  but could &ldquo;<Link>pass</Link>&rdquo; for &lsquo;
                  <Link>Spanish</Link>&rsquo;,
                  <Link>[4]</Link> which was a source of pride for her family.
                  Lorde&apos;s father was darker than the Belmar family liked,
                  and they only allowed the couple to marry because of Byron
                  Lorde&apos;s charm, ambition, and persistence.
                  <Link>[5]</Link> The family settled in <Link>Harlem</Link>.{" "}
                  <Link>Nearsighted</Link> to the point of{" "}
                  <Link>being legally</Link> blind and the youngest of three
                  daughters (her two older sisters were named Phyllis and Helen),
                  Lorde grew up hearing her mother&apos;s stories about the{" "}
                  <Link>West Indies</Link>. At the age of four, she learned to
                  talk while she learned to read, and her mother taught her to
                  write at around the same time. She wrote her first poem when
                  she was in eighth grade.
                </p>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                }}
              >
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
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                  eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                  enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis
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
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                  eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                  enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis
                </p>
              </div>
            </div>

            <PeopleInfobox
              visible={infoVisible}
              onSettingsClick={() => setWikiSettingsOpen(true)}
            />
          </div>
        </div>

        <div
          style={{
            height: 1,
            width: "100%",
            background: "#161616",
            flexShrink: 0,
          }}
        />

        <section style={{ width: "100%" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 8,
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
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
                FRAGMENTS (4)
              </p>
              <div
                style={{
                  height: 1,
                  width: "100%",
                  background: "#313131",
                }}
              />
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
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                  }}
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
