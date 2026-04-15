"use client";

const BulletDot = () => (
  <svg
    width="8"
    height="8"
    viewBox="0 0 8 8"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M4 0C1.79086 0 0 1.79086 0 4C0 6.20914 1.79086 8 4 8C6.20914 8 8 6.20914 8 4C8 1.79086 6.20914 0 4 0Z"
      fill="var(--wiki-bullet)"
    />
  </svg>
);

const items = [
  { title: "Ship Weekly Review Monthly", date: "2026-04-07" },
  { title: "Migrate Auth to Passkeys", date: "2026-04-07" },
  { title: "Launch Robin v1 by April 10", date: "2026-04-07" },
  { title: "Delete Robin v0 by April 1e", date: "2026-04-07" },
  { title: "Launch Robin v1 by April 10", date: "2026-04-07" },
];

export default function RecentlyUpdated() {
  return (
    <div
      className="wiki-recently-updated"
      style={{
        border: "1px solid var(--wiki-card-border)",
      }}
    >
      {/* Header */}
      <div
        style={{
          borderBottom: "1px solid var(--wiki-card-border)",
          padding: "10px 16px",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-inter), Inter, sans-serif",
            fontSize: 16,
            fontWeight: 600,
            lineHeight: "20px",
            color: "var(--wiki-card-header)",
            whiteSpace: "nowrap",
          }}
        >
          Recently updated
        </p>
      </div>

      {/* Items */}
      <div style={{ display: "flex", flexDirection: "column" }}>
        {items.map((item, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: 8,
              padding: "8px 12px",
            }}
          >
            <div
              style={{
                width: 18,
                height: 20,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <BulletDot />
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                justifyContent: "space-between",
                flex: 1,
                minWidth: 0,
                lineHeight: "20px",
              }}
            >
              <a
                href="#"
                style={{
                  fontFamily:
                    "var(--font-inter), Inter, sans-serif",
                  fontSize: 14,
                  fontWeight: 400,
                  lineHeight: "20px",
                  color: "var(--wiki-item-link)",
                  textDecoration: "none",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {item.title}
              </a>
              <span
                style={{
                  fontFamily:
                    "var(--font-inter), Inter, sans-serif",
                  fontSize: 10,
                  fontWeight: 400,
                  lineHeight: "20px",
                  color: "var(--wiki-item-date)",
                  whiteSpace: "nowrap",
                  marginLeft: 8,
                }}
              >
                ({item.date})
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
