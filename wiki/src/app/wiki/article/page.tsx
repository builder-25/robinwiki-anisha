"use client";

import { useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

const EyeOpenIcon = () => (
  <svg
    width="17"
    height="12.75"
    viewBox="0 0 17 13"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ flexShrink: 0 }}
  >
    <path
      d="M8.5 0.25C4.636 0.25 1.34 2.66 0 6.25C1.34 9.84 4.636 12.25 8.5 12.25C12.364 12.25 15.66 9.84 17 6.25C15.66 2.66 12.364 0.25 8.5 0.25ZM8.5 10.25C6.291 10.25 4.5 8.459 4.5 6.25C4.5 4.041 6.291 2.25 8.5 2.25C10.709 2.25 12.5 4.041 12.5 6.25C12.5 8.459 10.709 10.25 8.5 10.25ZM8.5 4.25C7.395 4.25 6.5 5.145 6.5 6.25C6.5 7.355 7.395 8.25 8.5 8.25C9.605 8.25 10.5 7.355 10.5 6.25C10.5 5.145 9.605 4.25 8.5 4.25Z"
      fill="var(--wiki-tab-text)"
    />
  </svg>
);

const EyeClosedIcon = () => (
  <svg
    width="17"
    height="15"
    viewBox="0 0 17 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8.5 2.5C10.709 2.5 12.5 4.291 12.5 6.5C12.5 7.02 12.39 7.51 12.21 7.97L14.54 10.3C15.77 9.29 16.73 7.99 17 6.5C15.66 2.91 12.364 0.5 8.5 0.5C7.474 0.5 6.49 0.68 5.57 0.99L7.28 2.7C7.74 2.52 8.22 2.5 8.5 2.5ZM0.94 1.37L2.69 3.12L3.08 3.51C1.73 4.55 0.68 5.93 0 6.5C1.34 10.09 4.636 12.5 8.5 12.5C9.63 12.5 10.71 12.28 11.71 11.89L12.08 12.26L14.38 14.56L15.33 13.61L1.89 0.42L0.94 1.37ZM5.18 5.61L6.32 6.75C6.29 6.83 6.27 6.92 6.27 7C6.27 8.105 7.165 9 8.27 9C8.35 9 8.44 8.98 8.52 8.95L9.66 10.09C9.24 10.3 8.78 10.43 8.27 10.43C6.061 10.43 4.27 8.639 4.27 6.43C4.27 5.92 4.4 5.46 4.61 5.04L5.18 5.61ZM8.36 4.08L10.69 6.41L10.71 6.27C10.71 5.165 9.815 4.27 8.71 4.27L8.36 4.08Z"
      fill="var(--wiki-tab-text)"
    />
  </svg>
);

const UserStrokeIcon = () => (
  <svg
    width="7.708"
    height="7.708"
    viewBox="0 0 8 8"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ flexShrink: 0 }}
  >
    <path
      d="M4 0.5C4.66304 0.5 5.29893 0.763392 5.76777 1.23223C6.23661 1.70107 6.5 2.33696 6.5 3C6.5 3.66304 6.23661 4.29893 5.76777 4.76777C5.29893 5.23661 4.66304 5.5 4 5.5C3.33696 5.5 2.70107 5.23661 2.23223 4.76777C1.76339 4.29893 1.5 3.66304 1.5 3C1.5 2.33696 1.76339 1.70107 2.23223 1.23223C2.70107 0.763392 3.33696 0.5 4 0.5ZM4 6.25C5.66 6.25 7.5 7.065 7.5 7.375V7.5H0.5V7.375C0.5 7.065 2.34 6.25 4 6.25Z"
      stroke="#be9f59"
      strokeWidth="0.75"
    />
  </svg>
);

function InfoBox({ visible }: { visible: boolean }) {
  if (!visible) return null;

  const sectionTitleStyle = {
    fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
    fontWeight: 700 as const,
    fontSize: 12,
    lineHeight: "16px",
    color: "var(--wiki-infobox-title)",
  };

  const sectionTextStyle = {
    fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
    fontWeight: 400 as const,
    fontSize: 12,
    lineHeight: "16px",
    color: "var(--wiki-infobox-text)",
  };

  return (
    <Collapsible defaultOpen>
      <div
        className="wiki-article-infobox"
        style={{
          border: "1px solid var(--wiki-card-border)",
          width: 217,
          flexShrink: 0,
          padding: 8,
          display: "flex",
          flexDirection: "column",
          gap: 20,
          fontSize: 12,
          overflow: "hidden",
          alignSelf: "flex-start",
        }}
      >
        {/* Relationship — collapsible */}
        <div>
          <CollapsibleTrigger
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 0,
              width: "100%",
              textAlign: "left",
            }}
          >
            <p style={sectionTitleStyle}>Relationship</p>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div style={{ ...sectionTextStyle, marginTop: 7 }}>
              <p>Audrey Geraldine Lorde</p>
              <p>
                February 18, 1934
                <span
                  style={{
                    color: "var(--wiki-article-link)",
                    fontSize: 7.74,
                  }}
                >
                  [1]
                </span>
              </p>
              <p>
                <a
                  href="#"
                  style={{
                    color: "var(--wiki-article-link)",
                    textDecoration: "none",
                  }}
                >
                  New York City
                </a>
                , U.S.
              </p>
            </div>
          </CollapsibleContent>
        </div>

        {/* Last Updated */}
        <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
          <p style={sectionTitleStyle}>Last Updated</p>
          <p
            style={{
              ...sectionTextStyle,
              color: "var(--wiki-article-link)",
              opacity: 0.7,
            }}
          >
            8 Apr 2026
          </p>
        </div>

        {/* Who They Are */}
        <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
          <p style={sectionTitleStyle}>Who They Are</p>
          <div style={sectionTextStyle}>
            <p>Poetry</p>
            <p>Nonfiction</p>
          </div>
        </div>

        {/* How They Think */}
        <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
          <p style={sectionTitleStyle}>How They Think</p>
          <div style={{ ...sectionTextStyle, fontStyle: "italic" }}>
            <p>The First Cities</p>
            <p>
              <a
                href="#"
                style={{
                  color: "var(--wiki-article-link)",
                  textDecoration: "none",
                }}
              >
                Zami: A New Spelling of My Name
              </a>
            </p>
            <p>
              <a
                href="#"
                style={{
                  color: "var(--wiki-article-link)",
                  textDecoration: "none",
                }}
              >
                The Cancer Journals
              </a>
            </p>
          </div>
        </div>
      </div>
    </Collapsible>
  );
}

function ArticleLink({
  children,
  href = "#",
}: {
  children: React.ReactNode;
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

export default function ArticlePage() {
  const [infoBoxVisible, setInfoBoxVisible] = useState(true);

  return (
    <div className="wiki-article-wrapper">
      {/* People chip */}
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 1.542,
          paddingLeft: 3.364,
          paddingRight: 3.364,
          paddingTop: 0.561,
          paddingBottom: 0.561,
          borderRadius: 9999,
          border: "0.561px solid rgba(201, 187, 63, 0.19)",
          background: "#1e1b12",
          color: "#be9f59",
          fontFamily: "var(--font-inter), Inter, sans-serif",
          fontWeight: 400,
          fontSize: 7.849,
          lineHeight: "11.212px",
          whiteSpace: "nowrap",
          marginBottom: 8,
        }}
      >
        <UserStrokeIcon />
        People
      </span>

      {/* Title + Tabs row */}
      <div
        className="wiki-article-title-wrap"
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: 16,
          flexWrap: "wrap",
        }}
      >
        <h1
          className="wiki-article-h1"
          style={{
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
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "flex-end",
            gap: 13,
            height: 49,
            position: "relative",
            top: -4.12,
          }}
        >
          {["Read", "Edit", "View history"].map((tab) => (
            <button
              key={tab}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                fontFamily: "var(--font-inter), Inter, sans-serif",
                fontSize: 14,
                fontWeight: 400,
                lineHeight: "20px",
                color: "var(--wiki-tab-text)",
                padding: "16px 0 8px",
                whiteSpace: "nowrap",
              }}
            >
              {tab}
            </button>
          ))}
          <button
            onClick={() => setInfoBoxVisible((prev) => !prev)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: 24,
              height: "100%",
              padding: 0,
              overflow: "hidden",
              flexShrink: 0,
            }}
            title={infoBoxVisible ? "Hide info box" : "Show info box"}
          >
            {infoBoxVisible ? <EyeOpenIcon /> : <EyeClosedIcon />}
          </button>
        </div>
      </div>

      {/* Article content + Info box */}
      <div
        className="wiki-article-layout"
        style={{
          marginTop: 22,
          display: "flex",
          gap: 16,
          alignItems: "flex-start",
        }}
      >
        {/* Main article text */}
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
          {/* Intro paragraphs */}
          <div
            style={{
              fontFamily: "var(--font-inter), Inter, sans-serif",
              fontWeight: 400,
              fontSize: 14,
              lineHeight: "22px",
              color: "var(--wiki-article-text)",
            }}
          >
            <p style={{ marginBottom: 0 }}>
              Audre Lorde (
              <ArticleLink>/ˈɔːdri ˈlɔːrd/</ArticleLink>; born Audrey
              Geraldine Lorde; February 18, 1934 – November 17, 1992) was an
              American writer, <ArticleLink>feminist</ArticleLink>,{" "}
              <ArticleLink>womanist</ArticleLink>,{" "}
              <ArticleLink>librarian</ArticleLink>, and{" "}
              <ArticleLink>civil rights</ArticleLink> activist. She was a
              self-described &ldquo;black, lesbian, mother, warrior,
              poet,&rdquo; who &ldquo;dedicated both her life and her creative
              talent to confronting and addressing injustices of{" "}
              <ArticleLink>racism</ArticleLink>,{" "}
              <ArticleLink>sexism</ArticleLink>,{" "}
              <ArticleLink>classism</ArticleLink>, and{" "}
              <ArticleLink>homophobia</ArticleLink>.&rdquo;
              <ArticleLink>[1]</ArticleLink>
            </p>
            <p>
              As a poet, she is best known for technical mastery and emotional
              expression, as well as her poems that express anger and outrage at
              civil and social injustices she observed throughout her life. As a{" "}
              <ArticleLink>spoken word</ArticleLink> artist, her delivery has
              been called powerful, melodic, and intense by the Poetry
              Foundation.
              <ArticleLink>[1]</ArticleLink> Her poems and prose largely deal
              with issues related to civil rights, feminism, lesbianism, illness
              and disability, and the exploration of black female identity.
              <ArticleLink>[2][1][3]</ArticleLink>
            </p>
          </div>

          {/* Early life heading */}
          <div style={{ paddingTop: 20 }}>
            <h2
              style={{
                fontFamily:
                  "var(--font-source-serif-4), 'Source Serif 4', 'Source Serif Pro', serif",
                fontSize: 24,
                fontWeight: 400,
                lineHeight: "30px",
                color: "var(--wiki-article-h2)",
                marginBottom: 4,
              }}
            >
              Early life
            </h2>
            <div
              style={{
                height: 1,
                background: "var(--wiki-meta-line)",
                width: "100%",
              }}
            />
          </div>

          {/* H3 + text */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 8,
            }}
          >
            <h3
              style={{
                fontFamily:
                  "'Helvetica Neue', Helvetica, Arial, sans-serif",
                fontSize: 16.8,
                fontWeight: 700,
                lineHeight: "26.88px",
                color: "var(--wiki-article-text)",
                paddingTop: 8,
              }}
            >
              Desktop H3
            </h3>
            <p
              style={{
                fontFamily: "var(--font-inter), Inter, sans-serif",
                fontWeight: 400,
                fontSize: 14,
                lineHeight: "22px",
                color: "var(--wiki-article-text)",
              }}
            >
              Lorde was born in New York City to Caribbean immigrants. Her
              father, Frederick Byron Lorde, (known as Byron) hailed from
              Barbados and her mother, Linda Gertrude Belmar Lorde, was
              Grenadian and had been born in the island of{" "}
              <ArticleLink>Carriacou</ArticleLink>. Lorde&apos;s mother was of
              mixed ancestry but could &ldquo;
              <ArticleLink>pass</ArticleLink>&rdquo; for &lsquo;
              <ArticleLink>Spanish</ArticleLink>&rsquo;,
              <ArticleLink>[4]</ArticleLink> which was a source of pride for her
              family. Lorde&apos;s father was darker than the Belmar family
              liked, and they only allowed the couple to marry because of Byron
              Lorde&apos;s charm, ambition, and persistence.
              <ArticleLink>[5]</ArticleLink> The family settled in{" "}
              <ArticleLink>Harlem</ArticleLink>.{" "}
              <ArticleLink>Nearsighted</ArticleLink> to the point of{" "}
              <ArticleLink>being legally</ArticleLink> blind and the youngest of
              three daughters (her two older sisters were named Phyllis and
              Helen), Lorde grew up hearing her mother&apos;s stories about the{" "}
              <ArticleLink>West Indies</ArticleLink>. At the age of four, she
              learned to talk while she learned to read, and her mother taught
              her to write at around the same time. She wrote her first poem when
              she was in eighth grade.
            </p>
          </div>

          {/* H4 + text */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 8,
            }}
          >
            <h4
              style={{
                fontFamily:
                  "'Helvetica Neue', Helvetica, Arial, sans-serif",
                fontSize: 14,
                fontWeight: 700,
                lineHeight: "22.4px",
                color: "var(--wiki-article-text)",
                paddingTop: 6,
              }}
            >
              Desktop H4
            </h4>
            <p
              style={{
                fontFamily: "var(--font-inter), Inter, sans-serif",
                fontWeight: 400,
                fontSize: 14,
                lineHeight: "22px",
                color: "var(--wiki-article-text)",
              }}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
              ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
              aliquip ex ea commodo consequat. Duis
            </p>
            <p
              style={{
                fontFamily: "var(--font-inter), Inter, sans-serif",
                fontWeight: 400,
                fontSize: 14,
                lineHeight: "22px",
                color: "var(--wiki-article-text)",
              }}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
              ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
              aliquip ex ea commodo consequat. Duis
            </p>
          </div>

          {/* References heading */}
          <div style={{ paddingTop: 20 }}>
            <h2
              style={{
                fontFamily:
                  "var(--font-source-serif-4), 'Source Serif 4', 'Source Serif Pro', serif",
                fontSize: 24,
                fontWeight: 400,
                lineHeight: "30px",
                color: "var(--wiki-article-h2)",
                marginBottom: 4,
              }}
            >
              References
            </h2>
            <div
              style={{
                height: 1,
                background: "var(--wiki-meta-line)",
                width: "100%",
              }}
            />
          </div>
        </div>

        {/* Info box — toggled by eye icon */}
        <InfoBox visible={infoBoxVisible} />
      </div>
    </div>
  );
}
