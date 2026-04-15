"use client";

import { useState } from "react";

interface AccountStepProps {
  onNext: () => void;
}

export default function AccountStep({ onNext }: AccountStepProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const isValid =
    username.trim().length > 0 &&
    password.length >= 6 &&
    password === confirmPassword;

  return (
    <div className="flex flex-col items-start" style={{ width: 288 }}>
      <p
        className="text-[13px] font-normal uppercase whitespace-nowrap"
        style={{
          fontFamily: "var(--font-inter), 'Inter', sans-serif",
          lineHeight: "35px",
          color: "var(--section-label)",
        }}
      >
        Account
      </p>

      <h1
        className="text-[28px] whitespace-nowrap"
        style={{
          fontFamily: "var(--font-source-serif-4), 'Source Serif 4', serif",
          fontWeight: 400,
          lineHeight: "35px",
          color: "var(--heading-secondary)",
        }}
      >
        Set up your account
      </h1>

      <p
        className="text-[13px] font-normal"
        style={{
          marginTop: 8,
          fontFamily: "var(--font-inter), 'Inter', sans-serif",
          lineHeight: "19px",
          color: "var(--subtitle)",
        }}
      >
        Create your login credentials
      </p>

      {/* USERNAME */}
      <div className="flex w-full flex-col" style={{ marginTop: 70, minWidth: 64 }}>
        <label
          className="text-[12px] uppercase"
          style={{
            paddingBottom: 8,
            fontFamily: "var(--font-ibm-plex-sans), 'IBM Plex Sans', sans-serif",
            fontWeight: 400,
            lineHeight: "16px",
            letterSpacing: "0.32px",
            color: "var(--input-label)",
          }}
        >
          Username
        </label>
        <div className="relative w-full" style={{ height: 32 }}>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Choose a username"
            className="h-full w-full border-b text-[14px] outline-none"
            style={{
              padding: "7px 16px",
              fontFamily: "var(--font-ibm-plex-sans), 'IBM Plex Sans', sans-serif",
              fontWeight: 400,
              lineHeight: "18px",
              letterSpacing: "0.16px",
              backgroundColor: "var(--input-bg)",
              borderBottomColor: "var(--input-border)",
              color: "var(--heading-color)",
            }}
          />
        </div>
      </div>

      {/* PASSWORD */}
      <div className="flex w-full flex-col" style={{ marginTop: 27, minWidth: 64 }}>
        <label
          className="text-[12px] uppercase"
          style={{
            paddingBottom: 8,
            fontFamily: "var(--font-ibm-plex-sans), 'IBM Plex Sans', sans-serif",
            fontWeight: 400,
            lineHeight: "16px",
            letterSpacing: "0.32px",
            color: "var(--input-label)",
          }}
        >
          Password
        </label>
        <div className="relative w-full" style={{ height: 32 }}>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Min. 6 characters"
            className="h-full w-full border-b text-[14px] outline-none"
            style={{
              padding: "7px 16px",
              fontFamily: "var(--font-ibm-plex-sans), 'IBM Plex Sans', sans-serif",
              fontWeight: 400,
              lineHeight: "18px",
              letterSpacing: "0.16px",
              backgroundColor: "var(--input-bg)",
              borderBottomColor: "var(--input-border)",
              color: "var(--heading-color)",
            }}
          />
        </div>
      </div>

      {/* CONFIRM PASSWORD */}
      <div className="flex w-full flex-col" style={{ marginTop: 27, minWidth: 64 }}>
        <label
          className="text-[12px] uppercase"
          style={{
            paddingBottom: 8,
            fontFamily: "var(--font-ibm-plex-sans), 'IBM Plex Sans', sans-serif",
            fontWeight: 400,
            lineHeight: "16px",
            letterSpacing: "0.32px",
            color: "var(--input-label)",
          }}
        >
          Confirm Password
        </label>
        <div className="relative w-full" style={{ height: 32 }}>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Re-enter password"
            className="h-full w-full border-b text-[14px] outline-none"
            style={{
              padding: "7px 16px",
              fontFamily: "var(--font-ibm-plex-sans), 'IBM Plex Sans', sans-serif",
              fontWeight: 400,
              lineHeight: "18px",
              letterSpacing: "0.16px",
              backgroundColor: "var(--input-bg)",
              borderBottomColor: "var(--input-border)",
              color: "var(--heading-color)",
            }}
          />
        </div>
        <p
          className="text-[11px]"
          style={{
            paddingTop: 4,
            fontFamily: "var(--font-ibm-plex-sans), 'IBM Plex Sans', sans-serif",
            fontWeight: 400,
            lineHeight: "16px",
            letterSpacing: "0.32px",
            color: "var(--helper-text)",
          }}
        >
          Single-user setup. Your data stays on your machine.
        </p>
      </div>

      {/* CONTINUE BUTTON */}
      <button
        onClick={onNext}
        disabled={!isValid}
        className="self-end rounded-[2px] text-center text-[14px] font-bold transition-opacity"
        style={{
          marginTop: 50,
          height: 32,
          minWidth: 32,
          maxWidth: 448,
          padding: "4px 12px",
          lineHeight: "20px",
          fontFamily: "var(--font-inter), 'Inter', sans-serif",
          backgroundColor: isValid
            ? "var(--btn-primary-bg)"
            : "var(--btn-disabled-bg)",
          color: isValid
            ? "var(--btn-primary-text)"
            : "var(--btn-disabled-text)",
          cursor: isValid ? "pointer" : "not-allowed",
        }}
      >
        Continue
      </button>
    </div>
  );
}
