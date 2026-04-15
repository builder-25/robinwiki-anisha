"use client";

import { useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import { useRouter } from "next/navigation";

function Toggle({
  on,
  onToggle,
}: {
  on: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      onClick={onToggle}
      style={{
        width: 44,
        height: 24,
        borderRadius: 12,
        background: on
          ? "var(--profile-toggle-on)"
          : "var(--profile-toggle-off)",
        border: "none",
        cursor: "pointer",
        position: "relative",
        flexShrink: 0,
        transition: "background 0.2s ease",
      }}
    >
      <div
        style={{
          width: 18,
          height: 18,
          borderRadius: 9,
          background: "var(--profile-toggle-knob)",
          position: "absolute",
          top: 3,
          left: on ? 23 : 3,
          transition: "left 0.2s ease",
          boxShadow: "0 1px 3px rgba(0,0,0,0.3)",
        }}
      />
    </button>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p
      style={{
        fontFamily: "var(--font-inter), Inter, sans-serif",
        fontSize: 11,
        fontWeight: 600,
        lineHeight: "16px",
        letterSpacing: "0.8px",
        color: "var(--profile-section-label)",
        textTransform: "uppercase",
      }}
    >
      {children}
    </p>
  );
}

function SettingRow({
  title,
  description,
  rightElement,
  borderBottom = true,
}: {
  title: string;
  description: string;
  rightElement: React.ReactNode;
  borderBottom?: boolean;
}) {
  return (
    <div
      className="profile-setting-row"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 24,
        paddingTop: 16,
        paddingBottom: 16,
        borderBottom: borderBottom
          ? "1px solid var(--profile-item-border)"
          : "none",
      }}
    >
      <div style={{ minWidth: 0 }}>
        <p
          style={{
            fontFamily: "var(--font-inter), Inter, sans-serif",
            fontSize: 14,
            fontWeight: 600,
            lineHeight: "20px",
            color: "var(--profile-item-title)",
          }}
        >
          {title}
        </p>
        <p
          style={{
            fontFamily: "var(--font-inter), Inter, sans-serif",
            fontSize: 13,
            fontWeight: 400,
            lineHeight: "18px",
            color: "var(--profile-item-desc)",
            marginTop: 2,
          }}
        >
          {description}
        </p>
      </div>
      {rightElement}
    </div>
  );
}

function SectionHeader({
  icon,
  title,
}: {
  icon: React.ReactNode;
  title: string;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        paddingBottom: 12,
        borderBottom: "1px solid var(--profile-item-border)",
      }}
    >
      {icon}
      <p
        style={{
          fontFamily: "var(--font-inter), Inter, sans-serif",
          fontSize: 14,
          fontWeight: 600,
          lineHeight: "20px",
          color: "var(--profile-item-title)",
        }}
      >
        {title}
      </p>
    </div>
  );
}

const MoonIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path
      d="M8 1C4.136 1 1 4.136 1 8s3.136 7 7 7 7-3.136 7-7c0-.462-.056-.91-.147-1.345A5.25 5.25 0 019.345 1.147 7.065 7.065 0 008 1z"
      stroke="var(--profile-icon)"
      strokeWidth="1.2"
    />
  </svg>
);

const BellIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path
      d="M8 1.5C5.515 1.5 3.5 3.515 3.5 6v2.5L2 10v1h12v-1l-1.5-1.5V6c0-2.485-2.015-4.5-4.5-4.5zM6.5 12a1.5 1.5 0 003 0"
      stroke="var(--profile-icon)"
      strokeWidth="1.2"
    />
  </svg>
);

const ShieldIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path
      d="M8 1L2 3.5v4.5c0 3.5 2.5 5.5 6 7 3.5-1.5 6-3.5 6-7V3.5L8 1z"
      stroke="var(--profile-icon)"
      strokeWidth="1.2"
    />
  </svg>
);

const DownloadIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path
      d="M8 2v8m0 0l-3-3m3 3l3-3M3 12v1.5h10V12"
      stroke="var(--profile-icon)"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const DownloadActionIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ flexShrink: 0 }}>
    <path
      d="M9 2.5v9m0 0l-3.5-3.5M9 11.5l3.5-3.5M3.5 14h11"
      stroke="var(--profile-icon)"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const KeyIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ flexShrink: 0 }}>
    <path
      d="M11.5 2a4.5 4.5 0 00-3.88 6.76L2 14.38V17h2.625v-1.75H6.5v-1.75h1.75l1.37-1.37A4.5 4.5 0 1011.5 2zm1.25 3.5a1.25 1.25 0 100-2.5 1.25 1.25 0 000 2.5z"
      stroke="var(--profile-icon)"
      strokeWidth="1.2"
    />
  </svg>
);

const LogoutIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ flexShrink: 0 }}>
    <path
      d="M12 12.5l3.5-3.5L12 5.5M15.5 9H6M6.5 15.5H3a.5.5 0 01-.5-.5V3a.5.5 0 01.5-.5h3.5"
      stroke="var(--profile-icon)"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const CopyIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ flexShrink: 0, cursor: "pointer" }}>
    <rect x="5.5" y="5.5" width="9" height="9" rx="1" stroke="var(--profile-copy-icon)" strokeWidth="1.2" />
    <path
      d="M3.5 12.5V3.5a1 1 0 011-1h9"
      stroke="var(--profile-copy-icon)"
      strokeWidth="1.2"
      strokeLinecap="round"
    />
  </svg>
);

const PencilIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, cursor: "pointer" }}>
    <path
      d="M11.5 2.5l2 2L5 13H3v-2l8.5-8.5z"
      stroke="var(--profile-icon)"
      strokeWidth="1.2"
      strokeLinejoin="round"
    />
  </svg>
);

const RefreshIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path
      d="M12 7A5 5 0 112.5 5.5"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
    />
    <path d="M1 3v3h3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function ProfilePage() {
  const { theme, toggle: toggleTheme } = useTheme();
  const router = useRouter();
  const [pushNotif, setPushNotif] = useState(true);
  const [activityEmails, setActivityEmails] = useState(true);
  const [weeklyDigest, setWeeklyDigest] = useState(false);
  const [viewHistory, setViewHistory] = useState(true);
  const [copied, setCopied] = useState(false);

  const endpointUrl =
    "https://api.withrobin.org/mcp?token=eyJhbGci0iJFZERTQSIsImtpZCI6IjM5YTA3NGE3NjU4OWYxM2QifQ.eyJ2ZXIi0jEsImlhdCI6MTc...";

  const handleCopy = () => {
    navigator.clipboard.writeText(endpointUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="profile-outer-shell"
      style={{
        background: "var(--bg)",
        minHeight: "100vh",
        overflowY: "auto",
      }}
    >
      <div
        className="profile-content"
        style={{
          maxWidth: 780,
          margin: "0 auto",
          paddingTop: 48,
          paddingBottom: 80,
          paddingLeft: 40,
          paddingRight: 40,
        }}
      >
        {/* Back navigation */}
        <button
          onClick={() => router.back()}
          className="flex cursor-pointer items-center"
          style={{
            gap: 6,
            background: "none",
            border: "none",
            padding: 0,
            marginBottom: 24,
            fontFamily: "var(--font-inter), Inter, sans-serif",
            fontSize: 13,
            fontWeight: 500,
            color: "var(--section-label)",
          }}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 12H5M5 12L12 19M5 12L12 5"
              stroke="var(--section-label)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Back
        </button>

        {/* Profile header */}
        <h1
          style={{
            fontFamily:
              "var(--font-source-serif-4), 'Source Serif 4', 'Source Serif Pro', serif",
            fontSize: 32,
            fontWeight: 400,
            lineHeight: "40px",
            color: "var(--heading-color)",
          }}
        >
          Profile
        </h1>
        <p
          style={{
            fontFamily: "var(--font-inter), Inter, sans-serif",
            fontSize: 14,
            fontWeight: 400,
            lineHeight: "20px",
            color: "var(--profile-subtitle)",
            marginTop: 4,
          }}
        >
          Your Robin control panel
        </p>

        {/* MCP CONNECTION */}
        <div style={{ marginTop: 32 }}>
          <SectionLabel>MCP CONNECTION</SectionLabel>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: 8,
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-inter), Inter, sans-serif",
                fontSize: 14,
                fontWeight: 400,
                lineHeight: "20px",
                color: "var(--profile-status-text)",
              }}
            >
              Status
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 4,
                  background: "var(--profile-connected)",
                }}
              />
              <span
                style={{
                  fontFamily: "var(--font-inter), Inter, sans-serif",
                  fontSize: 14,
                  fontWeight: 500,
                  color: "var(--profile-connected)",
                }}
              >
                Connected
              </span>
            </div>
          </div>

          <p
            style={{
              fontFamily: "var(--font-inter), Inter, sans-serif",
              fontSize: 10,
              fontWeight: 500,
              lineHeight: "16px",
              letterSpacing: "0.5px",
              color: "var(--profile-status-text)",
              textTransform: "uppercase",
              marginTop: 8,
            }}
          >
            ENDPOINT
          </p>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginTop: 6,
              background: "var(--profile-endpoint-bg)",
              border: "1px solid var(--profile-endpoint-border)",
              borderRadius: 4,
              padding: "10px 14px",
            }}
          >
            <p
              style={{
                fontFamily:
                  "'SF Mono', 'Fira Code', 'Fira Mono', Menlo, Consolas, monospace",
                fontSize: 13,
                fontWeight: 400,
                lineHeight: "18px",
                color: "var(--profile-endpoint-text)",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                flex: 1,
                minWidth: 0,
              }}
            >
              {endpointUrl}
            </p>
            <button
              onClick={handleCopy}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 0,
                display: "flex",
              }}
              title={copied ? "Copied!" : "Copy endpoint"}
            >
              <CopyIcon />
            </button>
          </div>
        </div>

        {/* KNOWLEDGE HEALTH */}
        <div style={{ marginTop: 32 }}>
          <SectionLabel>KNOWLEDGE HEALTH</SectionLabel>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr 1fr",
              border: "1px solid var(--profile-card-border)",
              borderRadius: 4,
              marginTop: 12,
              overflow: "hidden",
            }}
          >
            {[
              { count: 0, label: "Notes" },
              { count: 0, label: "Threads" },
              { count: 0, label: "People" },
              { count: 0, label: "Unthreaded" },
            ].map((stat, i) => (
              <div
                key={stat.label}
                style={{
                  textAlign: "center",
                  padding: "20px 0",
                  borderRight:
                    i < 3
                      ? "1px solid var(--profile-stat-divider)"
                      : "none",
                }}
              >
                <p
                  style={{
                    fontFamily: "var(--font-inter), Inter, sans-serif",
                    fontSize: 24,
                    fontWeight: 600,
                    lineHeight: "32px",
                    color: "var(--profile-stat-number)",
                  }}
                >
                  {stat.count}
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-inter), Inter, sans-serif",
                    fontSize: 12,
                    fontWeight: 400,
                    lineHeight: "16px",
                    color: "var(--profile-stat-label)",
                    marginTop: 4,
                  }}
                >
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* VAULT MANAGEMENT */}
        <div style={{ marginTop: 32 }}>
          <SectionLabel>VAULT MANAGEMENT</SectionLabel>

          <div
            style={{
              border: "1px solid var(--profile-vault-border)",
              borderRadius: 4,
              marginTop: 12,
              padding: "16px 16px 12px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: 12 }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-inter), Inter, sans-serif",
                    fontSize: 14,
                    fontWeight: 700,
                    color: "var(--profile-vault-name)",
                  }}
                >
                  Joshua Omobola
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-inter), Inter, sans-serif",
                    fontSize: 13,
                    fontWeight: 400,
                    color: "var(--profile-vault-meta)",
                  }}
                >
                  0 threads · 0 notes
                </span>
              </div>
              <PencilIcon />
            </div>

            <button
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                marginTop: 12,
                padding: "6px 12px",
                border: "1px solid var(--profile-reprofile-border)",
                borderRadius: 4,
                background: "var(--profile-reprofile-bg)",
                color: "var(--profile-reprofile-text)",
                fontFamily: "var(--font-inter), Inter, sans-serif",
                fontSize: 13,
                fontWeight: 500,
                cursor: "pointer",
              }}
            >
              <RefreshIcon />
              Re-profile
            </button>
          </div>
        </div>

        {/* Dark Mode */}
        <div
          style={{
            marginTop: 40,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 24,
            paddingTop: 16,
            paddingBottom: 16,
            borderBottom: "1px solid var(--profile-item-border)",
          }}
        >
          <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
            <MoonIcon />
            <div>
              <p
                style={{
                  fontFamily: "var(--font-inter), Inter, sans-serif",
                  fontSize: 14,
                  fontWeight: 600,
                  lineHeight: "20px",
                  color: "var(--profile-item-title)",
                }}
              >
                Dark Mode
              </p>
              <p
                style={{
                  fontFamily: "var(--font-inter), Inter, sans-serif",
                  fontSize: 13,
                  fontWeight: 400,
                  lineHeight: "18px",
                  color: "var(--profile-item-desc)",
                  marginTop: 2,
                }}
              >
                Switch between light and dark theme
              </p>
            </div>
          </div>
          <Toggle on={theme === "dark"} onToggle={toggleTheme} />
        </div>

        {/* Notifications */}
        <div style={{ marginTop: 24 }}>
          <SectionHeader icon={<BellIcon />} title="Notifications" />
          <SettingRow
            title="Push notifications"
            description="Get notified when Robin processes new entries"
            rightElement={
              <Toggle
                on={pushNotif}
                onToggle={() => setPushNotif((p) => !p)}
              />
            }
          />
          <SettingRow
            title="Activity emails"
            description="Receive emails about new notes, threads, and connections"
            rightElement={
              <Toggle
                on={activityEmails}
                onToggle={() => setActivityEmails((p) => !p)}
              />
            }
          />
          <SettingRow
            title="Weekly digest"
            description="Summary of your knowledge graph activity each week"
            rightElement={
              <Toggle
                on={weeklyDigest}
                onToggle={() => setWeeklyDigest((p) => !p)}
              />
            }
            borderBottom={false}
          />
        </div>

        {/* Privacy */}
        <div style={{ marginTop: 24 }}>
          <SectionHeader icon={<ShieldIcon />} title="Privacy" />
          <SettingRow
            title="Show view history"
            description="People with access can see when you've viewed a shared thread"
            rightElement={
              <Toggle
                on={viewHistory}
                onToggle={() => setViewHistory((p) => !p)}
              />
            }
            borderBottom={false}
          />
        </div>

        {/* Data */}
        <div style={{ marginTop: 24 }}>
          <SectionHeader icon={<DownloadIcon />} title="Data" />
          <SettingRow
            title="Export all data"
            description="Download all notes, threads, and people as JSON"
            rightElement={
              <button
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                  display: "flex",
                }}
              >
                <DownloadActionIcon />
              </button>
            }
          />
          <SettingRow
            title="Export keypair"
            description="Download your Ed25519 public and private key as JSON"
            rightElement={
              <button
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                  display: "flex",
                }}
              >
                <KeyIcon />
              </button>
            }
            borderBottom={false}
          />
        </div>

        {/* Log out */}
        <div style={{ marginTop: 32 }}>
          <SettingRow
            title="Log out"
            description="Sign out of your account on this device"
            rightElement={
              <button
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                  display: "flex",
                }}
              >
                <LogoutIcon />
              </button>
            }
            borderBottom={true}
          />
        </div>

        {/* Danger zone */}
        <div style={{ marginTop: 24 }}>
          <p
            style={{
              fontFamily: "var(--font-inter), Inter, sans-serif",
              fontSize: 14,
              fontWeight: 600,
              lineHeight: "20px",
              color: "var(--profile-danger)",
            }}
          >
            Danger zone
          </p>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 24,
              paddingTop: 16,
              paddingBottom: 16,
            }}
          >
            <div>
              <p
                style={{
                  fontFamily: "var(--font-inter), Inter, sans-serif",
                  fontSize: 14,
                  fontWeight: 600,
                  lineHeight: "20px",
                  color: "var(--profile-item-title)",
                }}
              >
                Delete all data
              </p>
              <p
                style={{
                  fontFamily: "var(--font-inter), Inter, sans-serif",
                  fontSize: 13,
                  fontWeight: 400,
                  lineHeight: "18px",
                  color: "var(--profile-item-desc)",
                  marginTop: 2,
                }}
              >
                Permanently delete all notes, threads, and people
              </p>
            </div>
            <button
              style={{
                background: "var(--profile-delete-bg)",
                color: "var(--profile-delete-text)",
                border: "none",
                borderRadius: 4,
                padding: "6px 16px",
                fontFamily: "var(--font-inter), Inter, sans-serif",
                fontSize: 13,
                fontWeight: 500,
                cursor: "pointer",
                whiteSpace: "nowrap",
                flexShrink: 0,
              }}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
