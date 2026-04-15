"use client";

/** Figma 237:37091 — Fragments section (home wiki column) */
const FRAGMENT_LINK_TEXT =
  "Andrew Tate Biography | The Real World Portal";

const IBM = "var(--font-ibm-plex-sans), 'IBM Plex Sans', sans-serif";

function FragmentListItem({
  index,
  indexColorVar,
}: {
  index: "1." | "2.";
  indexColorVar: string;
}) {
  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        flex: "1 0 0",
        alignItems: "flex-start",
        gap: 8,
        minWidth: 0,
        paddingLeft: 16,
      }}
    >
      <span
        style={{
          flexShrink: 0,
          width: 13,
          alignSelf: "stretch",
          fontFamily: IBM,
          fontSize: 14,
          fontWeight: 400,
          lineHeight: "20px",
          letterSpacing: "0.16px",
          color: indexColorVar,
        }}
      >
        {index}
      </span>
      <a
        href="#"
        style={{
          flexShrink: 0,
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
        {FRAGMENT_LINK_TEXT}
      </a>
    </div>
  );
}

function FragmentRow() {
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <FragmentListItem
        index="1."
        indexColorVar="var(--wiki-fragment-index-1)"
      />
      <FragmentListItem
        index="2."
        indexColorVar="var(--wiki-fragment-index-2)"
      />
    </div>
  );
}

export default function WikiFragments() {
  return (
    <section
      style={{
        display: "flex",
        width: "100%",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: 20,
        paddingBottom: 20,
        border: "1px solid var(--wiki-card-border)",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          width: "100%",
          flexShrink: 0,
          borderTop: "1px solid var(--wiki-card-border)",
          borderBottom: "1px solid var(--wiki-card-border)",
          padding: "10px 16px",
          boxSizing: "border-box",
        }}
      >
        <p
          style={{
            margin: 0,
            fontFamily: "var(--font-inter), Inter, sans-serif",
            fontSize: 16,
            fontWeight: 600,
            lineHeight: "20px",
            color: "var(--wiki-card-header)",
          }}
        >
          Fragments
        </p>
      </div>

      <div
        style={{
          display: "flex",
          width: "100%",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <div
          style={{
            display: "flex",
            width: "100%",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: 13,
          }}
        >
          {Array.from({ length: 6 }, (_, i) => (
            <FragmentRow key={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
