"use client";

import { useEffect, useId, useRef, useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import type { WikiSettingsPrefill } from "@/lib/wikiSettingsPrefill";

export type { WikiSettingsPrefill } from "@/lib/wikiSettingsPrefill";

export interface AddWikiModalProps {
  open: boolean;
  onClose: () => void;
  /** Figma 311:5034 — defaults to Create New Wiki */
  title?: string;
  confirmLabel?: string;
  /** When opening from an existing wiki (gear), seed form fields */
  prefill?: WikiSettingsPrefill | null;
}

const IBM = "var(--font-ibm-plex-sans), 'IBM Plex Sans', sans-serif";

function InfoIcon({ color }: { color: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      style={{ flexShrink: 0, color }}
    >
      <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1" />
      <path
        d="M8 7.2V12M8 4.8h.01"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CloseIcon({ color }: { color: string }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M18 6L6 18M6 6l12 12"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ChevronDownIcon({ color }: { color: string }) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M3 4.5L6 7.5L9 4.5"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ModalToggle({
  checked,
  onChange,
  disabled,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => {
        if (!disabled) onChange(!checked);
      }}
      style={{
        width: 48,
        height: 32,
        minHeight: 28,
        minWidth: 40,
        borderRadius: 9999,
        border: "1px solid transparent",
        background: "#2e2e30",
        display: "flex",
        alignItems: "center",
        justifyContent: checked ? "flex-end" : "flex-start",
        padding: checked ? "7px 7px 7px 1px" : "7px 1px 7px 7px",
        cursor: disabled ? "not-allowed" : "pointer",
        flexShrink: 0,
        opacity: disabled ? 0.55 : 1,
      }}
    >
      <span
        style={{
          width: 20,
          height: 20,
          borderRadius: "50%",
          background: "#ffffff",
          flexShrink: 0,
        }}
      />
    </button>
  );
}

function TextFieldShell({
  children,
  theme,
}: {
  children: React.ReactNode;
  theme: "light" | "dark";
}) {
  const border = theme === "dark" ? "#272727" : "#d0d0d0";
  const bg = theme === "dark" ? "#141414" : "#f5f5f5";
  const bottom = theme === "dark" ? "#8d8d8d" : "#8d8d8d";
  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        gap: 16,
        height: 32,
        width: "100%",
        padding: "7px 16px",
        border: `2px solid ${border}`,
        boxSizing: "border-box",
        background: bg,
        borderBottom: `2px solid ${bottom}`,
      }}
    >
      {children}
    </div>
  );
}

export default function AddWikiModal({
  open,
  onClose,
  title = "Create New Wiki",
  confirmLabel = "Create Wiki",
  prefill = null,
}: AddWikiModalProps) {
  const { theme } = useTheme();
  const titleId = useId();
  const wasOpen = useRef(false);
  const [name, setName] = useState("");
  const [wikiType, setWikiType] = useState("");
  const [folder, setFolder] = useState("");
  const [description, setDescription] = useState("");
  const [regenAuto, setRegenAuto] = useState(false);
  const [gatekeep, setGatekeep] = useState(false);
  const [subtitle, setSubtitle] = useState<string | undefined>(undefined);
  /** Existing-wiki settings: form read-only until user clicks Edit Wiki */
  const [fieldsEditable, setFieldsEditable] = useState(true);
  const [showSavedToast, setShowSavedToast] = useState(false);
  const saveCloseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isSettingsView = Boolean(prefill);

  useEffect(() => {
    if (open) {
      if (!wasOpen.current) {
        setShowSavedToast(false);
        if (saveCloseTimerRef.current) {
          clearTimeout(saveCloseTimerRef.current);
          saveCloseTimerRef.current = null;
        }
        if (prefill) {
          setName(prefill.name ?? "");
          setWikiType(prefill.wikiType ?? "");
          setFolder(prefill.folder ?? "");
          setDescription(prefill.description ?? "");
          setRegenAuto(prefill.regenAuto ?? false);
          setGatekeep(prefill.gatekeep ?? false);
          setSubtitle(prefill.subtitle);
          setFieldsEditable(false);
        } else {
          setName("");
          setWikiType("");
          setFolder("");
          setDescription("");
          setRegenAuto(false);
          setGatekeep(false);
          setSubtitle(undefined);
          setFieldsEditable(true);
        }
      }
      wasOpen.current = true;
    } else {
      wasOpen.current = false;
    }
  }, [open, prefill]);

  useEffect(() => {
    return () => {
      if (saveCloseTimerRef.current) {
        clearTimeout(saveCloseTimerRef.current);
        saveCloseTimerRef.current = null;
      }
    };
  }, []);

  const locked = isSettingsView && !fieldsEditable;

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const isDark = theme === "dark";

  if (!open && !showSavedToast) return null;

  if (!open && showSavedToast) {
    const toastBg = isDark ? "#2e2e30" : "#1a1a1a";
    const toastFg = isDark ? "#f0f0f0" : "#fafafa";
    return (
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        style={{
          position: "fixed",
          left: "50%",
          bottom: 40,
          transform: "translateX(-50%)",
          zIndex: 300,
          padding: "10px 20px",
          borderRadius: 8,
          backgroundColor: toastBg,
          color: toastFg,
          fontFamily: "var(--font-inter), Inter, sans-serif",
          fontSize: 14,
          fontWeight: 500,
          lineHeight: "20px",
          letterSpacing: "-0.02px",
          boxShadow:
            "0 10px 28px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.06)",
          pointerEvents: "none",
        }}
      >
        Saved
      </div>
    );
  }

  const modalBg = isDark ? "#0d0d0d" : "#fafafa";
  const modalBorder = isDark ? "rgba(241, 241, 241, 0.1)" : "rgba(0,0,0,0.12)";
  const lineColor = isDark ? "#1c1c1c" : "#e5e5e5";
  const titleColor = isDark ? "#ffffff" : "#111111";
  const subtitleColor = isDark ? "#878d96" : "#676d76";
  const labelColor = isDark ? "#525252" : "#545353";
  const placeholderColor = "#a8a8a8";
  const toggleLabelColor = isDark ? "#a8a8a8" : "#6f6f6f";
  const closeIconColor = isDark ? "#a8a8a8" : "#545353";
  const textareaBg = isDark ? "#191919" : "#f0f0f0";
  const textareaBorder = isDark ? "#454749" : "#c8c8c8";
  const descTextDefault = isDark ? "#a2a9b1" : "#72777d";

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 200,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
      }}
      onClick={onClose}
      role="presentation"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onClick={(e) => e.stopPropagation()}
        style={{
          width: 571,
          maxWidth: "100%",
          maxHeight: "min(631px, 90vh)",
          overflowY: "auto",
          backgroundColor: modalBg,
          border: `1px solid ${modalBorder}`,
          borderRadius: 16,
          boxShadow:
            "0px 226px 63px rgba(0,0,0,0), 0px 145px 58px rgba(0,0,0,0.01), 0px 81px 49px rgba(0,0,0,0.05), 0px 36px 36px rgba(0,0,0,0.09), 0px 9px 20px rgba(0,0,0,0.1)",
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
        }}
      >
        {/* Header — Figma 301:15723 */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "20px 20px 8px",
            flexShrink: 0,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            <h2
              id={titleId}
              style={{
                margin: 0,
                fontFamily:
                  "var(--font-source-serif-4), 'Source Serif 4', serif",
                fontSize: 28,
                fontWeight: 400,
                lineHeight: "35px",
                color: titleColor,
              }}
            >
              {title}
            </h2>
            <p
              style={{
                margin: 0,
                fontFamily: "var(--font-inter), Inter, sans-serif",
                fontSize: 12,
                fontWeight: 400,
                lineHeight: "19px",
                color: subtitleColor,
              }}
            >
              {subtitle ?? "Lorem Ipsum dolor sit amet"}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            style={{
              background: "none",
              border: "none",
              padding: 0,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 24,
              height: 24,
              flexShrink: 0,
            }}
          >
            <CloseIcon color={closeIconColor} />
          </button>
        </div>

        <div
          style={{
            height: 1,
            backgroundColor: lineColor,
            width: "100%",
            flexShrink: 0,
          }}
        />

        {/* Name — 301:15731 */}
        <div style={{ padding: "16px 20px 0", width: "100%", boxSizing: "border-box" }}>
          <div style={{ display: "flex", paddingBottom: 8 }}>
            <span
              style={{
                fontFamily: IBM,
                fontSize: 12,
                fontWeight: 400,
                lineHeight: "16px",
                letterSpacing: "0.32px",
                color: labelColor,
              }}
            >
              Name
            </span>
          </div>
          <TextFieldShell theme={theme}>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="E.g The City of Trust"
              className="add-wiki-modal-input"
              disabled={locked}
              style={{
                flex: 1,
                minWidth: 0,
                background: "transparent",
                border: "none",
                outline: "none",
                fontFamily: IBM,
                fontSize: 14,
                lineHeight: "18px",
                letterSpacing: "0.16px",
                color: titleColor,
                cursor: locked ? "default" : "text",
                opacity: locked ? 0.85 : 1,
              }}
            />
          </TextFieldShell>
        </div>

        {/* Type — 301:15794 */}
        <div style={{ padding: "16px 20px 0", width: "100%", boxSizing: "border-box" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              paddingBottom: 8,
            }}
          >
            <span
              style={{
                fontFamily: IBM,
                fontSize: 12,
                fontWeight: 400,
                lineHeight: "16px",
                letterSpacing: "0.32px",
                color: labelColor,
              }}
            >
              Type
            </span>
            <InfoIcon color={labelColor} />
          </div>
          <TextFieldShell theme={theme}>
            <select
              value={wikiType}
              onChange={(e) => setWikiType(e.target.value)}
              aria-label="Wiki type"
              disabled={locked}
              style={{
                flex: 1,
                minWidth: 0,
                appearance: "none",
                WebkitAppearance: "none",
                background: "transparent",
                border: "none",
                outline: "none",
                fontFamily: IBM,
                fontSize: 14,
                lineHeight: "18px",
                letterSpacing: "0.16px",
                color: wikiType ? titleColor : placeholderColor,
                cursor: locked ? "not-allowed" : "pointer",
                height: 18,
                opacity: locked ? 0.85 : 1,
              }}
            >
              <option value="">Choose a type</option>
              <option value="personal">Personal</option>
              <option value="research">Research</option>
              <option value="project">Project</option>
              <option value="goal">Goal</option>
              <option value="principle">Principle</option>
              <option value="skill">Skill</option>
              <option value="agent">Agent</option>
              <option value="voice">Voice</option>
              <option value="people">People</option>
            </select>
            <div
              style={{
                width: 20,
                height: 20,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                pointerEvents: "none",
              }}
            >
              <ChevronDownIcon color={placeholderColor} />
            </div>
          </TextFieldShell>
        </div>

        {/* Description — 301:16783 */}
        <div style={{ padding: "16px 21px 0", width: "100%", boxSizing: "border-box" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              paddingBottom: 8,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span
                style={{
                  fontFamily: IBM,
                  fontSize: 12,
                  fontWeight: 400,
                  lineHeight: "16px",
                  letterSpacing: "0.32px",
                  color: labelColor,
                }}
              >
                Description
              </span>
              <InfoIcon color={labelColor} />
            </div>
          </div>
          <div
            style={{
              background: textareaBg,
              border: `1px solid ${textareaBorder}`,
              borderRadius: 2,
              minHeight: 64,
              height: 105,
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
              boxSizing: "border-box",
            }}
          >
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Countries I have visited. Whether a specific county meets the threshold."
              rows={3}
              disabled={locked}
              style={{
                flex: 1,
                width: "100%",
                padding: "10px 12px",
                border: "none",
                outline: "none",
                resize: "none",
                background: "transparent",
                fontFamily: "var(--font-inter), Inter, sans-serif",
                fontSize: 14,
                fontWeight: 400,
                lineHeight: "20px",
                color: titleColor,
                boxSizing: "border-box",
                cursor: locked ? "default" : "text",
                opacity: locked ? 0.85 : 1,
              }}
              className="add-wiki-modal-textarea"
            />
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "flex-end",
                padding: "2px 2px 2px 0",
              }}
            >
              <svg width="8" height="8" viewBox="0 0 8 8" fill="none" aria-hidden>
                <path
                  d="M7 1v6H1"
                  stroke={descTextDefault}
                  strokeWidth="1.2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Folder — 301:16605 */}
        <div style={{ padding: "16px 20px 0", width: "100%", boxSizing: "border-box" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              paddingBottom: 8,
            }}
          >
            <span
              style={{
                fontFamily: IBM,
                fontSize: 12,
                fontWeight: 400,
                lineHeight: "16px",
                letterSpacing: "0.32px",
                color: labelColor,
              }}
            >
              Folder
            </span>
            <InfoIcon color={labelColor} />
          </div>
          <TextFieldShell theme={theme}>
            <select
              value={folder}
              onChange={(e) => setFolder(e.target.value)}
              aria-label="Folder"
              disabled={locked}
              style={{
                flex: 1,
                minWidth: 0,
                appearance: "none",
                WebkitAppearance: "none",
                background: "transparent",
                border: "none",
                outline: "none",
                fontFamily: IBM,
                fontSize: 14,
                lineHeight: "18px",
                letterSpacing: "0.16px",
                color: folder ? titleColor : placeholderColor,
                cursor: locked ? "not-allowed" : "pointer",
                height: 18,
                opacity: locked ? 0.85 : 1,
              }}
            >
              <option value="">Choose a folder</option>
              <option value="default">Default</option>
              <option value="archive">Archive</option>
            </select>
            <div
              style={{
                width: 20,
                height: 20,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                pointerEvents: "none",
              }}
            >
              <ChevronDownIcon color={placeholderColor} />
            </div>
          </TextFieldShell>
        </div>

        {/* Toggles — 307:2569 */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 10,
            padding: "30px 20px 20px",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: 16,
              alignItems: "flex-start",
              opacity: 0.6,
            }}
          >
            <div
              style={{
                flex: "1 0 0",
                display: "flex",
                alignItems: "center",
                gap: 9,
                paddingTop: 4,
                minWidth: 0,
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-inter), Inter, sans-serif",
                  fontSize: 16,
                  fontWeight: 400,
                  lineHeight: "22px",
                  color: toggleLabelColor,
                  whiteSpace: "nowrap",
                }}
              >
                Regenerate Wiki Automatically?{" "}
              </span>
              <InfoIcon color={toggleLabelColor} />
            </div>
            <ModalToggle
              checked={regenAuto}
              onChange={setRegenAuto}
              disabled={locked}
            />
          </div>
          <div
            style={{
              display: "flex",
              gap: 16,
              alignItems: "flex-start",
              opacity: 0.6,
            }}
          >
            <div
              style={{
                flex: "1 0 0",
                display: "flex",
                alignItems: "center",
                gap: 9,
                paddingTop: 4,
                minWidth: 0,
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-inter), Inter, sans-serif",
                  fontSize: 16,
                  fontWeight: 400,
                  lineHeight: "22px",
                  color: toggleLabelColor,
                  whiteSpace: "nowrap",
                }}
              >
                Gatekeep this Wiki?
              </span>
              <InfoIcon color={toggleLabelColor} />
            </div>
            <ModalToggle
              checked={gatekeep}
              onChange={setGatekeep}
              disabled={locked}
            />
          </div>
        </div>

        <div
          style={{
            height: 1,
            backgroundColor: lineColor,
            width: "100%",
            flexShrink: 0,
          }}
        />

        {/* Footer button — 301:15858 */}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            gap: 12,
            padding: "14px 20px 18px",
          }}
        >
          <button
            type="button"
            onClick={() => {
              if (locked) {
                setFieldsEditable(true);
                return;
              }
              if (isSettingsView) {
                if (saveCloseTimerRef.current) {
                  clearTimeout(saveCloseTimerRef.current);
                  saveCloseTimerRef.current = null;
                }
                onClose();
                setShowSavedToast(true);
                saveCloseTimerRef.current = setTimeout(() => {
                  setShowSavedToast(false);
                  saveCloseTimerRef.current = null;
                }, 2000);
                return;
              }
              onClose();
            }}
            style={{
              height: 32,
              minWidth: 32,
              maxWidth: 448,
              padding: "4px 12px",
              borderRadius: 2,
              border: "none",
              cursor: "pointer",
              backgroundColor: "#f1f4fd",
              fontFamily: "var(--font-inter), Inter, sans-serif",
              fontSize: 14,
              fontWeight: 500,
              lineHeight: "normal",
              letterSpacing: "-0.0336px",
              color: "#000000",
            }}
          >
            {locked
              ? confirmLabel
              : isSettingsView
                ? "Save"
                : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
